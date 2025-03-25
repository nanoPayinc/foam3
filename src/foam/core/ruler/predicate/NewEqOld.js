/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.ruler.predicate',
  name: 'NewEqOld',

  documentation: 'Returns true if the new and old objects passed to the rule engine are equal.',

  javaImports: [
    'foam.lang.PropertyInfo',
    'java.util.HashSet'
  ],

  properties: [
    {
      name: 'ignores',
      class: 'String',
      documentation: 'Ignored properties separated by comma.',
      value: 'lastModified, lastModifiedBy, userFeedback'
    }
  ],

  ruleF: `
    if ( o == null                    ) return n == null;
    if ( o.getClass() != n.getClass() ) return false;

    var clsInfo = n.getClassInfo();
    var ignores = new HashSet<PropertyInfo>();
    for ( var propName : getIgnores().split("\\\\s*,\\\\s*") ) {
      var prop = (PropertyInfo) clsInfo.getAxiomByName(propName);
      if ( prop != null ) ignores.add(prop);
    }

    for ( var prop : clsInfo.getAxiomsByClass(PropertyInfo.class) ) {
      if ( ignores.contains(prop) ) continue;
      if ( prop.compare(o, n) != 0 ) return false;
    }
    return true;
  `
});
