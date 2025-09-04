/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

exports.description = 'Copies image/* files into /build/images';

exports.init = function() {
  X.imagedir = X.builddir + '/images';
  this.ensureDir(X.imagedir);
  // Collect image directories to process them in reverse order 
  // Why Reverse: check exports.end (contains `this.copyDir(..)`)
  this.imageDirs = [];
}


exports.visitDir = function(pom, f, fn) {
  if ( f.name === 'images' || ( f.name === 'favicon' && ! fn.includes('images') ) ) {
    this.verbose(`[Image Maker] Found ${fn}`);
    // Collect directories instead of copying immediately
    this.imageDirs.push(fn);
  }
}

// Process collected directories in reverse order
exports.end = function() {
  if ( ! this.imageDirs || this.imageDirs.length === 0 ) {
    this.log('[Image Maker] No image directories to process');
    return;
  }
  
  this.verbose(`[Image Maker] Processing ${this.imageDirs.length} image directories in reverse order`);
  
  // Reverse the array so application directories are processed last
  // That way if Application and FOAM have two images with same filename (e.g. export-icon.svg) then Application file will override FOAM image
  // As opposed, to previously when FOAM images would overwrite Application images if name was same.
  this.imageDirs.reverse().forEach(fn => {
    this.log(`[Image Maker] Copying ${fn} to ${X.imagedir}`);
    this.copyDir(fn, X.imagedir);
  });
  
  this.log('[Image Maker] Completed copying images');
}
