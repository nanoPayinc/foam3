foam.RELATIONSHIP({
   sourceModel: 'foam.lang.Currency',
   targetModel: 'foam.core.auth.Country',
   forwardName: 'countries',
   inverseName: 'currency',
   cardinality: '1:*'
 });
 
 foam.RELATIONSHIP({
   sourceModel: 'foam.lang.Currency',
   targetModel: 'foam.core.auth.Group',
   forwardName: 'groups',
   inverseName: 'currency',
   cardinality: '1:*'
 });