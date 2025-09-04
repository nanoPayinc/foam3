/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'org.chartjs',
  name: 'SequentialJsLib',
  
  documentation: 'Axiom to load multiple JS libraries in sequence.',
  
  properties: [
    {
      class: 'StringArray',
      name: 'sources',
      documentation: 'Array of JS library URLs to load in sequence'
    },
    {
      name: 'name',
      factory: function() { 
        return 'SequentialJsLib-' + this.sources.join(','); 
      }
    },
    {
      name: 'priority', 
      value: 20 
    }
  ],

  methods: [
    function installInClass(cls) {
      // Store the sources on the class for later use
      cls.sequentialJsSources_ = this.sources;
    },

    function installInProto(proto) {
      var sources = proto.cls_.sequentialJsSources_;
      if ( ! sources ) return;

      // Store the libraries loading promise on the class
      if ( ! proto.cls_.librariesLoaded_ ) {
        // Load each library in sequence, waiting for each to complete
        proto.cls_.librariesLoaded_ = sources.reduce(function(promise, src) {
          return promise.then(function() {
            return foam.u2.JsLib.create({ src: src }).installLib();
          });
        }, Promise.resolve());
      }

      // Hook into methods that need the libraries to be loaded
      if ( proto.render ) {
        var originalRender = proto.render;
        proto.render = function() {
          var self = this;
          var args = arguments;
          
          return proto.cls_.librariesLoaded_.then(function() {
            return originalRender.apply(self, args);
          });
        };
      }
      
      if ( proto.paintSelf ) {
        var originalPaintSelf = proto.paintSelf;
        proto.paintSelf = function() {
          var self = this;
          var args = arguments;
          
          return proto.cls_.librariesLoaded_.then(function() {
            return originalPaintSelf.apply(self, args);
          });
        };
      }
    }
  ]
});