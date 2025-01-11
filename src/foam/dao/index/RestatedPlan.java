/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
package foam.dao.index;

import foam.core.FObject;
import foam.dao.Sink;
import foam.mlang.order.Comparator;
import foam.mlang.predicate.Not;
import foam.mlang.predicate.Predicate;

public class RestatedPlan
  implements SelectPlan
{
  protected final Object     state_;
  protected final SelectPlan delegate_;

  public RestatedPlan(Object state, SelectPlan bestPlan) {
    state_    = state;
    delegate_ = bestPlan;
  }

  public void select(Object unused, Sink sink, long skip, long limit, Comparator order, Predicate predicate) {
    delegate_.select(state_, sink, skip, limit, order, predicate);
  }

  public SelectPlan restate(Object state) {
    // Tricky: Don't do anything because a state has already been curried and
    // changing it will break the plan.
    return this;
  }

  @Override
  public long cost() {
    return delegate_.cost();
  }

  @Override
  public String toString() {
    return delegate_.toString();
  }
}
