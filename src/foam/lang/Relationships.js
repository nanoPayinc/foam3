foam.RELATIONSHIP({
   sourceModel: 'foam.lang.Currency',
   targetModel: 'foam.core.auth.Country',
   forwardName: 'countries',
   inverseName: 'currency',
   cardinality: '1:*'
 });
 