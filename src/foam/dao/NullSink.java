/**
 * @license Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.dao;

public class NullSink
  extends AbstractSink
{
  protected final static NullSink instance_ = new NullSink();

  public static NullSink instance() { return instance_; }

  protected NullSink() {}

/*
  public void put(Object obj, foam.core.Detachable sub) {
    System.err.println("**************** UNEXPECTED PUT to NullSink " + obj);
  }
  */

  @Override
  public String toString() { return "NullSink()"; }
}
