/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function processArgs(args, x, defaultFlags, cmds) {

  var flags = globalThis.foam.flags || {};

  // This supports calling directly or via exec_ where args are passed via process.
  var argv = args && args[0].split(' ') || process.argv.slice(2);

  if ( defaultFlags ) for ( var key in defaultFlags ) {
    flags[key] = defaultFlags[key];
  }

  // Flags
  while ( argv.length ) {
    if ( ! argv[0].startsWith('-') ) break;

    var arg = argv.shift();

    var i = arg.indexOf('=');
    if ( i == -1 ) {
      // console.log('command: ' + arg);
      // arg = arg.substring(1);
      if ( cmds && cmds[arg] ) {
        cmds[arg]();
      } else {
        console.log('Unknown command: ' + arg);
      }
    } else {
      var key   = arg.substring(1, i);
      var value = arg.substring(i + 1);
      if ( key === 'flags' ) {
        value.split(',').forEach(f => {
          if ( ! f ) return; // empty string ''
          if ( f.startsWith('-') ) {
            flags[f.substring(1)] = false;
          } else {
            flags[f] = true;
          }
        });
      } else {
        if ( value.startsWith("'") ) {
          while ( ! value.endsWith("'") ) {
            value += ' ';
            value += argv.shift();
          }
          value = value.substring(1, value.length-1);
        }
        x[key] = value;
      }
    }
  }

  return [argv, x, flags];
}

module.exports = processArgs;
