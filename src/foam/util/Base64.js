foam.LIB({
  name: 'foam.util',
  constants: [
    {
      name: 'BASE_64_ALPHABET',
      value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    },
    {
      name: 'URLSAFE_BASE_64_ALPHABET',
      value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    },
    {
      name: 'BASE_64_LOOKUP',
      factory: function() {
	var map = {};
	Array.from(this.BASE_64_ALPHABET).map((c, i) => {
	  map[c] = i;
	});
	Array.from(this.URLSAFE_BASE_64_ALPHABET).map((c, i) => {
	  map[c] = i;
	});
	return map;
      }
    }
  ],
  methods: [
    function fromBase64(str) {
      // decode base64 string into a uint8array without using atob, a fully manual base64 decoder that supports url-safe and url-unsafe encoding and ignores padding

      let result = [];
      let bits = 0;
      let value = 0;
      let index;

      for (let i = 0; i < str.length; i++) {
	// Find index in either base64 or URL-safe base64 alphabet
	var b = this.BASE_64_LOOKUP[str[i]]
	if (foam.Undefined.isInstance(b)) {
	  continue;
	}
	
	value = (value << 6) | b;
	bits += 6;

	if (bits >= 8) {
	  bits -= 8;
	  result.push((value >>> bits) & 0xff);
	}
      }

      return new Uint8Array(result);
    },
    function toUrlSafeBase64(bytes) {
      // encode uint8array into a urlsafe base64 string without using btoa, fully manual, omits padding
      if ( bytes instanceof ArrayBuffer ) {
        bytes = new Uint8Array(bytes);
      }

      var result = "";
      var alph = this.URLSAFE_BASE_64_ALPHABET;

      for (let i = 0; i < bytes.length; i += 3) {
        var b1 = bytes[i];
        var b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;
        var b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;

        var enc1 = b1 >> 2;
        var enc2 = ((b1 & 3) << 4) | (b2 >> 4);
        var enc3 = ((b2 & 15) << 2) | (b3 >> 6);
        var enc4 = b3 & 63;

        result += alph[enc1] + alph[enc2];
        if (i + 1 >= bytes.length) break;
        result += alph[enc3];
        if (i + 2 >= bytes.length) break;
        result += alph[enc4];
      }

      return result;
    }
  ]
});
