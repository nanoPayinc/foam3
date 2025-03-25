#!/usr/bin/env bash
# Imports a certificate into the keystore.
# NOTE: update variables before use.

if [ "$#" -ne 3 ]; then
    echo "usage: $0 alias domain certificate-file"
    exit 1
fi

set -e
ALIAS=$1
FILE=$2
DOMAIN=$3
PASSWORD=$DOMAIN

# Set Name variables
DNAME="
CN=$DOMAIN
OU=R&D
O=$DOMAIN
L=Toronto
S=ON
C=CA
"

echo "keytool import certificate"


keytool -import \
 -v \
 -trustcacerts \
 -alias "$ALIAS" \
 -keypass "$PASSWORD" \
 -keystore "$DOMAIN.jks" \
 -storepass "$PASSWORD" \
 -storetype PKCS12 \
 -file $FILE


keytool -list -v \
        -keystore "$DOMAIN.jks" \
        -storepass "$PASSWORD"


echo -e "Success!"
echo
