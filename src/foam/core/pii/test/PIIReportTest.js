/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pii.test',
  name: 'PIIReportTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.dao.ArraySink',
    'static foam.mlang.MLang.EQ',
    'foam.core.auth.User',
    'foam.core.fs.File',
    'foam.core.pii.*',
    'foam.core.notification.email.EmailMessage',
    'foam.util.SafetyUtil',
    'java.util.List'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
        // see deployment/test/users.jrl
        User user = (User) ((DAO) x.get("userDAO")).find(185426801L);
        PIIReportTicket ticket = new PIIReportTicket();
        ticket.setCreatedFor(user.getId());
        ticket = (PIIReportTicket) ((DAO) x.get("ticketDAO")).put(ticket);

        test ( ticket != null, "Ticket created");

        test ( ticket.getDocuments() != null && ticket.getDocuments().length > 0, "Ticket has documents");

        if ( ticket.getDocuments() != null && ticket.getDocuments().length > 0 ) {
          File file = (File) ticket.getDocuments()[0];
          test ( file.getMimeType().equals("application/pdf"), "Document type PDF " + file.getMimeType());
          test ( file.getFilesize() > 0 || ! SafetyUtil.isEmpty(file.getDataString()), "Document size > 0 ");
        }

        // close and test for email
        ticket = (PIIReportTicket) ticket.fclone();
        ticket.setStatus("CLOSED");
        ticket = (PIIReportTicket) ((DAO) x.get("ticketDAO")).put(ticket);

        test ( ticket.getStatus().equals("CLOSED"), "Ticket closed");

        boolean found = false;
        DAO dao = (DAO) x.get("emailMessageDAO");
        dao = dao.where(EQ(EmailMessage.USER, user.getId()));
        List<EmailMessage> messages = (List) ((ArraySink) dao.select(new ArraySink())).getArray();
        for ( EmailMessage message : messages ) {
          if ( "Personal Identifiable Information Report".equals(message.getSubject()) ) {
            if ( message.getBody().contains("data attached") ) {
              found = true;
              break;
            }
          }
        }
        test ( found, "Email found");
      `
    }
  ]
});
