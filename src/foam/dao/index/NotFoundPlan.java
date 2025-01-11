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

/** Found that no data exists for the query. **/
public class NotFoundPlan
  implements SelectPlan
{
  protected final static NotFoundPlan instance_ = new NotFoundPlan();

  public static NotFoundPlan instance() { return instance_; }

  protected NotFoundPlan() {}

  public long cost() { return 0; }

  public void select(Object state, Sink sink, long skip, long limit, Comparator order, Predicate predicate) {
  }

  public SelectPlan restate(Object state) { return this; }

  @Override
  public String toString() {
    return "not-found(cost:" + cost() + ")";
  }
}
