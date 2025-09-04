/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.POM({
  name: 'git',
  envs: {
    FOAM_REVISION:     ['FOAM Revision. Defaults to git branch commit'],
    PROJECT_REVISION:  ['Root project git revision. Will be set JVM Manifest',null]
  },

  tasks: {
    getFOAMRevision: ['gen-foam-revision', 'Extract FOAM git hash.', [], function() {
      try {
        let out = this.execSync('git -C foam3 rev-parse --short HEAD');
        FOAM_REVISION = out.toString().trim();
      } catch (e) {
        this.warning('Cannot determine FOAM revision', e);
      }
    }],
    getProjectRevision: ['gen-project-revision', 'Extract project git hash.', [], function() {
      try {
        let out = this.execSync('git rev-parse --short HEAD');
        PROJECT_REVISION = out.toString().trim();
      } catch (e) {
        this.warning('Cannot determine project revision', e);
      }
    }],
    buildJavaManifest: ['gen-java-manifest', 'Contribute to  Java Manifest', ['getProjectRevision', 'getFOAMRevision'], function() {
      JAVA_MANIFEST += `\nImplementation-Version: ${FOAM_BIN_VERSION}`;
      JAVA_MANIFEST += `\nSpecification-Version: ${PROJECT_REVISION}`;
      JAVA_MANIFEST += `\n${APP_NAME}-Revision: ${PROJECT_REVISION}`;
      JAVA_MANIFEST += `\nFOAM-Revision: ${FOAM_REVISION}`;
    }],
    versions: ['versions', 'Show version information.', ['getProjectRevision', 'getFOAMRevision'], function() {
      console.log(`${APP_NAME} revision: ${PROJECT_REVISION}`);
      console.log(`FOAM revision:       ${FOAM_REVISION}`);
    }]
  }
});


// TODO/FUTURE - capture branch version from repository branch name
// getBranchVersion: ['git-branch-version', 'Extract possible version string from branch name. ex. Release-v3.36.3 -> 3.36.3', [], function() {
//   var name = this.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
//   // let regex = new RegExp("0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$");
//   let regex = new RegExp(/[0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?/, "gm");
//   let version = regex.exec(name);
//   console.log(`gitBranchVersion name:${name}, version:${version}`);
// }],
