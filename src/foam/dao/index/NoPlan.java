/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
package foam.dao.index;

import foam.core.FObject;
import foam.dao.Sink;
import foam.mlang.order.Comparator;
import foam.mlang.predicate.Predicate;

/** Have-no-plan Plan. **/
public class NoPlan
  implements SelectPlan
{
  protected final static NoPlan instance_ = new NoPlan();

  public static NoPlan instance() { return instance_; }

  protected NoPlan() {}

  public long cost() { return Long.MAX_VALUE; }

  public void select(Object state, Sink sink, long skip, long limit, Comparator order, Predicate predicate) {
  }

  public SelectPlan restate(Object state) { return this; }

  @Override
  public String toString() {
    return "no-plan(cost:" + cost() + ")";
  }
}
