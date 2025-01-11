foam.CLASS({
    package: 'foam.nanos.auth.oidc',
    name: 'OIDCLoginState',
    properties: [
        {
            class: 'String',
            name: 'sessionId'
        },
        {
            class: 'String',
            name: 'memento'
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
        },
        {
            class: 'Boolean',
            name: 'signUp',
            documentation: 'If true, OIDCWebAgent will attempt to sign up the user if they don\'t exist',
            value: false
        },
        {
            class: 'String',
            name: 'signUpUsername',
            documentation: 'username to use if signing up'
        },
        {
            class: 'String',
            name: 'returnToUrl',
            documentation: 'URL to redirect to after login'
        }
    ]
});
