/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lib.parse;

public class LiteralIC
  extends Literal
{
  public LiteralIC(String s) {
    this(s, s);
  }

  public LiteralIC(String s, Object v) {
    super(s.toUpperCase(), v);
  }

  public PStream parse(PStream ps, ParserContext x) {
    for ( int i = 0 ; i < string_.length() ; i++ ) {
      if ( ! ps.valid() ||
          Character.toUpperCase(ps.head()) != string_.charAt(i) ) {
        return null;
      }

      ps = ps.tail();
    }

    return ps.setValue(value_);
  }

  public String toString() {
    return "LiteralIC(" + string_ + ","+((value_!=null)?value_.toString():"null")+")";
  }
}
