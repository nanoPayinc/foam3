/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lib.json;

import foam.lib.parse.*;

public class Whitespace
  implements Parser
{
  protected static final Parser instance__ = new Whitespace();

  public static Parser instance() {
    return instance__;
  }

  public static Parser wrap(Parser p) {
    return new Seq1(1, instance__, p, instance__);
  }

  private Whitespace() {
  }

  // From RFC4627
  // Insignificant whitespace is allowed before or after any of the six
  // structural characters.

  // ws = *(
  //         %x20 /              ; Space
  //         %x09 /              ; Horizontal tab
  //         %x0A /              ; Line feed or New line
  //         %x0D                ; Carriage return
  //        )

  public PStream parse(PStream ps, ParserContext x) {
    while ( ps.valid() ) {
      char c = ps.head();
      if ( c == ' '  || c == '\t' || c == '\r' || c == '\n' ) {
        ps = ps.tail();
      } else {
        return ps;
      }
    }

    return ps;
  }

  public String toString() {
    return "Whitespace";
  }
}
