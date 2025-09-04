foam.CLASS({
  package: '{package}.test',
  name: '{Model}Test',
  extends: 'foam.core.test.Test',

  javaImports: [
    '{package}.*',
    'foam.dao.DAO',
    'foam.lang.X',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
        var {model} = new {Model}();
        test ( SafetyUtil.isEmpty({model}.getId()), "ID empty before create");
        {model} = ({Model}) ((DAO) x.get("{model}DAO")).put({model});
        test ( ! SafetyUtil.isEmpty({model}.getId()), "ID set after create");
      `
    }
  ]
});
