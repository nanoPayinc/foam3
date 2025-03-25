/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// CopyMaker

exports.description = 'Copy from source to target directory.';

const fs_   = require('fs');
const path_ = require('path');
const b_    = require('./buildlib');

var defaultTargetDir = 'journals';

exports.visitPOM = function(pom) {
  pom.copy && pom.copy.forEach(fn => {
    var source     = path_.resolve(foam.cwd, fn.source);
    var i          = source.lastIndexOf('/');
    var sourceName = source.substring(i+1);

    var targetDir  = fn.targetDir || defaultTargetDir;
    var target     = X.builddir + '/' + targetDir + '/' + sourceName;

    if ( fs_.lstatSync(source).isDirectory() ) {
      console.log(`[Copy Maker] Copying Directory ${source} to ${targetDir}`);
      b_.copyDir(source, targetDir);
    } else {
      console.log(`[Copy Maker] Copying File ${source} to ${target}`);
      b_.ensureDir(path_.dirname(target));
      b_.copyFile(source, target);
    }
  });
}
