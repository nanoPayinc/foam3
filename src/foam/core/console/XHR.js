/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'XHR',

  imports: [
  ],

  properties: [
    {
//      class: 'URL',
      class: 'String',
      name: 'url',
      displayWidth: 90
    },
    {
      class: 'Int',
      name: 'progress',
      view: { class: 'foam.u2.ProgressView' }
    },
    {
      class: 'String',
      name: 'data',
      transient: true,
      view: { class: 'foam.u2.tag.TextArea', rows: 16, cols: 90 },
      displayWidth: 100
    }
  ],

  methods: [
    function fetch_() {
      var latch = foam.lang.Latch.create();
      var xhr   = new XMLHttpRequest();

      this.progress = 0;

      xhr.open('GET', this.url, true);
      xhr.onprogress = e => {
        this.progress = Math.floor(100*e.loaded/e.total);
      };
      xhr.onload = e => {
        this.data = xhr.response;
        latch.resolve(this.data);
        this.progress = 100;
      };
      xhr.send();

      return latch;
    }
  ],

  actions: [
    function fetch() {
      this.fetch_();
    },

    function clear() {
      this.data = '';
    }
  ]
});
