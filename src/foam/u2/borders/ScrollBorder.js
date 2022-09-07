/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.borders',
  name: 'ScrollBorder',
  extends: 'foam.u2.Element',

  css: `
    ^ {
      display: flex;
      flex-direction: column;
    }
    ^reverse {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
    }
    ^::before {
      display: block;
      opacity: 0;
      height: 7px;
      min-height: 7px;
      width: 100%;
      content: '';
      z-index: 10;
      background: linear-gradient(to bottom, #DADDE2 0, #ffffff00 7px, #ffffff00 100%);
      top: 0;
      position: sticky;
    }
    ^::after {
      display: block;
      opacity: 0;
      height: 7px;
      min-height: 7px;
      width: 100%;
      content: '';
      z-index: 10;
      background: linear-gradient(to top, #DADDE2 0, #ffffff00 7px, #ffffff00 100%);
      bottom: 0;
      position: sticky;
    }
    ^topShadow::before {
      opacity: 1;
    }
    ^botShadow::after {
      opacity: 1;
    }
    ^::-webkit-scrollbar {
      width: 0;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
    }
  `,

  properties: [
    {
      class: 'Boolean',
      name: 'topShadow'
    },
    {
      class: 'Boolean',
      name: 'botShadow'
    },
    'topEdge_', 'botEdge_'
  ],

  methods: [
    function init () {
      this
        .addClass()
        .enableClass(this.myClass('topShadow'), this.topShadow$)
        .enableClass(this.myClass('botShadow'), this.botShadow$)
        .start('', {}, this.topEdge_$).attr('data-pos', 'topShadow').addClass('edge').end()
        .start()
          .addClass(this.myClass('reverse'))
          .start('', {}, this.botEdge_$).attr('data-pos', 'botShadow').addClass('edge').end()
          .tag('div', null, this.content$)
        .end()
        ;
      this.addObserver();
    },
    async function addObserver () {
      const root = await this.el();
      const options = {
        root,
        rootMargin: '0px 0px 0px',
        threshold: [0.25, 0.5, 0.25]
      };
      
      const observer = new IntersectionObserver(this.onScrollUpdate, options);

      (async () => {
        observer.observe(await this.topEdge_.el());
      })();
      (async () => {
        observer.observe(await this.botEdge_.el());
      })();
    }
  ],

  listeners: [
    {
      name: 'onScrollUpdate',
      isFramed: true,
      code: function (entries) {
        for ( const entry of entries ) {
          const prop = entry.target.dataset.pos;
          this[prop] = ! entry.isIntersecting;
        }
      }
    }
  ]
});