/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'AdapterDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: `DAO for adapting between "of" input type and "to" delegate
      type. I.e., accept put(<instance-of-"of">), and this.delegate.of === this.to.
      note: though this class is not used explicitly, keep it for backward compatability`,

  requires: [ 'foam.dao.ArraySink' ],

  classes: [
    {
      name: 'AdapterSink',
      extends: 'foam.dao.ProxySink',

      properties: [
        {
          class: 'Function',
          name: 'adapt',
          documentation: `"adapt(o)" adapts input to type expected by
              "delegate" sink.`,
          required: true
        }
      ],

      methods: [
        function put(o, sub) {
          this.delegate.put(this.adapt(o), sub);
        },
        function remove(o, sub) {
          this.delegate.remove(this.adapt(o), sub);
        }
      ]
    }
  ],

  properties: [
    {
      name: 'delegate',
    },
    {
      name: 'Function',
      name: 'adaptToDelegate',
      documentation: `Adapt this's "of" type to "delegate"'s "of" type.`,
      value: null
    },
    {
      name: 'Function',
      name: 'adaptFromDelegate',
      documentation: `Adapt "delegate"'s "of" type this's "of" type.`,
      value: null
    },
    {
      name: 'Function',
      name: 'adaptOrder',
      documentation: 'Adapt select() order to order understood by "delegate".',
      value: null
    },
    {
      name: 'Function',
      name: 'adaptPredicate',
      documentation: `Adapt select() predicate to predicate understood by
          "delegate".`,
      value: null
    }
  ],

  methods: [
    function put_(ctx, obj) {
      return this.delegate.put_(ctx, this.adaptToDelegate(ctx, obj)).
        then(this.adaptFromDelegate.bind(this, ctx));
    },

    function remove_(ctx, obj) {
      return this.delegate.remove_(ctx, this.adaptToDelegate(ctx, obj)).
        then(this.adaptFromDelegate.bind(this, ctx));
    },

    function find_(ctx, objOrId) {
      return this.delegate.find_(ctx, this.adaptToDelegate(ctx, objOrId)).
        then(this.adaptFromDelegate.bind(this, ctx));
    },

    function select_(ctx, sink, skip, limit, order, predicate) {
      sink = sink || this.ArraySink.create();

      // If we can adapt the query, then do the efficient thing and do so
      if ( !! this.adaptPredicate && !! this.adaptOrder ) {
        var adapterSink = this.AdapterSink.create({
          delegate: sink,
          adapt: (obj) => this.adaptFromDelegate(ctx, obj)
        });
        
        return this.delegate.select_(
          ctx, adapterSink, skip, limit,
          this.adaptOrder(order), this.adaptPredicate(predicate)).
          then(function() { return sink; });
      }

      
      var decorated = this.decorateSink_(sink, skip, limit, order, predicate);
      // otherwise, just decorate our sink and do a select all
      var adapterSink = this.AdapterSink.create({
        delegate: decorated,
        adapt: this.adaptFromDelegate.bind(this, ctx)
      });

      return this.delegate.select_(ctx, adapterSink).then(function() {
        return sink;
      });
    },

    function removeAll_(ctx, skip, limit, order, predicate) {
      return this.delegate.removeAll_(
          ctx, skip, limit,
          this.adaptOrder(order), this.adaptPredicate(predicate));
    }
  ]
});
