#!/usr/bin/env bash

# Generates a secret key for general encryption and adds to keystore.
# NOTE: review/update variables before use.

set -e

if [ "$#" -ne 1 ]; then
    echo "usage: $0 domain"
    exit 1
fi

DOMAIN=$1
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

echo "keytool generate secret key for encryption"

keytool -genseckey \
 -alias foam.core.security.PrivateKeyDAO \
 -keyalg PBEWithHmacSHA256AndAES_256 \
 -keypass "$PASSWORD" \
 -keystore "$DOMAIN.jks" \
 -storepass "$PASSWORD" \
 -storetype PKCS12

keytool -list -v \
        -alias foam.core.security.PrivateKeyDAO \
        -keyalg PBEWithHmacSHA256AndAES_256 \
        -keypass "$PASSWORD" \
        -keystore "$DOMAIN.jks" \
        -storepass "$PASSWORD"

echo -e "Success!"
echo
