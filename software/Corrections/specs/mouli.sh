#!/bin/bash

ATM=$(pwd)

DAY=$1
STUDENTS=$2
REPOSITORY=POC_SoftwarePool2020_$DAY

rm -Rf results
mkdir results

function exec() {
    TMP=$(mktemp -d)

    echo "--------------------------------------------------"
    echo "TESTING $1"
    echo "--------------------------------------------------"

    LOGIN=$1
    GITHUB=$2

    trap ctrl_c INT
    INTERRUPTED=false

    function ctrl_c() {
        echo "Failed to test the project." > results/${LOGIN}.txt
        echo "--------------------------------------------------"
        echo "FAILED $LOGIN"
        echo "--------------------------------------------------"
        cd $ATM
        INTERRUPTED=true
        return
    }

    if [ "$INTERRUPED" = true ]
    then
        return
    fi

    git clone ${GITHUB}/${REPOSITORY} ${TMP}/student

    if [ $? -ne 0 ]
    then
        echo "Failed to test the project." > results/${LOGIN}.txt
        cd $ATM
        echo "--------------------------------------------------"
        echo "FAILED $1"
        echo "--------------------------------------------------"
        return
    fi

    cd ${TMP}/student && npm install && cd ${ATM}

    echo "RUN SCRIPT: $(cat ${TMP}/student/package.json | jq '.scripts.start')"

    export PROJECT_PATH=${TMP}/student
    jest --bail --noStackTrace ${DAY}.spec.js | tee results/${LOGIN}.txt

    echo "--------------------------------------------------"
    echo "OK $1"
    echo "--------------------------------------------------"
}

while IFS="" read -r p || [ -n "$p" ]
do
    LOGIN=${p%;*}
    GITHUB=${p##*;}
    exec $LOGIN $GITHUB
done < $STUDENTS