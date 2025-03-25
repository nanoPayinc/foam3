/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lib.json;

import foam.lang.ClassInfo;
import foam.lang.PropertyInfo;
import foam.lib.parse.*;
import foam.parse.NewlineParser;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Iterator;
import java.util.List;

public class ModelParserFactory {
  protected final static ConcurrentHashMap<Class, Parser> parsers_ = new ConcurrentHashMap<Class, Parser>();
  protected final static Parser COMMENTS = CommentParser.create();
  protected final static Parser OPTIONAL_COMMENTS = new Optional(COMMENTS);

  public static Parser getInstance(Class c) {
    // Sync is required to avoid building one parser per AssemblyLine thread.
    synchronized ( c ) {
      if ( parsers_.containsKey(c) ) return parsers_.get(c);
      ClassInfo info = null;

      try {
        info = (ClassInfo) c.getMethod("getOwnClassInfo").invoke(null);
      } catch(NoSuchMethodException|IllegalAccessException|InvocationTargetException e) {
        throw new RuntimeException("Failed to build parser ", e);
      }

      Parser parser = buildInstance_(info);
      parsers_.put(c, parser);
      return parser;
    }
  }

  public static Parser buildInstance_(ClassInfo info) {
    List     properties      = info.getAxiomsByClass(PropertyInfo.class);
    Parser[] propertyParsers = new Parser[properties.size() + 2]; // space for UnknownPropertyParser and Comment Parser
    Iterator iter            = properties.iterator();
    int      i               = 0;

    while ( iter.hasNext() ) {
      PropertyInfo pi = (PropertyInfo) iter.next();
      // If javaJSONParser: null, then don't add a PropertyParser for this field
      if ( pi.jsonParser() != null ) {
        propertyParsers[i] = PropertyParser.create(pi);
        i++;
      }
    }

    // Prevents failure to parse if unknown property found
    propertyParsers[i] = new UnknownPropertyParser();

    propertyParsers[i+1] = COMMENTS;

    return new Repeat0(
      new Seq0(OPTIONAL_COMMENTS,
        Whitespace.instance(), new Alt(propertyParsers)),
      Literal.create(",")
    );
  }
}
