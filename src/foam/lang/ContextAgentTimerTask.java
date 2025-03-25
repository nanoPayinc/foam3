/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lang;

import foam.lang.Agency;
import foam.lang.ContextAgent;
import foam.lang.X;
import java.util.TimerTask;

/**
  TimerTask which executes a ContextAgent
*/
public class ContextAgentTimerTask
  extends TimerTask {

  X x_;
  ContextAgent agent_;

  public ContextAgentTimerTask(X x, ContextAgent agent) {
    super();
    this.x_ = x;
    this.agent_ = agent;
  }

  public void run() {
    agent_.execute(x_);
  }
}
