foam.POM({
  name:'https',
  copy: [
    { source: 'foamdev-ca.crt' },
    { source: 'foamdev.jks' },
    { source: 'foamdev.pkcs12' }
  ]
})
