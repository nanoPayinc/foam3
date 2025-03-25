/**
* @license
* Copyright 2022 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.theme.customisation',
  name: 'ThemeFacade',

  sections: [
    {
      name: 'topNavBarLogo'
    },
    {
      name: 'loginPageImage'
    },
    {
      name: 'externalImage'
    }
  ],

  properties: [
    {
      __copyFrom__: 'foam.core.theme.Theme.NAME',
      visibility: 'HIDDEN'
    },
    {
      __copyFrom__: 'foam.core.theme.Theme.TOP_NAV_LOGO',
      view: { class: 'foam.core.theme.customisation.ThemeImageUploadView' },
      section: 'topNavBarLogo'
    },
    {
      __copyFrom__: 'foam.core.theme.Theme.LOGIN_IMAGE',
      view: { class: 'foam.core.theme.customisation.ThemeImageUploadView' },
      section: 'loginPageImage'
    },
    {
      __copyFrom__: 'foam.core.theme.Theme.EXTERNAL_COMMUNICATION_IMAGE',
      view: {
        class: 'foam.core.theme.customisation.ThemeImageUploadView',
        supportedFormats: { 'image/png': 'PNG' }
      },
      section: 'externalImage'
    }
  ]
});
