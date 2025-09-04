globalThis.foam = Object.assign({
  setup:    function() {
    this.setupFlags();
  },
  require: function (fn, batch, isProject) {
    if ( ! fn ) {
      return
    }

    var absolute = fn.startsWith("/");
    
    var path = fn.substring(0, fn.lastIndexOf('/') + 1);
    var file = absolute ? fn + ".js" : foam.cwd + fn + ".js";
    var oldCwd = foam.cwd;
    
    foam.cwd = absolute ? path : foam.cwd + path;
    importScripts(file);
    foam.cwd = oldCwd;
  },
  loadJSLibs: function(libs) {
    libs && libs.forEach(f => {
      importScripts(f.name);
    });
  }
}, globalThis.foam || {});

foam.require("foam");
