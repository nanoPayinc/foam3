/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.export;

import foam.dao.DAO;
import foam.dao.MapDAO;
import foam.dao.ProxyDAO;
import foam.dao.java.JDAO;
import foam.core.COREService;

public class ExportService
  extends    ProxyDAO
  implements COREService
{
  public void start() {
    try {
      DAO dao = new JDAO(getX(), new MapDAO(), "ExportDriverRegistry");
      ((JDAO) dao).setOf(ExportDriverRegistry.getOwnClassInfo());
      setDelegate(dao);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
