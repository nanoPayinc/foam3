package foam.lib.query;

import foam.lib.parse.Alt;
import foam.lib.parse.PStream;
import foam.lib.parse.Parser;
import foam.lib.parse.ParserContext;

public class QueryParser
  extends foam.lib.parse.ProxyParser
{
  protected foam.lang.ClassInfo info_;

  public QueryParser(foam.lang.ClassInfo classInfo) {
    info_ = classInfo;

    java.util.List properties = classInfo.getAxiomsByClass(foam.lang.PropertyInfo.class);

    Parser[] expressions = new Parser[properties.size()];

    int i = 0;
    for ( Object prop : properties ) {
      foam.lang.PropertyInfo info = (foam.lang.PropertyInfo) prop;

      expressions[i++] = PropertyExpressionParser.create(info);
    }

    setDelegate(new OrParser(new AndParser(new Alt(expressions))));
  }

  @Override
  public PStream parse(PStream ps, ParserContext x) {
    x = x.sub();
    x.set("classInfo", info_);

    return super.parse(ps, x);
  }
}
