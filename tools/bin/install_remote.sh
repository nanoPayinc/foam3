#!/bin/bash
NAME=
VESION=
USER=foam
USER_ID=3626
WEB_PORT=
FOAM_TARBALL=
FOAM_REMOTE_OUTPUT=/tmp
INSTALL_ONLY=0
RC_FILE=~/.config/foam/remoterc
REMOTE_USER=
REMOTE_URL=
SSH_KEY=
BACKUP=true
CLUSTER=false

function quit {
    echo "ERROR :: [${REMOTE_URL}] Install Failed"
    exit $1
}

function usage {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options are:"
    echo "  -B <true | false>  : backup"
    echo "  -C <true | false>  : Configure as Medusa mediator"
    echo "  -H hostname        : Remote host to install to"
    echo "  -i                 : Install only"
    echo "  -I <ssh-key>       : SSH Key to use to connect to remote server"
    echo "  -m                 : Configure as Medusa mediator"
    echo "  -N name            : Application name used for unique directories and systemctl"
    echo "  -O <path>          : Remote Location to put tarball, default to /tmp"
    echo "  -R <filepath>      : remoterc file to load, default to ./config/foam/remoterc"
    echo "  -T <tarball>       : Name of tarball, looks in target/package"
    echo "  -U user name       : Configure to run application under this user (and group)"
    echo "  -Y user id         : Confiugre to run application under this user id (and group id)"
    echo "  -V version         : Application version"
    echo "  -W webport         : Configure application Web port"
    echo "  -X user name       : Remote user to connect as"
    echo ""
}

while getopts "B:C:H:iI:mN:O:R:T:U:V:W:X:Y:" opt ; do
    case $opt in
        B) BACKUP=${OPTARG};;
        C) CLUSTER=${OPTARG};;
        H) REMOTE_URL=${OPTARG};;
        i) INSTALL_ONLY=1;;
        I) SSH_KEY=${OPTARG};;
        m) CLUSTER=TRUE;;
        N) NAME=${OPTARG};;
        O) FOAM_REMOTE_OUTPUT=${OPTARG};;
        R) RC_FILE=$OPTARG;;
        T) FOAM_TARBALL_PATH=${OPTARG};;
        U) USER=${OPTARG};;
        V) VERSION=${OPTARG};;
        W) WEB_PORT=${OPTARG};;
        X) REMOTE_USER=${OPTARG};;
        Y) USER_ID=${OPTARG};;
        ?) usage; exit 0;;
   esac
done

if [ -z "${REMOTE_URL}" ]; then
    echo "ERROR :: -Hhostname required"
    exit 1
fi

if [ -z "${NAME}" ]; then
    NAME=$(./foam3/tools/build.js -XappName | grep "Application Name" | sed -E 's/(.*):{1}(.*)/\2/' | tr -d '[:blank:]')
fi
if [ -z "${VERSION}" ]; then
    VERSION=$(./foam3/tools/build.js -Xversions | grep "Application Version" | sed -E 's/(.*):{1}(.*)/\2/' | tr -d '[:blank:]')
fi

if [ -f $RC_FILE ]; then
    echo "INFO :: [${REMOTE_URL}] Loading $RC_FILE"
    . $RC_FILE
fi

echo "INFO :: [${REMOTE_URL}] $NAME $VERSION"

if [ -z "${FOAM_TARBALL_PATH}" ]; then
    FOAM_TARBALL_PATH=build/package/${NAME}-deploy-${VERSION}.tar.gz
fi

FOAM_TARBALL=$(basename $FOAM_TARBALL_PATH)

if [ ! -f ${FOAM_TARBALL_PATH} ]; then
    echo "ERROR :: [${REMOTE_URL}] Tarball ${FOAM_TARBALL_PATH} doesn't exist"
    quit
fi

# user and ssh key may be specified in .ssh/config
REMOTE=${REMOTE_URL}
if [ ! -z "${REMOTE_USER}" ]; then
    REMOTE=${REMOTE_USER}@${REMOTE_URL}
fi

SSH_KEY_OPT=""
if [ ! -z "${SSH_KEY}" ]; then
    SSH_KEY_OPT="-i ${SSH_KEY}"
fi

if [ $INSTALL_ONLY -eq 0 ]; then

    ssh ${SSH_KEY_OPT} ${REMOTE} 'rm -rf ${FOAM_REMOTE_OUTPUT}/*tar*'
    if [ ! $? -eq 0 ]; then
        echo "ERROR :: [${REMOTE_URL}] Failed removing tarball from remote server ${REMOTE_URL}"
        quit
    fi

    echo "INFO :: [${REMOTE_URL}] Copying ${FOAM_TARBALL_PATH} to ${REMOTE}:${FOAM_REMOTE_OUTPUT}/${FOAM_TARBALL}"
    if [ -f ${FOAM_TARBALL_PATH} ]; then
        scp ${SSH_KEY_OPT} ${FOAM_TARBALL_PATH} ${REMOTE}:${FOAM_REMOTE_OUTPUT}/${FOAM_TARBALL}
    else
        echo "ERROR :: [${REMOTE_URL}] tarball not found ${FOAM_TARBALL_PATH}"
        quit
    fi

    if [ ! $? -eq 0 ]; then
        echo "ERROR :: [${REMOTE_URL}] Failed copying tarball to remote server ${REMOTE_URL}"
        quit
    else
        echo "INFO :: [${REMOTE_URL}] Successfully copied tarball to remote server ${REMOTE_URL}"
    fi
fi

OPT_ARGS="-C${CLUSTER} -B${BACKUP} -N${NAME} -V${VERSION} -U${USER} -Y${USER_ID}";
if [ -n "${WEB_PORT}" ]; then
    OPT_ARGS="${OPT_ARGS} -W${WEB_PORT}"
fi

ssh ${SSH_KEY_OPT} ${REMOTE} "sudo bash -s -- -T${FOAM_REMOTE_OUTPUT}/${FOAM_TARBALL} ${OPT_ARGS}" < ./foam3/tools/deploy/bin/install.sh

if [ ! $? -eq 0 ]; then
    quit;
else
    echo "INFO :: [${REMOTE_URL}] Remote install successful"
fi

exit 0;
