#!/bin/bash
# Super simple launcher.

HOST_NAME=`hostname -s`
APP_NAME=foam
SYSTEM_NAME=foam
WEB_PORT=
DEBUG_PORT=*:5005
DEBUG_SUSPEND=n
DEBUG_DEV=0
PROFILER=0
PROFILER_PORT=8849
NANOS_PIDFILE=/tmp/nanos.pid
DAEMONIZE=1
VERSION=
RUN_USER=
FS=rw
#CLUSTER=false

# local development -u deployment
if [ -f "build/env.sh" ]; then
    source build/env.sh
fi

MACOS='darwin*'
LINUXOS='linux-gnu'

PROFILER_AGENT_PATH=""
if [[ $OSTYPE =~ $MACOS ]]; then
    PROFILER_AGENT_PATH="/Applications/JProfiler.app/Contents/Resources/app/bin/macos/libjprofilerti.jnilib"
elif [[ $OSTYPE =~ $LINUXOS ]]; then
    PROFILER_AGENT_PATH="/opt/jprofiler12/bin/linux-x64/libjprofilerti.so"
fi


export DEBUG=0
function usage {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options are:"
    echo "  -A <app_name>       : Application nmae and also prefix of jar file"
    echo "  -C <true>           : enable clustering"
    echo "  -D 0 or 1           : Debug mode."
    echo "  -E <debug port>     : Port to run debugger on."
    echo "  -F <rw | ro>        : File System mode"
    echo "  -H <hostname>       : hostname "
    echo "  -J 0 or 1           : JProfiler enabled"
    echo "  -P PORT             : JProfiler PORT"
    echo "  -S <system_name>    : System name."
    echo "  -U <user>           : User to run script as"
    echo "  -V <version>        : Version."
    echo "  -W <web_port>       : HTTP Port."
    echo "  -Y <y/n>            : Suspend on debug launch."
    echo "  -Z <0/1>            : Daemonize."
}

while getopts "A:C:D:E:F:H:J:P:S:U:V:W:Y:Z:" opt ; do
    case $opt in
        A) APP_NAME=$OPTARG;;
        C) CLUSTER=$OPTARG;;
        D) DEBUG_DEV=$OPTARG;;
        E) DEBUG_PORT=$OPTARG;;
        F) FS=$OPTARG;;
        H) HOST_NAME=$OPTARG;;
        J) PROFILER=$OPTARG;;
        P) PROFILER_PORT=$OPTARG;;
        S) SYSTEM_NAME=$OPTARG;;
        U) RUN_USER=$OPTARG;;
        V) VERSION=$OPTARG;;
        W) WEB_PORT=$OPTARG;;
        Y) DEBUG_SUSPEND=$OPTARG;;
        Z) DAEMONIZE=$OPTARG;;
        ?) usage ; exit 0 ;;
   esac
done

echo "run.sh $APP_NAME($SYSTEM_NAME) @ $HOST_NAME:$WEB_PORT"


if [ ! -z ${RUN_USER} ] && [ "$(uname -s)" == "Linux" ] && [ "$(whoami)" != "${RUN_USER}" ]; then
    exec sudo -u "${RUN_USER}" -- "$0" "$@"
fi

APP_HOME=/opt/${SYSTEM_NAME}
JAVA_OPTS=""
export JOURNAL_HOME="${APP_HOME}/journals"
export DOCUMENT_HOME="${APP_HOME}/documents"
export LOG_HOME="${APP_HOME}/logs"

# load instance specific deployment options
if [ -f "${APP_HOME}/etc/shrc.local" ]; then
    . "${APP_HOME}/etc/shrc.local"
fi

JAVA_OPTS="${JAVA_OPTS} -DAPP_HOME=${APP_HOME}"
JAVA_OPTS="${JAVA_OPTS} -Dresource.journals.dir=journals"
JAVA_OPTS="${JAVA_OPTS} -Dhostname=${HOST_NAME}"
if [ -z "`echo "${JAVA_OPTS}" | grep "http.port"`" ] && [ ! -z ${WEB_PORT} ]; then
    JAVA_OPTS="${JAVA_OPTS} -Dhttp.port=${WEB_PORT}"
fi
JAVA_OPTS="${JAVA_OPTS} -DJOURNAL_HOME=${JOURNAL_HOME}"
JAVA_OPTS="${JAVA_OPTS} -DDOCUMENT_HOME=${DOCUMENT_HOME}"
JAVA_OPTS="${JAVA_OPTS} -DLOG_HOME=${LOG_HOME}"

if [[ ${FS} = "ro" ]]; then
    JAVA_OPTS="${JAVA_OPTS} -DFS=ro"
fi

echo CLUSTER=$CLUSTER
if [[ ${JAVA_OPTS} != *"CLUSTER"* ]]; then
  if [[ ${CLUSTER} = "true" ]]; then
    JAVA_OPTS="${JAVA_OPTS} -DCLUSTER=${CLUSTER}"
  fi
fi
if [ "$PROFILER" -eq 1 ]; then
    JAVA_OPTS="${JAVA_OPTS} -agentpath:${PROFILER_AGENT_PATH}=port=$PROFILER_PORT"
fi

if [ ! -z $VERSION ]; then
    JAR="${APP_HOME}/lib/${APP_NAME}-${VERSION}.jar"
else
    JAR=$(ls ${APP_HOME}/lib/${APP_NAME}-*.jar | awk '{print $1}')
fi

export RES_JAR_HOME="${JAR}"

export JAVA_TOOL_OPTIONS="${JAVA_OPTS}"
echo ${JAVA_OPTS} > ${APP_HOME}/logs/opts.txt
echo JAVA_OPTS=${JAVA_OPTS}
if [ "$DAEMONIZE" -eq 1 ]; then
    nohup java -server -jar "${JAR}" > ${APP_HOME}/logs/out.txt 3>&1 &
    echo $! > "${NANOS_PIDFILE}"
else
    java -server -jar "${JAR}"
fi

exit 0
