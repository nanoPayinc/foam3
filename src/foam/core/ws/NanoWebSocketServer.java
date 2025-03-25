package foam.core.ws;

import java.io.IOException;
import java.net.InetSocketAddress;

import foam.core.*;
import foam.lang.*;

public class NanoWebSocketServer
  extends ContextAwareSupport
  implements COREService
{
  protected WebSocketServer server_;
  public void start() {
    int port = foam.net.Port.get(getX(), "WebSocketServer");
    ((foam.core.logger.Logger) getX().get("logger")).info(this.getClass().getSimpleName(),"Starting,port",port);

    server_ = new WebSocketServer(new InetSocketAddress(port));
    server_.setX(getX());
    server_.start();
  }
}
