/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// EnvVarMaker
// Generate bash script with environment properties from pom.
// The resulting bash script will be sourced by other build
// and deployment scripts.

/* Example
   envVars: [
    { name: 'SYSTEM_NAME', value: 'foam-foo' },
    { name: 'USER', value: 'foam' },
    { name: 'USER_ID', value: 1234 },
    { name: 'PORT', value: 8300 }
  ]

  generates build/env.sh
  #!/bin/bash
  NAME="foo"
  SYSTEM_NAME="foam-foo"
  VERSION="1.0.0"
  USER="foam"
  USER_ID=1234
  PORT=8300
*/

exports.description = 'create bash file with deployment properties';

const b_          = require('./buildlib');
const fs_         = require('fs');
var   properties  = {};

exports.visitPOM = function(pom) {
  if ( pom.envVars ) {
    pom.envVars.forEach(d => {
      if ( ! properties[d.name] ) {
        properties[d.name] = d.value;
      }
    });
  }
  if ( ! properties['NAME'] && pom.name ) {
    properties['NAME']=pom.name;
  }
  if ( ! properties['VERSION'] && pom.version ) {
    properties['VERSION']=pom.version;
  }
}

exports.end = function() {
  if ( ! properties['SYSTEM_NAME'] && properties['NAME'] ) {
    properties['SYSTEM_NAME'] = properties['NAME'];
  }

  var sh = '#!/bin/bash\n';
  for ( var key in properties ) {
    sh += key+'=';
    var value = properties[key];
    if ( Number(value) ) {
      sh += value;
    } else {
      sh += '"'+value+'"';
    }
    sh += '\n';
  }
  fs_.writeFileSync(X.builddir + '/env.sh', sh);
}
