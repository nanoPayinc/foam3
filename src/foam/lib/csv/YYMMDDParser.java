/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lib.csv;

import foam.lib.parse.*;
import foam.util.SafetyUtil;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import foam.lib.json.*;

public class YYMMDDParser
  extends ProxyParser
{
  private final static Parser instance__ = new YYMMDDParser();

  public static Parser instance() { return instance__; }

  protected static ThreadLocal<StringBuilder> sb = new ThreadLocal<StringBuilder>() {
    @Override
    protected StringBuilder initialValue() {
      return new StringBuilder();
    }

    @Override
    public StringBuilder get() {
      StringBuilder b = super.get();
      b.setLength(0);
      return b;
    }
  };

  public YYMMDDParser() {
    super(new Alt(
      NullParser.instance(),
      new Seq(
        IntParser.instance(),
        Literal.create("-"),
        IntParser.instance(),
        Literal.create("-"),
        IntParser.instance()),
      new LongParser()
    ));
  }

  public PStream parse(PStream ps, ParserContext x) {
    ps = super.parse(ps, x);

    if ( ps == null ) return null;

    if ( ps.value() == null ) return ps.setValue(null);

    // Checks if Long Date (Timestamp from epoch)
    if ( ps.value() instanceof Long ) {
      return ps.setValue(new Date((Long) ps.value()));
    }

    Object[] result = (Object[]) ps.value();

    Calendar c = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
    c.clear();

    c.set(
      (Integer) result[0],
      (Integer) result[2] - 1, // Java calendar uses zero-indexed months
      (Integer) result[4]
    );

    return ps.setValue(c.getTime());
  }
}
