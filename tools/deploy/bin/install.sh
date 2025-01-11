#!/bin/bash

APP_NAME=
SYSTEM_NAME=
VERSION=
USER=
USER_ID=
WEB_PORT=8443
FOAM_TARBALL=
FOAM_REMOTE_OUTPUT=/tmp/tar_extract
BACKUP=true
CLUSTER=false

MACOS='darwin*'
LINUXOS='linux-gnu'
IS_MAC=0
IS_LINUX=0

if [[ $OSTYPE =~ $MACOS ]]; then
    IS_MAC=1
elif [[ $OSTYPE =~ $LINUXOS ]]; then
    IS_LINUX=1
fi

function quit {
    echo "ERROR :: [$HOSTNAME] Remote Install Failed"
    exit 1
}

function usage {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options are:"
    echo "  -A <app-name>     : Application name, also prefix of jar file"
    echo "  -B <true | false> : disable Backup "
    echo "  -C <true | false> : Enable clustering"
    echo "  -D <path>         : Remote location of tarball"
    echo "  -O <path>         : Remote directory tarball is extracted to, default to ~/tar_extract"
    echo "  -S name           : systemd service name"
    echo "  -U name           : User and Group name"
    echo "  -V version        : application version"
    echo "  -W port           : Web port"
    echo "  -Y userId         : User and Group ID"
    echo ""
}

while getopts "A:B:C:D:O:S:U:V:W:Y:" opt ; do
    case $opt in
        A) APP_NAME=${OPTARG};;
        B) BACKUP=${OPTARG};;
        C) CLUSTER=${OPTARG};;
        D) FOAM_TARBALL=${OPTARG};;
        O) FOAM_REMOTE_OUTPUT=$OPTARG;;
        S) SYSTEM_NAME=${OPTARG};;
        U) USER=${OPTARG};;
        V) VERSION=${OPTARG};;
        W) WEB_PORT=${OPTARG};;
        Y) USER_ID=${OPTARG};;
        ?) usage; exit 0;;
   esac
done

FOAM_ROOT=/opt/${SYSTEM_NAME}
FOAM_HOME=/opt/${SYSTEM_NAME}-${VERSION}
MNT_HOME=/mnt/${SYSTEM_NAME}
SHARED_HOME=${MNT_HOME}
UNIQUE_HOME=${MNT_HOME}/$HOSTNAME
FILES_HOME=${MNT_HOME}/files
LOG_HOME=${UNIQUE_HOME}/logs
SAF_HOME=${UNIQUE_HOME}/saf
JOURNAL_HOME=${UNIQUE_HOME}/journals
CONF_HOME=${UNIQUE_HOME}/conf
BACKUP_HOME=${UNIQUE_HOME}/backups
VAR_HOME=${UNIQUE_HOME}/var
SYSTEM_SERVICE_FILE=/lib/systemd/system/$SYSTEM_NAME.service
GROUP=$USER
GROUP_ID=$USER_ID

function backupFiles {
    echo "INFO :: [$HOSTNAME] Running Files backup"
    # skip on first install
    if [ ! -d ${MNT_HOME} ]; then
        return;
    fi

    if [ ! -d ${BACKUP_HOME}/journals ]; then
        mkdir -p ${BACKUP_HOME}/journals 
        chgrp $GROUP ${BACKUP_HOME}/journals
        chmod 750 ${BACKUP_HOME}/journals
    fi

    if [ ! -d ${BACKUP_HOME}/logs ]; then
        mkdir -p ${BACKUP_HOME}/logs 
        chgrp $GROUP ${BACKUP_HOME}/logs
        chmod 750 ${BACKUP_HOME}/logs
    fi

    # clear and copy journals and logs
    # tar'ing the live directories will fail with changed files.
    rm -rf ${BACKUP_HOME}/journals
    if [ -d ${JOURNAL_HOME} ]; then
        cp -r ${JOURNAL_HOME} ${BACKUP_HOME}/
    fi
    rm -rf ${BACKUP_HOME}/logs
    if [ -d ${LOG_HOME} ]; then
        cp -r ${LOG_HOME} ${BACKUP_HOME}/
    fi

    # Move same/duplicate version installation.
    if [ -d $FOAM_HOME ]; then
        FOAM_BACKUP=${BACKUP_HOME}/$(basename ${FOAM_HOME})-$(date +%s)-backup.tar.gz
        echo "INFO :: [$HOSTNAME] ${FOAM_HOME} found, backing up to ${FOAM_BACKUP}"
        if [ -d ${BACKUP_HOME}/journals ]; then
            tar -czf  ${FOAM_BACKUP} -C ${FOAM_HOME} . ${BACKUP_HOME}/journals ${BACKUP_HOME}/logs
        fi

        if [ ! $? -eq 0 ]; then
            echo "ERROR :: [$HOSTNAME] Couldn't backup ${FOAM_HOME} to ${FOAM_BACKUP}"
            quit
        fi
        if [ -d ${FOAM_BACKUP} ]; then
            chgrp $GROUP ${FOAM_BACKUP}
            chmod 750 ${FOAM_BACKUP}
        fi
    fi
}

function cleanupFiles {
    if [ -d ${FOAM_HOME}/lib ]; then
        sudo rm -rf ${FOAM_HOME/lib/ }
    fi
}

function installFiles {
    echo "INFO :: [$HOSTNAME] Installing ${SYSTEM_NAME} to ${FOAM_HOME}"

    if [ ! -d $FOAM_HOME ]; then
        mkdir -p ${FOAM_HOME}
    fi
    chown $USER:$GROUP $FOAM_HOME

    if [ ! -d ${FOAM_HOME}/lib ]; then
        mkdir -p ${FOAM_HOME}/lib
    fi
    chown $USER:$GROUP ${FOAM_HOME}/lib
    chmod 750 ${FOAM_HOME}/lib

    cp -r ${FOAM_REMOTE_OUTPUT}/lib/* ${FOAM_HOME}/lib

    if [ ! -d ${FOAM_HOME}/bin ]; then
        mkdir -p ${FOAM_HOME}/bin
    fi
    chown $USER:$GROUP ${FOAM_HOME}/bin
    chmod 750 ${FOAM_HOME}/bin

    cp -r ${FOAM_REMOTE_OUTPUT}/bin/* ${FOAM_HOME}/bin

    if [ ! -d ${FOAM_HOME}/etc ]; then
        mkdir -p ${FOAM_HOME}/etc
    fi
    cp -r ${FOAM_REMOTE_OUTPUT}/etc/* ${FOAM_HOME}/etc
    chown $USER:$GROUP ${FOAM_HOME}/etc
    chmod -R 750 ${FOAM_HOME}/etc

    if [ -f ${FOAM_HOME}/etc/shrc.local ]; then
        chown $USER:$GROUP ${FOAM_HOME}/etc/shrc.local
    fi

    if [ ! -d ${MNT_HOME} ]; then
        mkdir -p ${MNT_HOME}
    fi
    chown $USER:$GROUP ${MNT_HOME}
    chmod 750 ${MNT_HOME}

    if [ ! -d ${CONF_HOME} ]; then
        mkdir -p ${CONF_HOME}
    fi

    if [ ! -f "${CONF_HOME}/shrc.custom" ]; then
        echo '#!/bin/bash' > ${CONF_HOME}/shrc.custom
        echo '  JAVA_OPTS="${JAVA_OPTS} -Xmx4096m"' >> ${CONF_HOME}/shrc.custom
        if [[ ${CLUSTER} = "true" ]]; then
            echo '  JAVA_OPTS="${JAVA_OPTS} -DCLUSTER=true"' >> ${CONF_HOME}/shrc.custom
        fi
        echo '#DEBUG_DEV=1"' >> ${CONF_HOME}/shrc.custom
    fi
    chown -R $USER:$GROUP ${CONF_HOME}
    chmod -R 750 ${CONF_HOME}

    if [ ! -d ${LOG_HOME} ]; then
        mkdir -p ${LOG_HOME}
    fi
    chown $USER:$GROUP ${LOG_HOME}
    chmod 750 ${LOG_HOME}

    if [ ! -d ${VAR_HOME} ]; then
        mkdir -p ${VAR_HOME}
    fi
    chown -R $USER:$GROUP ${VAR_HOME}
    chmod 750 ${VAR_HOME}

    if [ ! -d ${JOURNAL_HOME} ]; then
        mkdir ${JOURNAL_HOME}
    fi

    chown -R $USER:$GROUP ${JOURNAL_HOME}
    chmod 750 ${JOURNAL_HOME}
 #   chmod -R 640 ${JOURNAL_HOME}/*

    if [ ! -d ${FILES_HOME} ]; then
        mkdir -p ${FILES_HOME}
    fi
    chown -R $USER:$GROUP ${FILES_HOME}
    chmod 750 ${FILES_HOME}

    if [ ! -d ${SAF_HOME} ]; then
        mkdir -p ${SAF_HOME}
    fi
    chown -R $USER:$GROUP ${SAF_HOME}
    chmod 750 ${SAF_HOME}
}

function setupUser {
    echo "INFO :: [$HOSTNAME] Verify user and group"
    if [[ $IS_LINUX -eq 1 ]]; then
        id -u $USER > /dev/null
        if [ $? -eq 1 ]; then
            echo "INFO :: [$HOSTNAME] User foam not found, creating user foam"
            groupadd --force --gid $GROUP_ID $GROUP
            useradd -g $USER --uid $USER_ID -m -s /bin/false $USER
            usermod -L $USER
        fi

        # test and set umask
        USER_HOME="$(grep foam /etc/passwd | cut -d':' -f6)"
        BASHRC="$USER_HOME/.bashrc"
        if [ ! -f "$BASHRC" ]; then
            touch "$BASHRC"
        fi
        if grep -Fxq "umask" "$BASHRC"; then
            sed -i 's/umask.*/umask 027/' "$BASHRC"
        else
            echo "umask 027" >> "$BASHRC"
        fi

        # Setup ubuntu user
        if id "ubuntu" > /dev/null 2>&1 && ! id -nG "ubuntu" | grep -qw "$USER"; then
            sudo usermod -a -G $USER ubuntu
        fi
    fi
    #TODO: add MacOS support.
    # see https://blog.travismclarke.com/post/osx-cli-user-management/
    # https://apple.stackexchange.com/questions/307173/creating-a-group-via-users-groups-in-command-line
    #if [[ $IS_MAC -eq 1 ]]; then
    #    dscl . -read /Users/foam > /dev/null
    #fi
}

function setupSymLink {
    echo "INFO :: [$HOSTNAME] Running SymLink setup"
    if [ -h ${FOAM_ROOT} ]; then
        unlink ${FOAM_ROOT}
    elif [ -d ${FOAM_ROOT} ]; then
        BACKUP_DIR="${FOAM_ROOT}.$(date +%s).bak"
        echo "INFO :: [$HOSTNAME] Found old ${FOAM_ROOT} dir, moving to ${BACKUP_DIR}"
        mv ${FOAM_ROOT} ${BACKUP_DIR}
    fi

    ln -s ${FOAM_HOME} ${FOAM_ROOT}

    if [ -h ${FOAM_HOME}/journals ]; then
        unlink ${FOAM_HOME}/journals
    fi

    if [ -d ${JOURNAL_HOME} ]; then
        ln -s ${JOURNAL_HOME} ${FOAM_HOME}/journals
    fi

    if [ -h ${FOAM_HOME}/logs ]; then
        unlink ${FOAM_HOME}/logs
    fi

    if [ -d ${LOG_HOME} ]; then
        ln -s ${LOG_HOME} ${FOAM_HOME}/logs
    fi

    if [ -h ${FOAM_HOME}/conf ]; then
        unlink ${FOAM_HOME}/conf
    fi

    if [ -d ${CONF_HOME} ]; then
        ln -s ${CONF_HOME} ${FOAM_HOME}/conf
    fi

    if [ -h ${FOAM_HOME}/var ]; then
        unlink ${FOAM_HOME}/var
    fi

    if [ -d ${VAR_HOME} ]; then
        ln -s ${VAR_HOME} ${FOAM_HOME}/var
    fi

    if [ -h ${JOURNAL_HOME}/largefiles ]; then
        unlink ${JOURNAL_HOME}/largefiles
    fi

    if [ -d ${JOURNAL_HOME} ]; then
        ln -s ${FILES_HOME} ${JOURNAL_HOME}/largefiles
    fi

    if [ -d ${SAF_HOME} ]; then
        ln -f -s ${SAF_HOME} ${FOAM_HOME}/saf
    fi
}

function setupSystemd {
    echo "INFO :: [$HOSTNAME] Running Systemd setup"
    systemctl list-units | grep ${SYSTEM_NAME}.service &> /dev/null
    if [ $? -eq 0 ]; then
        sudo systemctl stop $SYSTEM_NAME
        sudo systemctl disable $SYSTEM_NAME
    fi

    if [ -h ${SYSTEM_SERVICE_FILE} ]; then
        sudo rm "${SYSTEM_SERVICE_FILE}"
    fi

    SERVICE_FILE="${FOAM_HOME}/etc/${SYSTEM_NAME}.service"
    sudo -- sh -c "cd ${FOAM_HOME}/etc; cp system.service ${SYSTEM_NAME}.service; chown ${USER}:${GROUP} ${SYSTEM_NAME}.service"
    sed -i -e "s/APP_NAME/${APP_NAME}/g" ${SERVICE_FILE}
    sed -i -e "s/SYSTEM_NAME/${SYSTEM_NAME}/g" ${SERVICE_FILE}
    sed -i -e "s/VERSION/${VERSION}/g" ${SERVICE_FILE}
    sed -i -e "s/USER/${USER}/g" ${SERVICE_FILE}
    sed -i -e "s/GROUP/${GROUP}/g" ${SERVICE_FILE}
    sed -i -e "s/WEB_PORT/${WEB_PORT}/g" ${SERVICE_FILE}

    sudo ln -s ${SERVICE_FILE} ${SYSTEM_SERVICE_FILE}

    sudo systemctl daemon-reload
    sudo systemctl enable ${SYSTEM_NAME}
}

function restart {
    sudo systemctl restart ${SYSTEM_NAME}
}

echo "INFO :: [$HOSTNAME] Installing ${SYSTEM_NAME} on remote server"

if [ ! -f ${FOAM_TARBALL} ]; then
    echo "ERROR :: [$HOSTNAME] Tarball ${FOAM_TARBALL} doesn't exist on remote server"
    quit
fi

if [ -d ${FOAM_REMOTE_OUTPUT} ]; then
    rm -rf ${FOAM_REMOTE_OUTPUT}
fi

mkdir -p ${FOAM_REMOTE_OUTPUT}

echo "INFO :: [$HOSTNAME] Extracting tarball ${FOAM_TARBALL}"

tar -xzf ${FOAM_TARBALL} -C ${FOAM_REMOTE_OUTPUT}

if [ ! $? -eq 0 ]; then
    echo "ERROR :: [$HOSTNAME] Extracting tarball failed"
    quit
fi

setupUser

if [ "${BACKUP}" == "true" ]; then
    backupFiles
fi
cleanupFiles

installFiles

setupSymLink

setupSystemd

restart

exit 0
