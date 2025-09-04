/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
   Example tooling
   usage: node tools/build.js -Texample/Example -c
*/
foam.POM({
  name: 'example',
  envs: {
    EXAMPLE_RELEASE_DEFAULT: ['Example version default','3']
  },

  options: {
    example: [ 'e', 'example', 'EXAMPLE', 'Enable example.', false, function(arg) { EXAMPLE = arg ? this.bool(arg) : true; } ],
    exampleRelease: [ '', 'example-release', 'EXAMPLE_RELEASE', 'Set example release', '', arg => EXAMPLE_RELEASE = arg ],
    clean: [ 'c', 'clean', 'CLEAN', 'Clean generated code before building.  Required if generated classes have been removed. Use -XcleanAll to remove build/ directory. NOTE: if compilation fails after option c is issued, clean is again required until a succesful build.', false, function(arg) { CLEAN = arg ? this.bool(arg) : true; } ]
  },

  tasks: {
    runExample: ['run-example', 'Run example', [], function example() {
      console.log(`[Example] enabled ${EXAMPLE}, release ${EXAMPLE_RELEASE || EXAMPLE_RELEASE_DEFAULT}`); } ],
    examplePOMs: ['example-poms', 'Show POM structure.', [], function examplePOMs() {
      this.pmake.bind(this, `-makers=Verbose -flags=${this.flag('web,java')} -pom=${POMS} -builddir=${BUILD_DIR}`)();
    }],
    clean: ['clean', 'Clean', [], function clean() {
      console.log('[Example] clean');
    }],
    cleanAll: ['clean-all', 'CleanAll', ['clean'], function cleanAll() {
      console.log('[Example] cleanAll');
    }],
    all: ['all', 'Run example tasks.', [], function all() {
      console.log('[Example] all');
      this.execute('runExample');
      this.execute('examplePOMs');
    }],
    usage: ['usage', 'Example usage examples', [], function usage() {
      console.log('node tools/build.js -Texample/Example -c');
      console.log('node tools/build.js -Texample/Example -c --example:true --run-example');
    }]
  }
});
