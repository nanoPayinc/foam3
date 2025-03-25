/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.http;

import com.sun.net.httpserver.*;
import foam.box.*;
import foam.lang.*;
import foam.dao.*;
import foam.core.boot.CSpec;
import foam.core.logger.Logger;
import foam.core.pm.PM;
import java.io.IOException;
import java.net.URI;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import jakarta.servlet.http.HttpServlet;

public class NanoHttpHandler
  extends    ContextAwareSupport
  implements HttpHandler
{

  public NanoHttpHandler(X x) {
    setX(x);
  }

  @Override
  public void handle(HttpExchange exchange) throws IOException {
    ServletHandler sh = new ServletHandler((HttpServlet) getX().get("httprouter"));
    sh.handle(exchange);
  }
}
