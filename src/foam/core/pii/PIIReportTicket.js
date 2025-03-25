/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pii',
  name: 'PIIReportTicket',
  extends: 'foam.core.ticket.Ticket',

  documentation: 'Generate a PII Report for a user',

  javaImports: [
    'foam.core.fs.File'
  ],

  properties: [
    {
      name: 'title',
      value: 'PII Report Request'
    },
    {
      name: 'status',
      order: 5,
      createVisibility: 'HIDDEN'
    },
    {
      name: 'statusChoices',
      hidden: true,
      factory: function() {
        var s = [];
        if ( 'CLOSED' == this.status ) {
          s.push(['CLOSED', 'CLOSED']);
          s.push(['OPEN', 'OPEN']);
        } else {
          s.push(this.status);
          s.push(['CLOSED', 'CLOSED']);
        }
        return s;
      }
    },
    {
      name: 'comment',
      order: 6
    },
    {
      name: 'createdFor',
      gridColumns: '12'
    },
    {
      name: 'state',
      hidden: true,
      transient: true
    },
    {
      name: 'assignedToGroup',
      hidden: true
    },
    {
      name: 'externalComment',
      hidden: true
    },
    {
      class: 'foam.core.fs.FileArray',
      name: 'documents',
      createVisibility: 'HIDDEN',
      readVisibility: 'RO',
      updateVisibility: 'RO',
      section: 'infoSection',
      order: 15,
      gridColumns: 12,
      tableCellFormatter: function(documents) {
        if ( ! (Array.isArray(documents) && documents.length > 0) ) return;
        var actions = documents.map((file) => {
          return foam.lang.Action.create({
            label: file.filename,
            code: function(x) {
              x.window.open(file.address, '_blank');
            }
          });
        });
        this.tag({
          class: 'foam.u2.view.OverlayActionListView',
          data: actions,
          icon: '/images/attachment.svg',
          showDropdownIcon: false
        });
      },
      view: function(_, x) {
        return {
            class: 'foam.core.fs.fileDropZone.FileDropZone',
            files$: x.data.documents$
        };
      }
    }
  ],
  methods: [
    {
      name: 'addDocument',
      args: 'File file',
      javaCode: `
      File[] files = getDocuments();
      if ( files == null ||
           files.length == 0 ) {
        setDocuments(new File[] { file });
      } else {
        File[] nu = new File[files.length +1];
        System.arraycopy(files, 0, nu, 0, files.length);
        nu[nu.length] = file;
        setDocuments(nu);
      }
      `
    }
  ]
});
