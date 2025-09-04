/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ndiff',
  name: 'NDiffDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: `
  Decorator for an existing DAO that logs puts to the ndiffDAO service
  if it's running.
  `,
  javaImports: [
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'foam.core.ndiff.NDiff',
    'foam.dao.DAO',
    'foam.core.pm.PM',
    'foam.lang.X',
  ],
  javaCode: `
    public NDiffDAO(foam.lang.X x, foam.dao.DAO delegate) {
            setX(x);
            setDelegate(delegate);
        }
  `,
  properties: [
    {
      name: 'cSpecName',
      class: 'String'
    },
    {
      name: 'runtimeOrigin',
      class: 'Boolean'
    }
  ],
  methods: [
    {
      name: 'put_',
      javaCode: `
        // object must be sent to the delegate dao first
        // as there is a chance its ID has not been set
        var storedObject = getDelegate().put_(x, obj);

        DAO ndiffDao = (DAO)x.get("ndiffDAO");
        if ( ndiffDao == null ) {
          return storedObject;
        }

        // NDiffRuntimeDAO populates runtimeFObject in real time
        // so do not continue unless we're recording stuff
        // created at startup
        if ( getRuntimeOrigin() ) {
          return storedObject;
        }

        PM pm = PM.create(x, this.getClass(), "put_");

        String cSpecName    = getCSpecName();
        String objectId     = storedObject.getProperty("id").toString();
        NDiff existingNdiff = (NDiff) ndiffDao.find_(x, new NDiffId(cSpecName,
                                                                objectId));
        NDiff ndiff = existingNdiff != null ?
                      (NDiff) existingNdiff.fclone() :
                      new NDiff()
                      ;
        ndiff.setObjectId(objectId);
        ndiff.setCSpecName(cSpecName);
        ndiff.setInitialFObject(storedObject);

        ndiffDao.put_(x, ndiff);
        pm.log(x);

        return storedObject;
      `,
    }
  ],
});
