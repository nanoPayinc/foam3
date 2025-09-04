/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// CopyMaker
/*
  copy: [
    { source: '.', targetDir: 'webroot' },
    { source: '.' }, // default targetDir 'journals'
    { source: 'images', targetDir: 'images' }, // copy everything in images to build/images/
    { source: 'favicon', target: 'webroot/favicon' }
  ]
 */

exports.description = 'Copy from source to target directory. source/* -> target/';

const fs_   = require('fs');
const path_ = require('path');
const b_    = require('./buildlib');

const defaultTargetDir = 'journals';

exports.visitPOM = function(pom) {
  pom.copy && pom.copy.forEach(fn => {
    let source     = path_.resolve(foam.cwd, fn.source);
    let i          = source.lastIndexOf('/');
    let sourceName = i > 0 ? source.substring(i+1) : source;

    var targetDirName  = fn.targetDir || defaultTargetDir;
    if ( ! fn.targetDir && fn.target && fn.target.indexOf('/') > 0 ) {
      targetDirName = path_.dirname(fn.target);
    }
    let targetDir  = X.builddir + '/' + targetDirName;
    let targetName = fn.target && path_.posix.basename(fn.target) || sourceName;

    if ( fs_.lstatSync(source).isDirectory() ) {
      this.log(`[Copy Maker] Copying Directory ${source} to ${targetDirName}`);
      b_.copyDir(source, targetDir);
    } else {
      this.log(`[Copy Maker] Copying File ${sourceName} to ${targetDirName}/${targetName}`);
      b_.ensureDir(targetDir);
      b_.copyFile(source, targetDir+'/'+targetName);
    }
  });
}
