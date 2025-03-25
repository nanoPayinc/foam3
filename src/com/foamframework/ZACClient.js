foam.CLASS({
  package: 'com.foamframework',
  name: 'ZACClient',
  extends: 'foam.u2.Element',
  mixins: [
    'foam.u2.memento.Memorable'
  ],
  imports: [
    'ctrl',
    'documentDAO'
  ],
  properties: [
    {
      name: 'route',
      value: 'intro',
      memorable: true,
    },
    'doc',
    {
      class: 'Boolean',
      name: 'collapsed',
      value: false
    },
    {
      class: 'String',
      name: 'title',
      value: 'FOAM Documentation'
    }
  ],
  css: `
    /* Basic reset for elements within this component */
    ^ * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Base styling for the component */
    ^ {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }

    /* CSS Variables for easy customization */
    :root {
      --sidebar-width: 240px;
      --sidebar-collapsed-width: 60px;
      --transition-duration: 0.3s;
      --primary-color: #2c3e50;  /* Sidebar background */
      --secondary-color: #ecf0f1; /* Light background for header */
      --accent-color: #3498db;
    }

    /* ----------------------------
       Top Navigation (Header)
       ---------------------------- */
    /* Header container */
    ^header {
      height: 60px;
      background-color: var(--secondary-color);
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }

    /* Left part of header: menu (toggle + title) */
    ^menu {
      display: flex;
      align-items: center;
    }

    /* Hamburger toggle button */
    ^toggle-button {
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 1rem;
      user-select: none;
    }

    /* Title styling */
    ^title {
      font-size: 1.25rem;
      font-weight: bold;
    }

    /* Right part of header: actions */
    ^actions {
      display: flex;
      align-items: center;
    }

    /* Action buttons */
    ^action-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      margin-left: 0.5rem;
      cursor: pointer;
    }

    /* ----------------------------
       Main Container
       ---------------------------- */
    /* Container for sidebar and content */
    ^container {
      display: flex;
    }

    /* ----------------------------
       Sidebar Styling
       ---------------------------- */
    ^sidebar {
      width: var(--sidebar-width);
      background-color: var(--primary-color);
      color: var(--secondary-color);
      transition: width var(--transition-duration);
    }

    ^sidebar ul {
      list-style: none;
      padding: 1rem 0;
    }

    ^sidebar li {
      transition: background var(--transition-duration);
    }

    ^sidebar li:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    ^sidebar a {
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: inherit;
      display: block;
      white-space: nowrap;
    }

    /* When collapsed, reduce sidebar width */
    ^collapsed {
      width: var(--sidebar-collapsed-width) !important;
    }

    /* Adjust list items when collapsed */
    ^collapsed li {
      text-align: center;
    }

    /* Hide link text when collapsed; show icon from data-icon attribute */
    ^collapsed li a {
      font-size: 0;
    }

    ^collapsed li a::before {
      content: attr(data-icon);
      font-size: 1.25rem;
      display: block;
      text-align: center;
    }

    /* ----------------------------
       Content Area Styling
       ---------------------------- */
    ^content {
      flex: 1;
      padding: 1rem;
      background-color: #fff;
    }
    
    ^document {
      max-width: 760px;
    }
    ^document td , ^document th {
      text-align: left;
      padding: 8pt;
    }
    ^document th {
      font-weight: bold;
      background-color: $grey400;
    }
  `,
  methods: [
    function init() {
      this.SUPER();
      if ( foam?.core?.zac?.Client?.isInstance?.(this.ctrl) ) {
        this.ctrl.add(this);
      }
    },
    function render() {
      this.SUPER();
      var self = this;

      // header
      this.start('header').addClass(this.myClass('header'))
        .start('div').addClass(this.myClass('menu'))
        .start('span').addClass(this.myClass('toggle-button'))
        .add('☰')
        .on('click', () => { this.collapsed = !this.collapsed; })
        .end()
        .start('span').addClass(this.myClass('title'))
        .add(this.title)
        .end()
        .end() // end menu div
        .end(); // end header

      // Sidebar
      this.start('div').addClass(this.myClass('container'))
        // Sidebar Navigation
        .start('nav').addClass(this.myClass('sidebar'))
        .enableClass(this.myClass('collapsed'), this.collapsed$)
        .start('ul')
        .select(this.documentDAO, function(obj) {
          this.start('li')
            .start('a')
            .attrs({
              href: `#${obj.id}`,
              'data-icon': (obj.title || foam.String.labelize(obj.id))[0]
            })
            .add(obj.title || foam.String.labelize(obj.id))
            .end('a')
            .end('li');
        })
        .end() // end ul
        .end() // end nav
        // Main Content Area
        .start('main').addClass(this.myClass('content'))
        .add(this.dynamic(function(doc) {
          this
            .start()
            .addClass(self.myClass('document'))
            .add(doc?.toE?.(null, this.__subSubContext__))
            .end()
        }))
        .end()
        .end();

      this.onDetach(this.route$.sub(this.updateDoc));
      this.updateDoc();
    }
  ],
  listeners: [
    async function updateDoc() {
      if ( ! this.route ) {
        return
      }
      let doc = await this.documentDAO.find(this.route);
      this.doc = doc;
    }
  ]
});