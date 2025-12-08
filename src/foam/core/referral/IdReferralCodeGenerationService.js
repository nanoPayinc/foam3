/**
 * NANOPAY CONFIDENTIAL
 *
 * [2025] nanopay Corporation
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of nanopay Corporation.
 * The intellectual and technical concepts contained
 * herein are proprietary to nanopay Corporation
 * and may be covered by Canadian and Foreign Patents, patents
 * in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from nanopay Corporation.
 */

foam.CLASS({
  package: 'foam.core.referral',
  name: 'IdReferralCodeGenerationService',

  implements: [
    'foam.core.referral.ReferralCodeGeneratorService'
  ],

  javaImports: [
    'foam.lang.X',
    'foam.lang.XLocator',
    'foam.core.auth.User',
    'foam.dao.DAO',
    'foam.mlang.sink.Count',
    'static foam.mlang.MLang.*'
  ],

  methods: [
    {
      name: 'getCode',
      synchronized: true,
      javaCode: `
        X x = XLocator.get();
        DAO referralCodeDAO = (DAO) x.get("referralCodeDAO");
        ReferralCode code = (ReferralCode) referralCodeDAO.find(
          AND(
            EQ(ReferralCode.REFERRER, userId),
            EQ(ReferralCode.AUTO_GENERATED, true)
          )
        );
        return code.getId();
      `
    }
  ]
});
