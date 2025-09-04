foam.POM({
  name: '{model}',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: '{Model}',                  flags: 'js|java' }
  ]
});
