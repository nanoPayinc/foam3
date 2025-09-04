/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'ReflowConfigView',
  extends: 'foam.u2.Tabs',
  //TODO: reactions dont work for block properties
  requires: [
    'foam.core.reflow.ReactiveSectionedDetailView',
    'foam.core.reflow.Block'
  ],
  css:` 
    ^ {
      gap: 10px;
    }
    ^rightBar-title {
      border-bottom: 1px solid $borderLight;
      padding: 8px 16px;
    }
  `,

  properties: [
    {
      name: 'data'
    },
    {
      name: 'selectedValue',
      expression: function(data) {
        return this.data?.value;
      }
    }
  ],
  methods: [
    function render() {
      let self = this;
      this.SUPER();
      this.start(this.Tab, { label: 'Flow Properties' })
        .call(function() {
          self.onDetach(self.data$.sub(() => {
            self.selected = this;
          }));
        })
        .add(this.dynamic(function(data$configViewSpec, selectedValue) {
          if ( ! selectedValue ) return;
          this.tag(self.ReactiveSectionedDetailView, {
            of: selectedValue.cls_.id ?? '',
            ...(data$configViewSpec || {}),
            data: selectedValue,
            showActions: true,
            showHeader: true
          });
        }))
      .end()
      .start(this.Tab, { label: 'Block Properties' })
        .add(this.dynamic(function(data) {
          if ( ! data || data.deleted_ || ! self.Block.isInstance(data) ) {
            this.add('No block selected');
            return;
          }
          this.tag(self.ReactiveSectionedDetailView, {
            ...(data.configViewSpec || {}),
            data: data,
            showActions: true,
            showHeader: true
          });
        }))
      .end();;
    }
  ]
})