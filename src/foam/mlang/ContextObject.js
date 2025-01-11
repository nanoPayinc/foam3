/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang',
  name: 'ContextObject',
  extends: 'foam.mlang.AbstractExpr',
  implements: [ 'foam.core.Serializable' ],

  documentation: 'An Expression that returns object in the context using key.',

  // javaGenerateDefaultConstructor: false,
  // javaGenerateConvenienceConstructor: false,

  javaImports: [
    'java.util.concurrent.ConcurrentHashMap',
    'java.util.Map'
  ],

  javaCode: `
  protected final static Map map__ = new ConcurrentHashMap();

  /**
   * Implement the multiton pattern so we don't create the same ContextObject
   * more than once.
   **/
  public static ContextObject create(String s) {
    ContextObject o = (ContextObject) map__.get(s);

    if ( o == null ) {
      o = new ContextObject(s);
      map__.put(s, o);
    }

    return o;
  }

  public foam.core.FObject fclone() { return this; }
  public foam.core.FObject shallowClone() { return this; }

/*
  // Can't be private because ContextObjects are currently created in journals
  public ContextObject() {
  }

  public ContextObject(String s) {
    setKey(s);
  }
  */
  `,

  properties: [
    {
      class: 'String',
      name: 'key'
    }
  ],

  methods: [
    {
      name: 'f',
      code: function(o) {
        return o[this.key];
      },
      javaCode: `
        return ((foam.core.X) obj).get(getKey());
      `
    }
  ]
});
