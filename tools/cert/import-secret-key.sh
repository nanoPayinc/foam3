#!/usr/bin/env bash
# Imports a secret key into the keystore.
# See notes at the bottom regarding programatic retrieval

if [ "$#" -ne 3 ]; then
    echo "usage: $0 domain alias secret"
    exit 1
fi

set -e
DOMAIN=$1
ALIAS=$2
SECRET=$3
PASSWORD=$DOMAIN

echo $SECRET > /tmp/sk

# Set Name variables
DNAME="
CN=$DOMAIN
OU=R&D
O=$DOMAIN
L=Toronto
S=ON
C=CA
"

echo "keytool import secret key for encryption"

keytool -importpass \
 -v \
 -alias "$ALIAS" \
 -keyalg PBEWithHmacSHA512AndAES_256 \
 -keypass "$PASSWORD" \
 -keystore "$DOMAIN.jks" \
 -storepass "$PASSWORD" \
 -storetype PKCS12 \
 <<<"$SECRET"

keytool -list -v \
        -alias "$ALIAS" \
        -keyalg PBEWithHmacSHA256AndAES_128 \
        -keystore "$DOMAIN.jks" \
        -storepass "$PASSWORD" \
        -storetype PKCS12

echo -e "Success!"
echo

# Retrieval
# KeyStore ks = KeyStore.getInstance("JCEKS");
# ks.load(new FileInputStream(new File("KEYSTORE_FILE")), "KEYSTORE_PAS# SWORD".toCharArray());

# SecretKey passwordKey = (SecretKey) ks.getKey("ALIAS", "KEY_PASSWORD".toCharArray());

# System.out.println(new String(passwordKey.getEncoded()));
