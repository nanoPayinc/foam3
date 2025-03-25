/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.dig.drivers',
  name: 'DigHtmlDriver',
  extends: 'foam.core.dig.drivers.DigFormatDriver',
  flags: ['java'],

  javaImports: [
    'foam.lang.*',
    'foam.dao.DAO',
    'foam.lib.csv.CSVOutputter',
    'foam.lib.json.OutputterMode',
    'foam.core.boot.CSpec',
    'foam.core.dig.*',
    'foam.core.dig.exception.*',
    'foam.core.http.*',
    'foam.core.logger.Logger',
    'foam.core.logger.PrefixLogger',
    'foam.util.SafetyUtil',
    'java.io.PrintWriter',
    'java.util.List',
    'jakarta.servlet.http.HttpServletResponse'
  ],

  properties: [
    {
      name: 'format',
      value: 'HTML'
    }
  ],

  methods: [
    {
      name: 'parseFObjects',
      javaCode: `
      DigUtil.outputException(x, new UnsupportException("HTML put operation is not supported"), getFormat());
      return null;
      `
    },
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

      foam.lib.html.Outputter outputterHtml = new foam.lib.html.Outputter(cInfo, OutputterMode.NETWORK);
      outputterHtml.outputStartHtml();
      outputterHtml.outputStartTable();

      for ( int i = 0; i < fobjects.size(); i++ ) {
        if ( i == 0 ) {
          outputterHtml.outputHead( (FObject) fobjects.get(i) );
        }
        outputterHtml.put(fobjects.get(i), null);
      }
      outputterHtml.outputEndTable();
      outputterHtml.outputEndHtml();

      // Output the formatted data
      out.println(outputterHtml.toString());
      `
    }
  ]
});
