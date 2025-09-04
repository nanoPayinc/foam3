#!/bin/bash
node tools/build.js "$@"

if [[ $? -eq 1 ]]; then
    tput bel;
fi
