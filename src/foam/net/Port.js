/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.net',
  name: 'Port',

  documentation: 'Port DAO represents a global port map for an application. A port number can be relative to another port.',

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.PropertyInfo',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.util.SafetyUtil',
    'java.lang.IllegalArgumentException'
  ],

  properties: [
    {
      documentation: 'Name of service at port. http, socket, ...',
      name: 'id',
      class: 'String'
    },
    {
      documentation: 'System port number',
      name: 'number',
      class: 'Int'
    },
    {
      documentation: 'Port number is an offset relative to this id.',
      name: 'relativeTo',
      class: 'String'
    }
  ],

  javaCode: `
  public static int get(X x, String id) {
    String override = System.getProperty(id+".port");
    if ( ! SafetyUtil.isEmpty(override) )
      return Integer.parseInt(override);

    Port port = (Port) ((DAO) x.get("portDAO")).find_(x, id);
    if ( port == null ) {
      FObject service = (FObject) x.get(id);
      if ( service != null ) {
        PropertyInfo pInfo = (PropertyInfo) service.getClassInfo().getAxiomByName("port");
        if ( pInfo != null ) {
          Object p = pInfo.get(service);
          if ( p instanceof Integer ) {
            port = new Port();
            port.setNumber(((Integer) p).intValue());
          }
        }
      }
      if ( port == null ) {
        throw new IllegalArgumentException("Port not found for "+id);
      }
    }
    if ( SafetyUtil.isEmpty(port.getRelativeTo()) ) return port.getNumber();
    return Port.get(x, port.getRelativeTo()) + port.getNumber();
  }
  `
});
