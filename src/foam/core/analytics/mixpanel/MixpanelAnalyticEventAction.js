/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.analytics.mixpanel',
  name: 'MixpanelAnalyticEventAction',
  implements: [ 'foam.core.ruler.RuleAction' ],
  documentation: 'Rule to send analyticEvent data to Mixpanel',

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.core.analytics.AnalyticEvent',
    'foam.net.ipgeo.IPGeolocationService',
    'foam.net.ipgeo.IPGeolocationInfo',
    'java.util.Iterator',
    'org.json.JSONException',
    'org.json.JSONObject'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            AnalyticEvent event = (AnalyticEvent) obj;

            // build message
            JSONObject props = new JSONObject();
            props.put("$event_id", event.getId());
            props.put("time", event.getTimestamp());
            props.put("$os", event.getUserAgent());
            props.put("$ip", event.getIp());

            // add event extras
            JSONObject eventExtras;
            try {
              eventExtras = new JSONObject(event.getExtra());
              Iterator<String> keys = eventExtras.keys();
              while(keys.hasNext()) {
                String key = keys.next();
                props.put(key, eventExtras.get(key));
              }
            } catch ( JSONException e) {
              eventExtras = new JSONObject();
              props.put("$event_extra", event.getExtra());
            }

            IPGeolocationService service = (IPGeolocationService) x.get("ipGeolocationService");
            if ( service != null ) {
              IPGeolocationInfo info = service.resolveLocation(x);
              if ( info != null ) {
                props.put("mp_country_code", info.getCountry());
                props.put("$city", info.getCity());
              }
            }
            ((MixpanelService) x.get("mixpanelService")).sendMixpanelEvent(x, event, props);
          }
        }, "Send message to mixpanel");
      `
    }
  ]
});
