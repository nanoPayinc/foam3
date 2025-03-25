#!/usr/bin/env bash

# Generates a wildcard certificate for a domain for development.

set -e

if [ "$#" -lt 2 ]; then
    echo "usage: $0 domain alt-names-file [ca-domain]"
    exit 1
fi

DOMAIN=$1
ALT_NAMES_FILE=$2
CA_DOMAIN=$DOMAIN
if [ "$#" -eq 3 ]; then
    CA_DOMAIN=$3
fi
PASSWORD=$DOMAIN
len=`echo $PASSWORD | wc -m`
if [ "$len" -lt "6" ]; then
  PASSWORD=$PASSWORD$PASSWORD;
fi

if [ ! -f "${CA_DOMAIN}-ca.key" ]; then
    echo -e "Certificate Authority private key file ${CA_DOMAIN}-ca.key does not exist!"
    echo
    echo -e "Please run create-ca.sh first."
    exit
fi

# Set our CSR variables
SUBJ="
C=CA
ST=Ontario
localityName=Toronto
O=$DOMAIN
organizationalUnitName=R&D
emailAddress=support@foamdev.com
"

# Generate a private key
openssl genrsa -out "$DOMAIN.key" 2048

# Create a certificate signing request
openssl req -new -subj "$(echo -n "$SUBJ" | tr "\n" "/")" -key "$DOMAIN.key" -out "$DOMAIN.csr"

# Create the signed certificate
openssl x509 -req \
    -in "$DOMAIN.csr" \
    -extfile "$ALT_NAMES_FILE" \
    -CA "$CA_DOMAIN-ca.crt" \
    -CAkey "$CA_DOMAIN-ca.key" \
    -CAcreateserial \
    -out "$DOMAIN.crt" \
    -days 712 \
    -sha256

rm "$DOMAIN.csr"

# Create pkcs and key store
openssl pkcs12 \
        -inkey "$DOMAIN.key" \
        -in "$DOMAIN.crt" \
        -export -out "$DOMAIN.pkcs12" \
        -passout pass:"$PASSWORD"

echo "keytool"
keytool \
    -importkeystore \
    -srckeystore "$DOMAIN.pkcs12" \
    -srcstoretype PKCS12 \
    -srcstorepass "$PASSWORD" \
    -destkeystore "$DOMAIN.jks" \
    -deststoretype JKS \
    -deststorepass "$PASSWORD"

keytool -list -v \
        -keystore "$DOMAIN.jks" \
        -storepass "$PASSWORD"

cat $DOMAIN.crt $DOMAIN.key > $DOMAIN.pem

echo -e "Success!"
echo
echo -e "Use $DOMAIN.key and $DOMAIN.crt in web server."
echo -e "Use $DOMAIN-ca.crt and $DOMAIN.pem in load-balancer."
echo -e "Use $DOMAIN.jks as a keystore."
echo -e "Import $DOMAIN-ca.crt into browser to make it accept the certificate."
