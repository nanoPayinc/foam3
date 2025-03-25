package foam.core.cron;

import foam.lang.ContextAgent;
import foam.lang.Detachable;
import foam.lang.X;
import foam.dao.AbstractSink;
import foam.dao.DAO;
import foam.mlang.MLang;
import foam.core.notification.Notification;
import java.util.Date;

public class RemoveExpiredNotificationCronjob implements ContextAgent {
  @Override
  public void execute(X x){
    DAO notificationDAO = (DAO) x.get("notificationDAO");
    notificationDAO.where(
    MLang.AND(
      MLang.LTE(Notification.EXPIRY_DATE, new Date()),
      MLang.NEQ(Notification.EXPIRY_DATE, null)
      )).removeAll();
  }
}
