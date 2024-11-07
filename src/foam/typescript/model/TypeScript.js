foam.CLASS({
    package: 'foam.typescript.model',
    name: 'TypeScriptClass',

    properties: [
        {
            class: 'String',
            name: 'name'
        },
        {
            class: 'e',
            of: 'foam.typescript.model.TypeScriptProperty',
            name: 'properties'
        },
        {
            class: 'FObjectArray',
            of: 'foam.typescript.model.TypeScriptMethod',
            name: 'methods'
        }
    ]
});

foam.CLASS({
    package: 'foam.typescript.model',
    name: 'TypeScriptProperty',

    properties: [
        {
            class: 'String',
            name: 'name'
        },
        {
            class: 'String',
            name: 'type'
        }
    ]
});

foam.CLASS({
    package: 'foam.typescript.model',
    name: 'TypeScriptMethod',

    properties: [
        {
            class: 'String',
            name: 'name'
        },
        {
            class: 'FObjectArray',
            of: 'foam.typescript.model.TypeScriptParameter',
            name: 'parameters'
        },
        {
            class: 'String',
            name: 'returnType'
        }
    ]
});

foam.CLASS({
    package: 'foam.typescript.model',
    name: 'TypeScriptParameter',

    properties: [
        {
            class: 'String',
            name: 'name'
        },
        {
            class: 'String',
            name: 'type'
        }
    ]
});