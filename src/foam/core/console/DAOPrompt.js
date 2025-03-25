/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'DAOPrompt',
  extends: 'foam.u2.Controller',

  implements: [
    'foam.mlang.Expressions'
  ],

  requires: [
    'foam.parse.QueryParser',
    'foam.u2.DetailView',
    'foam.u2.Link',
    'foam.u2.tag.CircleIndicator'
  ],

  imports: [ 'eval_', 'setTimeout', 'scrollToBottom' ],

  exports: [
    'block',
    'dao',
    'sinkDAO',
    'sinkUnlimitedDAO'
  ],

  css: `
    ^ .foam-u2-TextInputCSS {
      width: auto;
      height: 22px;
    }
    ^ .foam-u2-TextInputCSS,.foam-u2-TextArea {
      height: auto;
    }
    ^ select[name="selectChoice"] {
      width: 130px;
    }
    ^ .property-skip { display: inline-flex; }
    ^helper-icon svg { fill: currentColor; }
    ^helper-icon { vertical-align: sub; }
    ^content {
      max-height: 700px;
      overflow-y: auto;
      border: 1px solid gray;
    }
  `,

  properties: [
    {
      class: 'String',
      name: 'daoKey',
      adapt: function(o, n) {
        if ( this.__context__[n] ) return n;
        if ( this.__context__[n + 'DAO'] ) return n + 'DAO';
        if ( n.endsWith('s') ) return n.substring(0, n.length-1) + 'DAO';
        return n;
      }
    },
    {
      name: 'dao',
      factory: function() {
        return this.__context__[this.daoKey];
      }
    },
    {
      name: 'sinkDAO'
    },
    {
      name: 'sinkUnlimitedDAO'
    },
    {
      class: 'Int',
      name: 'skip',
      displayWidth: 5,
      view: function(_, X) {
        return {
          class: 'foam.u2.view.DualView',
          viewa: { class: 'foam.u2.IntView' },
          viewb: { class: 'foam.u2.RangeView', minValue: 0, maxValue: X.data.rowCount-1, onKey: true }
        };
      }
    },
    {
      class: 'Int',
      name: 'limit',
      value: 100,
      placeholder: '',
      size: 5
    },
    {
      class: 'String',
      name: 'where',
      displayWidth: 55,
      view: { class: 'foam.u2.TextField', type: 'search' } // adds 'x' to clear field
    },
    {
      class: 'String',
      name: 'order',
      displayWidth: 60,
      view: { class: 'foam.u2.TextField', type: 'search' } // adds 'x' to clear field
    },
    {
      name: 'orderChoice',
      view: function(_, X) {
        return {
          class: 'foam.core.console.PropertyOrderChoiceView',
          of: X.data.dao.of,
          allowEmptyChoice: true
        };
      },
      postSet: function(o, n) {
        if ( n == '--' ) return;
        if ( this.order ) this.order += ',';
        this.order += n;
      }
    },
    {
      name: 'propertyChoice',
      view: function(_, X) {
        var choices = [ '--' ];
        X.data.dao.of.getAxiomsByClass(foam.lang.Property).forEach(p => {
          if ( ! p.searchable && ( p.hidden || p.networkTransient ) ) return;
          if ( foam.lang.Boolean.isInstance(p) ) {
            choices.push('is:'  + p.name);
            choices.push('-is:' + p.name);
          } else {
            choices.push(p.name);
          }
        });
        return { class: 'foam.u2.view.ChoiceView', choices: choices };
      },
      preSet: function(o, n) {
        if ( n == '--' ) return;
        if ( this.where ) this.where += ' ';
        this.where += n;
        return n;
      }
    },
    {
      name: 'whereChoice',
      view: function(_, X) {
        var choices = [
          'MQL',
          'MLang',
          'FScript'
        ];
        X.data.dao.of.getAxiomsByClass(foam.comics.v2.CannedQuery).forEach(q => {
          choices.push([ q.predicate, q.label ]);
        });
        return { class: 'foam.u2.view.ChoiceView', choices: choices };
      }
    },
    {
      class: 'String',
      name: 'columns',
      view: function(_, X) {
        return {
          class: 'foam.core.console.PropertyListView',
          of: X.data.dao.of
        };
      }
    },
    {
      name: 'select',
      view: { class: 'foam.core.console.SinkView', sinksOnly: false }
    },
    'content',
    'rowCount',
    { name: 'executionTime', value: '-' },
    { class: 'Boolean', name: 'hasRun' },
    'block'
  ],

  methods: [
    async function render() {
      this.SUPER();

      this.block = this.__context__.currentBlock;

      this.addClass();

      // We await for the rowCount so we know how to size the slider for the limit
      this.rowCount = (await this.dao.select(this.COUNT())).value;

      this.
        start(this.Link).add(this.daoKey$, '.').on('click', this.describe).end().
        start('div').style({'margin-top': '0', 'margin-left': '20px', 'margin-bottom': '6px', 'line-height': '26px'}).
        add('skip(',    this.SKIP,  ').').br().
        add('limit(',   this.LIMIT, ').').br().
        add('where(').
        start(this.WHERE_CHOICE).
          style({'display': 'inline-flex'}).
        end().
        add(' ', this.WHERE, ' ').
        start(this.PROPERTY_CHOICE).style({'display': 'inline-flex'}).end().
        add('). ').
        start(this.CircleIndicator, {glyph: 'helpIcon', icon: '/images/question-icon.svg', size:20}).addClass(this.myClass('helper-icon')).on('click', () => this.eval_('mqlhelp')).end().
        br().
        add('orderBy(', this.ORDER, ' ').start(this.ORDER_CHOICE).style({'display': 'inline-flex'}).end().add(').').br().
        add('select(').add(this.SELECT, ')').br().
        add('columns: ', this.COLUMNS).
      end().
      add(this.RUN, ' ', this.CLEAR).br().
      start().
        style({'padding-top': '10px'}).
        // show(this.rowCount$.map(c=>c !== undefined)).
        add('Count: ', this.rowCount$, ', Execution time: ', this.executionTime$).
      end().br().
      start('div').style({fontSize: 'smaller', textDecoration: 'underline'}).on('click', this.copyToClipboard).add('copy').end().
      start('div', {}, this.content$).addClass(this.myClass('content')).style({fontSize: 'smaller'}).end();
    }
  ],

  actions: [
    {
      name: 'run',
      code: async function() {
        if ( ! this.hasRun ) {
          this.hasRun = true;
          this.skip$.sub(this.onSkip);
        }
        var dao = this.dao;
        if ( this.whereChoice && typeof this.whereChoice != 'string' ) {
          dao = dao.where(this.whereChoice);
        }

        // Version which compiles on the Server
        // if ( this.where ) dao = dao.where(this.MQL(this.where));

        // Version which compiles on the Client
        if ( this.where) {
          var p = this.QueryParser.create({of: dao.of}).parseString(this.where);
          dao = dao.where(p);
          // TODO: display syntax error if didn't parse
        }

        if ( this.skip  ) dao = dao.skip(this.skip);
        if ( this.order ) {
          // TODO: Move this logic somewhere more reusable (to QueryParser maybe?)
          // QueryParser already knows how to find properties using either the name, shortName, or alias, case-insensitive
          // So just reuse it.
          var parser = this.QueryParser.create({of: dao.of});
          var c = null; // created compartor
          var s = '';   // created string

          this.order.trim().split(',').reverse().forEach(n => {
            n = n.trim();
            var desc = n.startsWith('-');
            if ( desc ) n = n.substring(1);
            var prop = parser.parseString(n, 'fieldname');
            if ( prop ) {
              if ( s ) s = ',' + s;
              s = prop.name + s;
              if ( desc ) s = '-' + s;
              if ( desc ) prop = this.DESC(prop);
              c = c ? this.THEN_BY(prop, c) : prop;
            }
          });
          this.order = s;
          if ( c ) dao = dao.orderBy(c);
        }
        this.sinkUnlimitedDAO = dao;
        if ( this.limit ) dao = dao.limit(this.limit);
        this.sinkDAO = dao;

        var agent     = this.select;
        var out       = this.content.start().style({display: 'none'});
        var startTime = Date.now();

        await agent.execute(out);
        this.executionTime = foam.lang.Duration.duration(Date.now() - startTime);

        this.setTimeout(() => {
          this.previousOutput?.remove();
          this.previousOutput = out;
          out.style({display: 'block'});
        }, 17)
      }
    },
    function clear() {
      this.content.removeAllChildren();
    }
  ],

  listeners: [
    {
      name: 'onSkip',
      isMerged: true,
      delay: 64,
      code: function() { this.run(); }
    },
    function describe() {
      this.eval_('describe ' + this.dao.of.id);
    },
    function copyToClipboard() {
      var range = document.createRange();
      range.selectNode(this.content.element_);
      window.getSelection().empty();
      window.getSelection().addRange(range);
    }
  ]
});

// Does DAO.orderBy() take vargs? It should.
