foam.INTERFACE({
  package: 'foam.core.export',
  name: 'GoogleSheetsServiceConfig',
  methods: [
    {
      name: 'getTitle',
      type: 'String'
    },
    {
      name: 'getTemplate',
      type: 'String',
    },
    {
      name: 'getServiceName',
      type: 'String',
    },
    {
      name: 'getExportClsInfo',
      type: 'Class',
      javaType: 'foam.lang.ClassInfo'
    }
  ]
});