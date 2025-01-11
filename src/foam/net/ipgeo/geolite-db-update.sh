#! /usr/bin/env zsh

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <accountId> <licenseKey> <path>"
    exit 1
fi

ACCOUNT_ID=$1
LICENSE_KEY=$2
SAVE_TO=$3
DOWNLOAD_DIR="/tmp/maxmind"
FILE_LOCATION="/tmp/maxmind/maxmind-update.tgz"
URL="https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City"

mkdir $SAVE_TO
mkdir $DOWNLOAD_DIR

cd $DOWNLOAD_DIR && {
    echo "INFO :: downloading ${URL} to ${FILE_LOCATION}"
    curl -L -o $FILE_LOCATION $URL"&license_key=$LICENSE_KEY&suffix=tar.gz&account_id=$ACCOUNT_ID" ;
    if [ ! $? -eq 0 ]; then
        echo "ERROR: download failed"
        exit 1
    fi

    echo "INFO :: extracting ${FILE_LOCATION} to ${SAVE_TO}/geolite"
    tar -xzf $FILE_LOCATION
    rm $FILE_LOCATION
    # rename extracted folder to a known name
    # move contents of maxmind/geolite maxmind/ and delete geolite
    mv ./* "${SAVE_TO}/geolite"
    mv ./*/* .
    rm -rf geolite
    cd -;
}

echo "INFO :: complete"
