/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// JavaMaker

// NOTE: JavaMaker and JavacMaker shared data through X, they must
// be run in the same pmake call.

const fs_   = require('fs');
const path_ = require('path');

exports.description = 'generates .java files from .js models';

exports.args = [
  {
    // Isn't used directly by this Maker, but is used in java/refinements.js
    name: 'outdir',
    description: 'location to write generated .java files, default: {builddir}/src/java',
    factory: () => path_.resolve(path_.normalize(X.outdir || (X.builddir + '/src/java')))
  }
];

exports.init = function() {
  this.verbose('[Java] init');
  this.adaptOrCreateArgs(X, exports.args);
  this.ensureDir(X.outdir);

  // Turns on loading of foam/java/* models needed for java code generation.
  flags.genjava   = true;
  flags.java      = true;
  flags.loadFiles = true;
}

exports.end = function() {
  var self = this;
  // Promote all UNUSED Models to USED
  // 2 passes in case interfaces generated new classes in 1st pass
  for ( var i = 0 ; i < 2 ; i++ )
    for ( var key in foam.UNUSED ) {
      try { foam.maybeLookup(key); }
      catch(x) {
        // this.warning('[Java] UNUSED Model not found', key);
      }
    }

  var mCount = 0, jCount = 0;

  // Generate Java Source files
  for ( var key in foam.USED ) try {
    mCount++;
    if ( foam.maybeLookup(key)?.model_.targetJava(X) ) {
      jCount++;
    }
  } catch(e) {
    Object.keys(globalThis.foam.flags).forEach(f => {self.log("flag", f, globalThis.foam.flags[f]); });
    this.error('[Java] Model error:', key, e);
  }

  let msg = `[Java]: ${jCount}/${mCount} models processed.`;
  if ( jCount == 0 ) {
    this.warning(msg);
  } else {
    this.log(msg);
  }
}
