/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2',
  name: 'ModuleLib',
  extends: 'foam.u2.JsLib',

  documentation: `Extension of JsLib to support ES modules (.mjs files) using dynamic imports.

  This class provides a convenient way to dynamically load ES modules from CDNs or other sources
  and optionally make them available as global variables.

  Example usage:

  // Basic ES module loading
  await this.ModuleLib.create({
    src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs'
  }).installLib();

  // Load module and make it available globally
  await this.ModuleLib.create({
    src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs',
    globalName: 'pdfjsLib'
  }).installLib();

  // Real-world usage pattern from PDFParser.js:
  async function ensurePDFLibrary() {
    if ( typeof pdfjsLib === 'undefined' && ! this.pdfLibLoaded_ ) {
      await this.ModuleLib.create({
        src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs',
        globalName: 'pdfjsLib'
      }).installLib();
      this.pdfLibLoaded_ = true;
    }

    // Configure the loaded library
    if ( typeof pdfjsLib !== 'undefined' ) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';
    }
  }

  The module is cached after first load, so subsequent calls to installLib() for the same src
  will return the cached promise.`,

  properties: [
    {
      name: 'globalName',
      class: 'String',
      documentation: 'Optional global variable name to assign the module to (e.g., "pdfjsLib", "myModule")'
    }
  ],

  methods: [
    function installLib() {
      if ( ! document ) return;
      if ( ! this.LOADED[this.name] ) {
        var self = this;
        this.LOADED[this.name] = new Promise(function(resolve) {
          // Use dynamic import for ES modules
          import(self.src).then(function(module) {
            // Make the module available globally if globalName is specified
            if ( self.globalName ) {
              globalThis[self.globalName] = module;
            }
            resolve(module);
          }).catch(function(error) {
            console.error('Failed to load ES module:', self.src, error);
            // Still resolve to allow object creation
            resolve(null);
          });
        });
      }
      return this.LOADED[this.name];
    }
  ]
});