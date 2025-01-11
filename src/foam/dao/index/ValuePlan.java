/**
 * @license Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
package foam.dao.index;

import foam.core.FObject;
import foam.dao.MDAO;
import foam.dao.Sink;
import foam.mlang.order.Comparator;
import foam.mlang.predicate.Predicate;

public class ValuePlan
  implements SelectPlan
{
  protected final static ValuePlan instance_ = new ValuePlan();

  public static ValuePlan instance() { return instance_; }

  protected ValuePlan() {}

  public long cost() { return 1; }

  public void select(Object state, Sink sink, long skip, long limit, Comparator order, Predicate predicate) {
    try {
      if ( predicate != null && ! predicate.f((FObject) state) ) return;
    } catch (ClassCastException e) {
      // Can happen when the Indexer is a PropertyInfo for a sub-class
      return;
    } catch (NullPointerException e) {
      // Can happen when the Indexer is Dot(x, y) when x is nullf
      return;
    }
    if ( skip > 0 ) return;
    if ( limit <= 0 ) return;
    sink.put(state, MDAO.DetachSelect.instance());
  }

  public SelectPlan restate(Object state) {
    return new RestatedPlan(state, this);
  }

  @Override
  public String toString() {
    return "value(cost:1)";
  }
}
