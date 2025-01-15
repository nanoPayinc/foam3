/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.nanos.place',
  name: 'PlaceDetailResult',

  javaImports: [
    'java.util.HashMap',
    'java.util.Map',
    'foam.nanos.auth.Address',
    'foam.nanos.auth.Region',
    'foam.mlang.MLang',
    'foam.dao.DAO',
    'foam.nanos.place.PlaceDetailAddressComponent',
    'foam.nanos.logger.Loggers',
    'foam.core.X'
  ],
  
  implements: ['foam.mlang.Expressions'],
  properties: [
    {
      name: 'formattedAddress',
      shortName: 'formatted_address',
      class: 'String'
    },
    {
      name: 'addressComponents',
      shortName: 'address_components',
      class: 'FObjectArray',
      of: 'foam.nanos.place.PlaceDetailAddressComponent',
    },
    {
      name: 'address',
      shortName: 'addr',
      class: 'FObjectProperty',
      of: 'foam.nanos.auth.Address',
      factory: function() {
        this.populateAddress();
      } 
    },
    {
      class: 'Map',
      javaType: 'HashMap',
      name: 'typeMap',
      transient: true
    }
  ],
  methods: [
    {
      name: 'init_',
      javaCode: `populateAddress();`
    },
    {
      name: 'populateAddress',
      javaCode: `
        if ( getTypeMap().isEmpty() ) {
          HashMap<String, PlaceDetailAddressComponent> typeMap = new HashMap<>();
          for (PlaceDetailAddressComponent component : getAddressComponents()) {
              for (String type : component.getTypes()) {
                  typeMap.put(type, component);
              }
          }
          setTypeMap(typeMap);
          typeMap.forEach((key, value) -> System.out.println(key + ":" + value));
        }

        Class t = Address.class;
        try {
          t = Class.forName("foam.nanos.auth." + (String) ((PlaceDetailAddressComponent) getTypeMap().get("country")).getShortName() + "Address");
        } catch (ClassNotFoundException e) {
          Loggers.logger(getX(), this).error("placeDetailResult", e);
        }
        try {
          Address a = (Address) getX().create(t);
          setAddress((Address) a.fromTypeMap(getTypeMap(), getX()));
        } catch (Exception e) {
          Loggers.logger(getX(), this).error("placeDetailResult", e);
        }
      `
    }
  ]
});
