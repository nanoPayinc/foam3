#!/bin/bash

source build/env.sh

HOST=$1
TARBALL_NAME=${NAME}-deploy-${VERSION}.tar.gz
TMP_PATH=/tmp/deploy
rm -rf ${TMP_PATH}
mkdir -p ${TMP_PATH}
cp build/package/${TARBALL_NAME} ${TMP_PATH}/
TARBALL=${TMP_PATH}/${TARBALL_NAME}

echo Installing $SYSTEM_NAME-$VERSION to $HOST
ssh -o ConnectTimeout=5 $HOST 'touch /tmp/OFFLINE; sleep 5; sudo systemctl stop '${SYSTEM_NAME}'; rm /tmp/OFFLINE'
foam3/tools/bin/install_remote.sh -W$HOST -T${TARBALL}
