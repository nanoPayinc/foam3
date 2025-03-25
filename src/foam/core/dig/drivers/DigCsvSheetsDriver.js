/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.dig.drivers',
  name: 'DigCsvSheetsDriver',
  extends: 'foam.core.dig.drivers.DigCsvDriver',
  flags: ['java'],

  javaImports: [
    'foam.lang.*',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.lib.csv.CSVOutputter',
    'foam.lib.csv.CSVSupport',
    'foam.lib.json.OutputterMode',
    'foam.core.boot.CSpec',
    'foam.core.dig.*',
    'foam.core.dig.exception.*',
    'foam.core.http.*',
    'foam.core.logger.Logger',
    'foam.core.logger.PrefixLogger',
    'foam.util.SafetyUtil',
    'java.io.ByteArrayInputStream',
    'java.io.InputStream',
    'java.io.PrintWriter',
    'java.util.ArrayList',
    'java.util.Arrays',
    'java.util.List',
    'jakarta.servlet.http.HttpServletResponse'
  ],

  properties: [
    {
      name: 'format',
      value: 'CSV/Sheets'
    }
  ],

  methods: [
    {
      name: 'outputFObjects',
      javaCode: `
      HttpServletResponse resp = x.get(HttpServletResponse.class);
      PrintWriter out = x.get(PrintWriter.class);
      ClassInfo cInfo = dao.getOf();
      String output = null;

      if ( fobjects == null || fobjects.size() == 0 ) {
        out.println("[]");
        return;
      }

      CSVOutputter outputterCsv = new foam.lib.csv.CSVOutputterImpl.Builder(x)
        .setSheetsCompatible(true)
        .setOf(cInfo)
        .build();

      for ( Object o : fobjects ) {
        FObject fobj = (FObject) o;
        outputterCsv.outputFObject(x, fobj);
      }

      // Output the formatted data
      out.println(outputterCsv.toString());
      `
    }
  ]
});
