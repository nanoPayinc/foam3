package foam.nanos.auth.oidc;

import foam.core.X;
import foam.nanos.http.WebAgent;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import javax.net.ssl.HttpsURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.apache.commons.io.IOUtils;
import foam.nanos.logger.Logger;
import foam.nanos.auth.oidc.OIDCProvider;
import foam.nanos.auth.oidc.OIDCLoginState;

// Open ID Connect (OIDC) Web Agent
// The openid identity provider (ex Google/Apple) will redirect the user to this
// web agent after successfully authenticating the user.
public class OIDCWebAgent implements WebAgent {
    @Override
    public void execute(X x) {
        Logger logger = (Logger) x.get("logger");
        HttpServletRequest req = x.get(HttpServletRequest.class);
        HttpServletResponse resp = x.get(HttpServletResponse.class);

        try {
            OIDCLoginState state = (OIDCLoginState)(x.create(foam.lib.json.JSONParser.class).parseString(req.getParameter("state"), OIDCLoginState.class));
            OIDCProvider provider = state.findOidcProvider(x);

            String code = req.getParameter("code");
            if (code == null || code.isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("Missing authorization code");
                return;
            }

            // Exchange authorization code for tokens
            String token = provider.getTokenForCode(x, code, req.getRequestURL().toString());
            if (token == null) {
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("Failed to obtain tokens");
                return;
            }

            javax.json.JsonReader reader;

            reader = javax.json.Json.createReader(new java.io.StringReader(token));
            javax.json.JsonObject tokenResponse = reader.readObject();
            reader.close();

            String parts[] = tokenResponse.getString("id_token").split("\\.");
            String bodyb64 = parts[1];

            byte[] bodyBytes = java.util.Base64.getUrlDecoder().decode(bodyb64);
            String body = new String(bodyBytes, java.nio.charset.StandardCharsets.UTF_8);

            reader = javax.json.Json.createReader(new java.io.StringReader(body));
            javax.json.JsonObject bodyObject = reader.readObject();
            reader.close();

            if (!bodyObject.getBoolean("email_verified")) {
                throw new foam.nanos.auth.AuthenticationException("email is not verified");
            }

            if (bodyObject.getInt("exp", Integer.MIN_VALUE) < java.time.Instant.now().getEpochSecond()) {
                throw new foam.nanos.auth.AuthenticationException("expired token");
            }

            if (!bodyObject.getString("aud").equals(provider.getClientId())) {
                throw new foam.nanos.auth.AuthenticationException("incorrect audience");
            }

            String email = bodyObject.getString("email");

            foam.nanos.auth.User user = ((foam.nanos.auth.UniqueUserService)x.get("uniqueUserService")).getUser(x, email);

            if ( user == null && state.getSignUp() ) {
                // TODO: Should this be the session context?
                user = new foam.nanos.auth.User.Builder(x)
                        .setUserName(state.getSignUpUsername())
                        .setEmail(email)
                        .setEmailVerified(true)
                        .build();

                foam.dao.DAO userRegistrationDAO = (foam.dao.DAO)(x.get("userRegistrationDAO"));
                userRegistrationDAO.put(user);

                user = ((foam.nanos.auth.UniqueUserService)x.get("uniqueUserService")).getUser(x, email);
            }

            if ( user == null ) {
                throw new RuntimeException("user not found");
            }

            foam.nanos.session.Session session = (foam.nanos.session.Session)((foam.dao.DAO)x.get("sessionDAO")).find(state.getSessionId());
            if ( session == null ) {
                throw new RuntimeException("session not found");
            }

            foam.nanos.auth.LoginService login = (foam.nanos.auth.LoginService)x.get("loginService");
            login.login(session.getContext(), user);

            if (state.getReturnToApp()) {
                resp.sendRedirect(state.getReturnToUrl());
            } else {
                resp.setStatus(HttpServletResponse.SC_OK);
                resp.setContentType("text/html");
                resp.getWriter().write("<!DOCTYPE html><html><body><h1>Login Success</h1><script language=\"javascript\">window.opener.postMessage({ msg: \"success\", sessionID: \"" + state.getSessionId() + "\" }, location.origin);</script></body></html>");
            }
        } catch (Exception e) {
            e.printStackTrace();
            try {
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("Server error");
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}