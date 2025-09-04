foam.CLASS({
  package: 'foam.core.test',
  name: 'JrlCheckTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'foam.lang.X',
    'foam.lang.MutableX',
    'foam.lang.ProxyX',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.dao.EasyDAO',
    'foam.dao.ProxyDAO',
    'foam.dao.java.JDAO',
    'foam.mlang.MLang',
    'foam.core.boot.CSpec',
    'foam.lib.parse.ErrorReportingPStreamFactory',
    'java.util.ArrayList',
    
    'static foam.mlang.MLang.*'
  ],


  methods: [
    {
      name: 'runTest',
      javaCode: `
        var root_      = new MutableX();
        var jrlStorage = new foam.core.fs.FileSystemStorage("build/journals");
        
        root_.put(foam.core.fs.Storage.class, jrlStorage);
        root_.put(foam.core.fs.FileSystemStorage.class, jrlStorage);
        
        // Reset parsing error list when starting up the cSpecDAO on Boot
        ErrorReportingPStreamFactory.getListErps().clear();
        
        // 1. find the served DAOs to walk through its jrl entries
          DAO cSpecDAO_ = (DAO) x.get("cSpecDAO");
          ArrayList<CSpec> nspecs = (ArrayList) ((ArraySink) cSpecDAO_.where(MLang.EQ(CSpec.SERVE, true)).select(new ArraySink())).getArray();
      
          for ( CSpec nspec : nspecs ) {
            var dao_ = x.get(nspec.getId());
            if ( dao_ instanceof DAO ) {
              do {
                if ( dao_ instanceof EasyDAO ) {
                  var sc = ((EasyDAO) dao_).getJournalName();
                  if ( ! "".equals(sc) ) {
                    try {
        // 2. replay the dao's .0 jrl file eg. users.0, groups.0
                      var serviceDAO_ = new JDAO(((foam.lang.ProxyX) root_).getX(), new foam.dao.MDAO(CSpec.getOwnClassInfo()), sc);
                      break;
                    } catch (Exception e) {
                      // JDAO initialization failed
                      test(false, nspec.getId() + " has an error");
                    }
                  }
                }
                dao_ = ((ProxyDAO) dao_).getDelegate();
              } while ( dao_ instanceof ProxyDAO );
            }
          }
      
        // 3. show parsing errors from JDAOs replay
          var jrlParsingErrList = ErrorReportingPStreamFactory.getListErps();
          var dedupFilename = new java.util.HashSet();
      
          if ( jrlParsingErrList.size() == 0 ) {
            test(true, "jrl are fine");
          } else {
            for ( int i = 0; i < jrlParsingErrList.size(); i++ ) {
              var filename = jrlParsingErrList.get(i).substring(0, jrlParsingErrList.get(i).indexOf(";"));
              if ( dedupFilename.add(filename) ) {
                test(false, filename + " jrl file error");
              }
            }
          }
      `
    }
  ]
});
