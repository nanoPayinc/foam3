/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// Bugs:
//  - Command.execute_ Action doesn't work in TableView because it has the wrong Context
//  - shows extra line between blocks

// Features:
//  - put current user in Context, use in Signature
//  - load/save Flows
//  ? how are Commands different than flows?


// ???: Would it be better to have compose rather than mixing Flowable?
foam.CLASS({
  package: 'foam.core.console',
  name: 'Flowable',

  properties: [
    'flowParent',
    {
      class: 'String',
      name: 'flowName'
    },
    {
      class: 'List',
      name: 'flowChildren'
    },
    { name: 'value' }
  ],

  methods: [
    function createFlowChildName(prefix) {
      for ( var i = 1, name = prefix ; ; ) {
        name = prefix + i++;
        if ( ! this.findFlowChildByName(name) ) return name;
      }
    },
    function findFlowChildByName(n) {
      return this.flowChildren.find(c => c.flowName === n);
    },
    function addFlowChild(f) {
      this.flowChildren = this.flowChildren.concat([f]);
      this.addFlowChild_ && this.addFlowChild_(f);
    },
    function removeFlowChild(f) {
      this.flowChildren = this.flowChildren.filter(c => c != f);
      this.removeFlowChild_ && this.removeFlowChild_(f);
    },
    function removeAllFlowChildren() {
      this.removeFlowChild_ && this.flowChildren.forEach(c => this.removeFlowChild_(c));
      this.flowChildren = [];
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'FlowableTree',
  extends: 'foam.u2.View',

  css: `
    ^ {
      width: 100%;
    }
    ^ table {
      width: 100%;
    }
    ^ tabel tr {
      padding: 4px;
    }
    ^ table td:nth-of-type(2) {
      width: 40px;
      text-align: right;
    }
    ^selected {
      outline: 2px solid #ccc;
    }
    ^error {
      color: red;
    }
  `,

  properties: [
    'selected'
  ],

  methods: [
    function render() {
      this.
        addClass().
        start('table').
        attr('cellpadding', '4').
        call(this.branch, [this, this.data, 0]);
    },

    function branch(self, data, depth) {
      this.add(data.dynamic(function (flowName) {
        this.start('tr').
          enableClass(self.myClass('selected'), self.selected$.map(s => s === data)).
          on('click', () => self.selected = data).
          start('td').
            enableClass(self.myClass('error'), flowName.startsWith('error')).
            style({'paddingLeft': (4 + depth * 12) + 'px'}).
            add(flowName).
          end().
          start('td').
            callIf(data.flowParent, function() {
              this.start().style({fontSize: '10px'}).on('click', () => data.flowParent.removeFlowChild(data)).add('X');
            }).
          end();
      }));
      this.add(data.dynamic(function (flowChildren) {
        this.forEach(flowChildren, d => {
          this.call(self.branch, [self, d, depth+1]);
        });
      }));
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'Block',
  extends: 'foam.u2.Controller',

  mixins: [ 'foam.core.console.Flowable' ],

  imports: [ 'showPrompts' ],

  exports: [ 'log', 'out', 'addValue' ],

  css: `
    ^ {
      padding: 4px;
      padding-right: 0;
    }
    ^output {
    }
    ^prompt {
      display: flex;
      font-weight: bold;
      padding-top: 0;
      margin-top: -2px;
      padding-right: 4px;
      height: 20px;
    }
    ^ span .property-cmd { width: inherit; }
    ^ .foam-u2-ActionView-del { font-weight: lighter; font-size: smaller; border: none; background: transparent; height: 20px; }
    ^ .foam-u2-TextField-cmd { border: none; height: 20px; }
    ^:hover { background: #f4f4f4; }
    ^ .foam-u2-ReadWriteView { padding-right: 8px; }
    ^ .foam-u2-ReadWriteView .foam-u2-TextField { height: 20px; }
  `,

  properties: [
    {
      class: 'String',
      name: 'cmd'
    },
    [ 'value', null ],
    'out'
  ],

  methods: [
    function render() {
      this.
        addClass().
        start('span').
          show(this.showPrompts$).
          style({display: 'flex', width: '100%', fontWeight: 'bold'}).
          start('span').addClass(this.myClass('prompt')).start(foam.u2.ReadWriteView, {data$: this.flowName$}).end().add(' = ').end().
          add(this.CMD, this.DEL).
        end().
        start('div', {}, this.out$).
          addClass(this.myClass('output')).
        end();
    },

    function addValue(o, skipOutput) {
      if ( ! skipOutput ) this.out.add(o);
      this.value = o;
    },

    function log(...args) {
      if ( args.length == 0 ) return;
      if ( this.seen ) this.out.tag('br');
      this.seen = true;
      this.out.add(args.join(' '));
    }
  ],

  actions: [
    {
      name: 'del',
      label: 'X',
      code: function() {
        this.flowParent && this.flowParent.removeFlowChild(this);
      }
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'Layout',
  extends: 'foam.u2.Element',

  css: `
    ^ {
      display: flex;
      height: 100%;
    }
    ^l {
      box-shadow: 3px 3px 6px 0 gray;
      padding: 4px;
      width: 350px;
    }
    ^m {
      overflow-x: auto;
      padding-right: 0;
    }
    ^r {
      box-shadow: 3px 3px 6px 0 gray;
      overflow-y: auto;
      padding: 4px 4px 4px 8px;
      width: 60%;
    }
  `,

  properties: [
    'showLeft',
    'showRight',
    'left',
    'middle',
    'right'
  ],

  methods: [
    function render() {
      this.
        addClass().
        start('div', {}, this.left$  ).addClass(this.myClass('l')).show(this.showLeft$).end().
        start('div', {}, this.middle$).addClass(this.myClass('m')).end().
        start('div', {}, this.right$ ).addClass(this.myClass('r')).show(this.showRight$).end();
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'Console',
  extends: 'foam.u2.Controller',

  mixins: [ 'foam.core.console.Flowable' ],

  requires: [
    'foam.core.console.Block',
    'foam.core.console.Flow',
    'foam.core.console.FlowableTree',
    'foam.core.console.Layout',
    'foam.core.console.ReactiveDetailView',
    'foam.dao.ArrayDAO',
    'foam.flow.Document',
    'foam.u2.Link'
  ],

  imports: [ 'commandDAO', 'scope?', 'window', 'setTimeout' ],

  exports: [
    'clearFlow',
    'currentBlock',
    'eval_',
    'flowScope as scope',
    'history_',
    'log',
    'out',
    'scrollToBottom',
    'showPrompts'
  ],

  css: `
    ^ {
      display: flex;
      flex-direction: column;
      box-shadow: 3px 3px 6px 0 gray;
      width: 100%;
      height: 100%;
      margin-bottom: 4px;
      padding: 0 8px;
    }
    ^input-field {
      margin-block-end: 0;
      display: inline-flex;
      width: 100%;
      align-items: center;
      position: sticky;
      bottom: 0;
    }
    ^input-field, ^input-field ^input {
      background: $grey50;
    }
    ^output {
      font-family: monospace;
      text-align: left;
      align-content: flex-end;
      flex: 1;
      overflow: auto;
    }
    ^ .property-input {
      border: none !important;
    }
    ^ .foam-u2-view-ValueView {
      min-width: 220px;
    }
    .foam-core-console-Layout-l { overflow-y: auto; }
    .foam-core-console-Layout-r .foam-core-console-PropertyBorder-richText .foam-core-console-PropertyBorder-propHolder { margin-left: -85px; }
    ^ .foam-u2-ProgressView { width: 600px; }
  `,

  properties: [
    {
      class: 'String',
      name: 'input',
      view: {
        class: 'foam.u2.TextField', // Avoids ModeAltView focus() issue
        autocomplete: 'off',
        onKey: false
      },
    },
    'input_', // Element pointer
    {
      name: 'out'
    },
    {
      class: 'Boolean',
      name: 'showPrompts',
      value: true
    },
    {
      class: 'StringArray',
      name: 'history_',
      factory: function() {
        try {
          return JSON.parse(this.window.localStorage[this.historyKey()]);
        } catch (x) {
        }
        return [];
      }
    },
    {
      class: 'Int',
      name: 'historyLength',
      value: 50
    },
    {
      class: 'Int',
      name: 'historyPosition',
      value: 0
    },
    {
      name: 'localScope',
      // TODO: contains commands, so maybe commandScope would be a better name
      factory: function() {
        return {
          this:   this,
          output: this.out // TODO: used?
        };
      }
    },
    {
      name: 'flowScope',
      factory: function() { return {}; }
    },
    'currentBlock',
    {
      name: 'selected'
    },
    {
      name: 'selectedValue'
    },
    {
      name: 'value',
      // The Console's Flow Value, which is the Flow object it is saved as
      factory: function() {
        return this.Flow.create({name: 'Unnamed'});
      }
    }
  ],

  methods: [
    function clearFlow() {
      this.removeAllFlowChildren();
    },

    function historyKey() {
      return this.cls_.id + '_HISTORY';
    },

    async function render() {
      this.SUPER();

      this.flowName$.sub(() => this.refreshFlowScope());
      this.value$.sub(() => this.refreshFlowScope());

      globalThis.shell = this; // for debugging

      this.selectedValue$.follow(this.selected$.dot('value'));

      // Add commands to localScope
      var cmds = await this.commandDAO.select();
      cmds.array.forEach(c => {
        this.localScope[c.id] = (...args) => {
          var cmd = c.clone(this.currentBlock);
          return cmd.execute.apply(cmd, args);
        }
      });

      this.flowName$ = this.value.name$;

      var layout = this.start(this.Layout);

      layout.showLeft$  = this.showPrompts$;
      layout.showRight$ = this.showPrompts$;

      layout.left.tag(this.FlowableTree, {data: this, selected$: this.selected$});
      layout.middle.call(this.renderSelf, [this]);
      layout.right.tag(this.ReactiveDetailView, {data$: this.selectedValue$});
    },

    function renderSelf(self) {
      this.
        addClass(self.myClass()).
        start('div', null, self.out$)
        .addClass(self.myClass('output')).end().
        start('span').
          addClass(self.myClass('input-field')).
          start('b').style({ display: 'flex', 'white-space': 'pre'}).
            start(self.Link).add('help').on('click',    () => self.eval_('help'),    this).end()./*add(', ').
            start(self.Link).add('history').on('click', () => self.eval_('history'), this).end().*/add(' >').
          end().
          start(self.INPUT, null, self.input_$).
            addClass(self.myClass('input')).
            on('keyup', e => { if ( e.key == 'Enter' || e.keyCode == 13 ) self.onInput(); }).
          end().
          tag(self.ON_INPUT).
        end();

        // These observers might cause scroll issues later when queries in the console can be edited
        // In that case there should be an explicit flag to only do the scroll when the query is submitted
      // from the main console input
      /*
        const resizeObserver = new ResizeObserver(this.scrollToBottom.bind(this));
        var observer = new MutationObserver(function(mutations) {
          for (const record of mutations) {
            for (const addedNode of record.addedNodes) {
              if ( addedNode.nodeType === Node.ELEMENT_NODE )
                resizeObserver.observe(addedNode);
            }
            for (const removedNode of record.removedNodes) {
              if ( removedNode.nodeType === Node.ELEMENT_NODE )
                resizeObserver.unobserve(removedNode);
            }
            if (record.target.childNodes.length === 0) {
              resizeObserver.disconnect();
              observer.disconnect();
            }
          }
        });
        var config = { attributes: true, childList: true, characterData: true };

        observer.observe(this.out.element_, config);
        this.onDetach(() => observer.disconnect());
        this.setTimeout(this.focusInput.bind(this), 500)
        */
    },

    function log(...args) {
      debugger;
      this.currentBlock.log.apply(this.currentBlock, args);
    },

    function scrollToBottom() {
      if ( this.U3 ) {
        this.out.element_.scrollTop = this.out.element_.scrollHeight;
      }
    },

    function addHistory(cmd) {
      if ( cmd.startsWith('history') || cmd.startsWith('help') ) return;
      // avoid adjacent duplicates
      if ( cmd == this.history_[this.history_.length-1] ) return;
      this.history_.push(cmd);
      while ( this.history_.length > this.historyLength ) this.history_.shift();
      this.window.localStorage[this.historyKey()] = foam.json.stringify(this.history_);
    },

    function refreshFlowScope() {
      var s = this.flowScope;

      // Remove old bindings
      for ( var x in s )
        if ( s.hasOwnProperty(x) )
          delete s[x];

      // Add binding for this
      s[this.flowName] = this.value;

      // Add bindings for children
      this.flowChildren.forEach(c => {
        if ( c.value ) s[c.flowName] = c.value;
      });
    },

    async function eval_(cmd) {
      var self = this;

      cmd = cmd.trim();

      this.clearProperty('historyPosition');
      if ( ! cmd ) return;
      this.addHistory(cmd);

//      this.out.tag('br').start().show(self.showPrompts$).start('b').add('> ').end().add(cmd);
      var block = this.currentBlock = this.Block.create({flowName: this.createFlowChildName('a'), cmd: cmd, flowParent: this});
      this.addFlowChild(block);

      var innerScope = {
        // shell: this,
        eval_: this.eval_.bind(this),
        addValue: block.addValue.bind(block),
        log: block.log.bind(block),
        out: block.out, start: block.out.start.bind(block.out),
        tag: block.out.tag.bind(block.out)
      };

      // TODO: move into Block
      with ( this.scope || {} ) { with ( this.localScope ) { with ( innerScope ) { with ( this.flowScope ) {
        let scope = { ...(this.scope || {} ), ...this.localScope };
        var r, arg;
        try {
          r = eval(cmd);
          // For commands like 'cells(2,3)' pickout 'cells' as the block name
          var m = cmd.match(/^\s*([a-zA-Z][a-zA-Z0-9_\$]*)\(/);
          if ( m ) block.flowName = this.createFlowChildName(m[1]);
        } catch (x) {
          var i = cmd.indexOf(' ');
          if ( i != -1 ) {
            arg = cmd.substring(i+1);
            cmd = cmd.substring(0,i);
            r = scope[cmd];
          } else {
            r = scope[cmd];
          }
          if ( r ) {
            block.flowName = this.createFlowChildName(cmd);
          } else {
            console.log(x);
            block.flowName = this.createFlowChildName('error');
          }
        }
        if ( typeof r === 'function' ) {
          if ( ! block.flowName.startsWith(cmd) )
            block.flowName = this.createFlowChildName(cmd);
          r = arg ? r(arg) : r();
        }
        if ( r instanceof Promise ) {
          r = await r;
        }
      }}}}

      this.selected = block;

      if ( r ) {
        if ( foam.String.isInstance(r) ) {
          block.value = foam.lang.StringHolder.create({value: r});
          block.out.add(block.value.value$);
        } else if ( foam.Number.isInstance(r) ) {
          block.value = foam.lang.FloatHolder.create({value: r});
          block.out.add(block.value.value$);
        } else if ( foam.Boolean.isInstance(r) ) {
          block.value = foam.lang.BooleanHolder.create({value: r});
          block.out.add(block.value.value$);
        } else if ( foam.Date.isInstance(r) ) {
          block.value = foam.lang.DateTimeHolder.create({value: r});
          block.out.add(block.value.value$);
        } else {
          block.log(r);
        }
      }

      this.input_.focus();

      this.setTimeout(() => this.scrollToBottom(), 16);
      this.setTimeout(() => this.scrollToBottom(), 32);
      this.setTimeout(() => this.scrollToBottom(), 64);
      this.setTimeout(() => this.scrollToBottom(), 96);

      return block;
    },

    function addFlowChild_(c) {
      this.refreshFlowScope();
      c.flowName$.sub(() => this.refreshFlowScope());
      c.value$.sub(() => this.refreshFlowScope());
      this.out.add(c);
    },

    function removeFlowChild_(c) {
      c.remove();
    }
  ],

  actions: [
    {
      name: 'helpKey',
      code: function() { this.help(); },
      keyboardShortcuts: [ 'f1' ]
    },
    {
      name: 'focusInput',
      code: function() { this.input_.focus(); },
      keyboardShortcuts: [ 'ctrl-`' ]
    },
    {
      name: 'togglePrompts',
      code: function() { this.showPrompts = ! this.showPrompts; },
      keyboardShortcuts: [ 'escape' ]
    },
    {
      name: 'stepUpHistory',
      code: function() {
        this.historyPosition = foam.Number.clamp(0, this.historyPosition+1, this.history_.length);
        this.input = this.history_[this.history_.length - this.historyPosition] ?? '';
      },
      keyboardShortcuts: [ 'arrowup' ]
    },
    {
      name: 'stepDownHistory',
      code: function() {
        this.historyPosition--;
        this.input = this.history_[this.history_.length - this.historyPosition] ?? '';
      },
      keyboardShortcuts: [ 'arrowdown' ]
    },
    {
      name: 'onInput',
      label: '',
      themeIcon: 'next',
      size: 'SMALL',
      buttonStyle: 'TEXT',
      code: function() {
        var input = this.input;
        this.input = '';
        this.eval_(input);
      },
      // Using 'enter' keyboard shortcut doesn't work because it prevents newlines in
      // text areas on the screen.
      // keyboardShortcuts: [ 'enter' ]
    },
    {
      name: 'clear',
      code: function() {
        this.clearFlow();
        this.focusInput();
      },
      keyboardShortcuts: [ 'meta-k', 'ctrl-k' ]
    }
  ],

  listeners: [
    {
      name: 'onClick',
      // TODO: introduce a merge delay so that cut&paste still works
      // but a better solution might be to wait for a keypress then set the focus
      // and copy the key
      isMerged: true,
      mergeDelay: 600,
      code: function() { this.input_.focus(); }
    }
  ]
});

/* TODO:
   modes: Doc, Prompt/Console, Calc
   Input
*/
