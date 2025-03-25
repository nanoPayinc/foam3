/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.notification;
import foam.lang.ContextAwareSupport;
import foam.lang.X;
import foam.dao.DAO;
import foam.core.auth.User;
import foam.core.notification.ResendNotificationServiceInterface;
import foam.core.notification.Notification;

public class ResendNotificationService extends ContextAwareSupport implements ResendNotificationServiceInterface {

  @Override
  public void resend(X x, long userId, Notification notification) {
    if ( userId > 0L ) {
      DAO userDAO = (DAO) x.get("userDAO");
      User user = (User) userDAO.find(userId);
      if ( user != null ) {
        user.doNotify(x, notification);
        return;
      }
    }
    ((foam.core.logger.Logger) x.get("logger")).warning(this.getClass().getSimpleName(), "User not found", userId);
    throw new foam.core.auth.UserNotFoundException();
  }
}
