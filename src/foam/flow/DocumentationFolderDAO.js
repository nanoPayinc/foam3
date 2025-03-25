/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.flow',
  name: 'DocumentationFolderDAO',
  extends: 'foam.dao.AbstractDAO',

  documentation: 'Loads/stores documentation models from a directory of HTML markup.  Useful for saving and editing documentation in a version control repository.',

  requires: [
    'foam.flow.Document'
  ],

  javaImports: [
    'foam.flow.Document',
    'foam.core.fs.Storage',
    'java.nio.charset.StandardCharsets',
    'java.util.HashSet',
    'java.util.Set',
    'java.io.OutputStream'
  ],

  properties: [
    {
      name: 'of',
      javaFactory: 'return foam.flow.Document.getOwnClassInfo();'
    },
    {
      name: 'delegate',
      javaFactory: 'return new foam.dao.MDAO.Builder(getX()).build();'
    },
    {
      class: 'Object',
      name: 'storage',
      javaType: 'foam.core.fs.Storage',
      javaFactory: `
return new foam.core.fs.FallbackStorage(
  new foam.core.fs.FileSystemStorage(System.getProperty("DOCUMENT_HOME")) {
    @Override
    public OutputStream getOutputStream(String name) {
      var path = getPath(name);
      if ( path == null ) return null;

      try {
        return java.nio.file.Files.newOutputStream(path);
      } catch (java.io.IOException e) {
        return null;
      }
    }
  },
  new foam.core.fs.ResourceStorage("documents")
);`
    }
  ],
  methods: [
    {
      name: 'select_',
      javaCode: `
Storage storage = getStorage();

sink = prepareSink(sink);

foam.dao.Sink         decorated = decorateSink_(sink, skip, limit, foam.flow.Document.ID, predicate);
foam.dao.Subscription sub       = new foam.dao.Subscription();

Set<String> paths = null;
try {
  paths = storage.getAvailableFiles("", "*.flow");
} catch (Throwable t) {
  foam.core.logger.Logger logger = (foam.core.logger.Logger) x.get("logger");
  logger.warning(t.getMessage());
  paths = new HashSet<String>();
}

for ( String path : paths ) {
  if ( sub.getDetached() ) break;
  String id = path.substring(0, path.lastIndexOf(".flow"));
  var obj = loadDocument(id);
  decorated.put(obj, sub);
}

decorated.eof();

return sink;`
    },
    {
      name: 'loadDocument',
      type: 'foam.flow.Document',
      args: [
        {
          name: 'id',
          type: 'Object'
        }
      ],
      javaCode: `
        var obj       = new foam.flow.Document();
        var sanitized = verifyId(id);
        var storage   = getStorage();
        var path      = id + ".flow";

        obj.setId(sanitized);
        var content = new String(storage.getBytes(path), StandardCharsets.UTF_8);
        if (content.startsWith("<title>") && content.indexOf("</title>") != -1) {
          obj.setTitle(content.substring(7, content.indexOf("</title>")));
        }

        obj.setMarkup(content);

        return obj;
      `
    },
    {
      name: 'verifyId',
      args: 'Object obj',
      type: 'String',
      javaCode: `
// Very conservative allowable characters to avoid any possible filename shennanigans.

String id = obj instanceof Document ? (String) getPK((Document) obj) : (String) obj;
if ( ! id.matches("^[a-zA-Z0-9_-]+$") ) {
  throw new RuntimeException("Invalid primary key, must use only alphanumeric characters, _ and -.");
}
return id;
`
    },
    {
      name: 'put_',
      javaCode: `
Storage storage = getStorage();

String id = verifyId(obj);

OutputStream oStream = storage.getOutputStream(id + ".flow");

if ( oStream == null ) {
  return obj;
}

try {
  oStream.write(((foam.flow.Document)obj).getMarkup().getBytes(StandardCharsets.UTF_8));
} catch ( java.io.IOException e ) {
  throw new RuntimeException(e);
}

return obj;`
    },
    {
      name: 'remove_',
      javaCode: `throw new UnsupportedOperationException("Can't remove on DocumentationFolderDAO");`
    },
    {
      name: 'find_',
      javaCode: `return loadDocument(id);`
    }
  ]
});
