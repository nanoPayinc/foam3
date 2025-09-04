foam.POM({
  name: '{model}',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: '{Model}',                  flags: 'js|java' },
    { name: '{Model}Category',          flags: 'js|java' }
  ]
});
