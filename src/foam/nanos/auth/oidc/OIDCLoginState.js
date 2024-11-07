foam.CLASS({
    package: 'foam.nanos.auth.oidc',
    name: 'OIDCLoginState',
    properties: [
        {
            class: 'String',
            name: 'sessionId'
        },
        {
            class: 'Reference',
            of: 'foam.nanos.auth.oidc.OIDCProvider',
            name: 'oidcProvider',
            targetDAOKey: 'oidcProviderDAO'
        },
        {
            class: 'Boolean',
            name: 'returnToApp',
            documentation: 'If true, OIDCWebAgent will redirect back to the main nanos app',
            value: false
        }
    ]
});
