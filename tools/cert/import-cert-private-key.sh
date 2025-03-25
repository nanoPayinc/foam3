#!/usr/bin/env bash
# Imports a cert private key into the keystore.

if [ "$#" -ne 3 ]; then
    echo "usage: $0 alias domain pem-file"
    exit 1
fi

set -e
ALIAS=$1
FILE=$2
DOMAIN=$3
PASSWORD=$DOMAIN


echo "keytool create p12"


openssl pkcs12 -export \
 -in $FILE \
 -out "$ALIAS.p12"  \
 -password "pass:$PASSWORD"  \
 -name "$ALIAS"  \
 -noiter \
 -nomaciter



echo "keytool import private key entry"

keytool -importkeystore \
  -srckeystore "$ALIAS.p12" \
  -srcstoretype pkcs12 \
  -srcalias "$ALIAS" \
  -srcstorepass "$PASSWORD"  \
  -destkeystore "$DOMAIN.jks" \
  -deststoretype jks  \
  -deststorepass "$PASSWORD" \
  -destalias "$ALIAS"  \




keytool -list -v \
        -keystore "$DOMAIN.jks" \
        -storepass "$PASSWORD"


echo -e "Success!"
echo
