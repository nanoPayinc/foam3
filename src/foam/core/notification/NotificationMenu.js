foam.CLASS({
   package: 'foam.core.notification',
   name: 'NotificationMenu',
   extends: 'foam.core.menu.Menu',


   properties: [
      {
         name: 'readPredicate',
         initObject: function(o) {
         /* ignoreWarning */
         o.readPredicate = foam.mlang.predicate.Func.create({
            fn: async function(o) {
               return !localStorage.getItem('refusedNotification') && 
                  (await o.__subContext__.pushRegistryAgent.currentState.promise) === 'DEFAULT';
               }
            }, this)
         }
      }
   ],
})