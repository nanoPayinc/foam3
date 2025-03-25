/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pii',
  name: 'PIIReportTicketRuleAction',

  documentation: 'Generate PII Report',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.Detachable',
    'foam.lang.FObject',
    'foam.lang.PropertyInfo',
    'foam.lang.X',
    'foam.dao.AbstractSink',
    'foam.dao.DAO',
    'foam.dao.Sink',
    'foam.lib.html.Outputter',
    'foam.lib.json.OutputterMode',
    'foam.log.LogLevel',
    'static foam.mlang.MLang.*',
    'foam.core.app.AppConfig',
    'foam.core.auth.EnabledAware',
    'foam.core.auth.LifecycleAware',
    'foam.core.auth.LifecycleState',
    'foam.core.auth.User',
    'foam.core.crunch.Capability',
    'foam.core.crunch.UserCapabilityJunction',
    'foam.core.er.EventRecord',
    'foam.core.fs.File',
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'foam.core.notification.email.EmailMessage',
    'foam.core.notification.email.EmailPropertyService',
    'foam.core.notification.email.Status',
    'foam.core.session.Session',
    'foam.core.ticket.Ticket',
    'foam.util.Auth',
    'foam.util.SafetyUtil',
    'foam.util.StringUtil',
    'java.io.ByteArrayOutputStream',
    'java.lang.reflect.Method',
    'java.util.ArrayList',
    'java.util.HashMap',
    'java.util.List',
    'java.util.Map',
    'java.util.Set',
    'java.util.TreeSet',
    'com.openhtmltopdf.pdfboxout.PdfRendererBuilder',
    'org.jsoup.Jsoup',
    'org.jsoup.nodes.Document',
  ],

  properties: [
    {
      class: 'String',
      name: 'emailTemplateKVData',
      value: 'foam-core-pii-report-kv-EmailTemplate',
    }
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            PIIReportTicket ticket = (PIIReportTicket) obj;
            User user = (User) ticket.findCreatedFor(x);
            TreeSet<KeyValue> kvs = new TreeSet<KeyValue>((KeyValue kv1, KeyValue kv2) -> kv1.getKey().compareTo(kv2.getKey()));
            addData(x, ticket, user, kvs);
            buildKeyValuePDF(x, ruler.getX(), ticket, kvs);
          }
        }, "PIIReportTicketRuleAction");
      `
    },
    {
      documentation: 'Hook for application pii',
      name: 'addData',
      args: 'X x, PIIReportTicket ticket, User user, Set kvs',
      javaCode: `
        addUserData(x, ticket, user, kvs);
        addUCJData(x, ticket, user, kvs);
      `
    },
    {
      name: 'addUserData',
      args: 'X x, PIIReportTicket ticket, User user, Set kvs',
      javaCode: `
      addFObject(x, null, user, kvs);
      `
    },
    {
      name: 'addUCJData',
      args: 'X x, PIIReportTicket ticket, User user, Set kvs',
      javaCode: `
      ((DAO) x.get("bareUserCapabilityJunctionDAO"))
        .where(EQ(UserCapabilityJunction.SOURCE_ID, user.getId()))
        .select(new AbstractSink() {
          @Override
          public void put(Object obj, Detachable sub) {
            UserCapabilityJunction ucj = (UserCapabilityJunction) obj;
            if ( ucj.getData() == null ) return;
            Capability cap = ucj.findTargetId(x);
            Object data = ucj.getData();
            if ( data instanceof FObject ) {
              addFObject(x, "(UCJ FObject) "+cap.getName(), (FObject) data, kvs);
            } else if ( data instanceof File ) {
              ticket.addDocument((File) data);
            } else {
              String str = String.valueOf(data);
              if ( ! SafetyUtil.isEmpty(str) ) {
                kvs.add(new KeyValue("(UCJ String) "+cap.getName(), str));
              }
            }
          }
        });
      `
    },
    {
      name: 'addFObject',
      args: 'X x, String prefix, FObject fObj, Set kvs',
      javaCode: `
      if ( fObj instanceof LifecycleAware &&
           ((LifecycleAware) fObj).getLifecycleState() == LifecycleState.DELETED )
        return;

      if ( fObj instanceof EnabledAware &&
           ! ((EnabledAware) fObj).getEnabled() )
        return;

      String summary = getPIISummary(fObj);
      if ( ! SafetyUtil.isEmpty(summary) ) {
        kvs.add(new KeyValue(prefix, summary));
      } else {
        addAllProperties(x, prefix, fObj, kvs);
      }
      `
    },
    {
      name: 'getPIISummary',
      args: 'FObject fObj',
      type: 'String',
      javaCode: `
      if ( fObj instanceof PIIAware ) {
        String summary = ((PIIAware)fObj).piiSummary();
        if ( ! SafetyUtil.isEmpty(summary) )
          return summary;
      }
      return null;
      `
    },
    {
      name: 'addAllProperties',
      args: 'X x, String prefix, FObject fObj, Set kvs',
      javaCode: `
      List<PropertyInfo> props = fObj.getClassInfo().getAxiomsByClass(PropertyInfo.class);
      for ( PropertyInfo p : props ) {
        addProperty(x, prefix, p, fObj, kvs);
      }
      `
    },
    {
      name: 'addProperty',
      args: 'X x, String prefix, PropertyInfo pInfo, FObject fObj, Set kvs',
      javaCode: `
        if ( pInfo.getNetworkTransient() ||
             pInfo.getExternalTransient() )
          return;

        if ( ! pInfo.containsPII() )
          return;

        Object val = pInfo.get(fObj);
        if ( val == null ) return;

        StringBuilder key = new StringBuilder();
        if ( ! SafetyUtil.isEmpty(prefix) ) {
          key.append(prefix);
          key.append(" - ");
        }
        key.append(StringUtil.labelize(pInfo.getName()));

        if ( val instanceof FObject ) {
          addFObject(x, key.toString(), (FObject) val, kvs);
        } else {
          var str = String.valueOf(val);
          if ( ! SafetyUtil.isEmpty(str) ) {
            kvs.add(new KeyValue(key.toString(), str));
          }
        }
      `
    },
    {
      name: 'buildKeyValuePDF',
      args: 'X x, X rulerX, PIIReportTicket ticket, Set kvs',
      javaCode: `
      try {
        Outputter outputter = new Outputter(KeyValue.getOwnClassInfo(), OutputterMode.FULL);
        // PDF generator does not support non-breaking space &nbsp;
        outputter.setNbspEnabled(false);
        outputter.outputStartHtml();
        outputter.outputStartTable();
        outputter.outputHead(new KeyValue());
        for ( KeyValue kv : (Set<KeyValue>) kvs ) {
          outputter.put(kv, null);
        }
        outputter.outputEndTable();
        outputter.outputEndHtml();

        Map<String, Object> args = new HashMap();
        User user = (User) ticket.findCreatedFor(x);
        EmailMessage msg = new EmailMessage();
        msg.setUser(user.getId());
        msg.setTo(new String[] { user.getEmail() });
        args.put("template", getEmailTemplateKVData());
        args.put("user", user);
        args.put("ticket", ticket);
        args.put("keyValueData", outputter.toString());
        msg.setTemplateArguments(args);
        msg = (EmailMessage) ((EmailPropertyService) rulerX.get("emailPropertyService")).apply(x, user.getGroup(), msg, args);

        X userX = Auth.sudo(x, user);
        String baseUrl = ((AppConfig) userX.get("appConfig")).getUrl();
        Document doc = Jsoup.parse(msg.getBody(), "US-ASCII");
        doc.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.withHtmlContent(doc.html(), baseUrl);
        builder.toStream(baos);
        builder.useFastMode();
        builder.run();

        String encodedString = java.util.Base64.getEncoder().encodeToString(baos.toByteArray());
        File file = new File();
        file.setOwner(user.getId());
        file.setMimeType("application/pdf");
        file.setDataString("data:"+file.getMimeType()+";base64," + encodedString);
        file.setFilename(msg.getSubject().replaceAll("\\\\s+","-")+".pdf");
        file.setFilename(file.getFilename().replaceAll(",",""));
        file.setFilename(file.getFilename().replaceAll("[-]+","-"));
        DAO fileDAO = (DAO) rulerX.get("fileDAO");
        file = (File) fileDAO.put(file);
        ticket.addDocument(file);
      } catch ( Throwable t ) {
        ((DAO) rulerX.get("eventRecordDAO")).put(new EventRecord(x, "PIIReportTicketRuleAction", "buildKeyValuePDF", t.getMessage(), LogLevel.ERROR, t));
      }
      `
    }
  ]
});
