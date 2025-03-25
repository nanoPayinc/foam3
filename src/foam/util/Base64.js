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
    }
  ]
});
  
