/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.logger;

import foam.lang.X;
import foam.core.logger.Logger;
import foam.core.COREService;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.logging.*;

public class StdoutLogger
  extends DAOLogger
{
  protected java.util.logging.Logger logger_;
  private final static StdoutLogger instance__ = new StdoutLogger();
  public static StdoutLogger instance() { return instance__; }

  public StdoutLogger() {
    this(foam.lang.XLocator.get());
  }

  public StdoutLogger(X x) {
    setX(x);
    setDelegate(
      new foam.core.logger.RepeatLogMessageDAO.Builder(x)
      .setDelegate(new foam.core.logger.LogMessageDAO.Builder(x)
        .setDelegate(new foam.core.logger.StdoutLoggerDAO.Builder(x)
          .setDelegate(new foam.dao.NullDAO(x, foam.core.logger.LogMessage.getOwnClassInfo()))
          .build())
        .build())
      .build());

    // Add Java logging handler
    logger_ = java.util.logging.Logger.getAnonymousLogger();
    logger_.setUseParentHandlers(false);
    logger_.setLevel(Level.ALL);
    Handler handler = new JavaHandler();
    logger_.addHandler(handler);
  }
}
