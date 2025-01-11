foam.LIB({
  name: 'foam.u2.wizard.Slot',

  methods: [
    {
      name: 'filter',
      code: function (from, f) {
        var s = foam.core.SimpleSlot.create({ value: from.get() });
        s.onDetach(from.sub(() => {
          var v = from.get();
          if ( f(v) ) s.set(v);
        }));
        return s;
      }
    },
    {
      name: 'blockFramed',
      code: function () {
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve();
            });
          });
        });
      }
    }
  ]
});

foam.LIB({
  name: 'foam.u2.wizard.Wizardlet',

  methods: [
    {
    name: 'camelCaseCapabilityId',
      code: function(capId) {
        return capId
        .split(/[.-]/)
        .map((word, index) => index == 0 ? word: word[0].toUpperCase() + word.slice(1))
        .join(''); 
      },
    }
  ]
})