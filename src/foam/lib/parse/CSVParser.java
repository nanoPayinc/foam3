/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lib.parse;

public class CSVParser
  extends    foam.lib.parse.ProxyParser
  implements foam.lang.Detachable
{

  boolean detached_ = false;
  public void detach() {
    detached_ = true;
  }

  public CSVParser(foam.lang.ClassInfo info, foam.dao.Sink sink) {
    Parser escapedQuote = Literal.create("\"\"");
    Parser quotedText = new Seq1(1,
      Literal.create("\""),
      new Repeat(
        new Alt(new Parser[] {
          escapedQuote,
          new NotChar('"')
        })
      ),
      Literal.create("\"")
    );
    Parser unquotedText = new Repeat(new NotChars(",\n\r"));
    Parser field = new Join(
      new Alt(
        quotedText,
        unquotedText
      )
    );
    Parser csvRow = new Seq1(0,
      new Repeat(field, new Chars(",")),
      new Repeat(new Chars("\n\r"))
    );

    foam.lang.Detachable detach = this;

    setDelegate(new Parser() {
      public PStream parse(PStream ps, ParserContext px) {

        java.util.Map<String, foam.lib.csv.FromCSVSetter> propMap =
          new java.util.HashMap<>();
        info.getAxiomsByClass(foam.lang.PropertyInfo.class)
          .forEach(p -> ((foam.lang.PropertyInfo) p)
              .fromCSVLabelMapping(propMap));

        ps = csvRow.parse(ps, px);
        if ( ps == null ) return null;

        Object[] headers = (Object[]) ps.value();

        while ( ! detached_ && ps.valid() ) {
          ps = csvRow.parse(ps, px);
          if ( ps == null ) break;
          Object[] values = (Object[]) ps.value();
          try {
            foam.lang.FObject obj = (foam.lang.FObject) info.newInstance();
            for ( int i = 0 ; i < Math.min(values.length, headers.length) ; i++ ) {
              propMap.get((String)headers[i]).set(obj, (String) values[i]);
            }
            sink.put(obj, detach);
          } catch ( Exception e ) {
            // we need to allow the parser to continue to run and skip over the unparsable value
            System.out.println(e);
          }
        }

        return ps;
      }
    });
  }
}
