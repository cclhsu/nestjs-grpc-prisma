#!/bin/bash

# Purpose: remove comments and decorators from TypeScript FILES
# Keep for reference:
# sed -e '/@.*(.*)/d' -e '/@.*({/,/})/d' -e '/@.*(/{:a;N;/})/!ba;d;}' "${1}"
# sed -e '/\/\/ .*/d' -e '/\/\*/,/\*\//d' "${1}"
# sed -e '/'\''use strict'\'';/d' "${1}"
# sed -e '/import .*;/d' -e '/import {/,/} from .*;/d' "${1}"
# sed -e '/const ERR_MSGS = {/,/};/d' "${1}"
# sed -e '/constructor(/{:start /}/!{N;b start};d}' "${1}"
# see -e '/^export default .*;$/d' "${1}"
# sed -e '/^function .*(/{:start /}/!{N;b start};d}' "${1}"
# sed -e '/^[[:space:]]*$/d' "${1}"

# sed -e '/^function .*(/{:start /}/!{N;b start};d}' "${1}"

# Check if a FILE name is provided as an argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <FILE.ts> or $0 <directory>"
    exit 1
fi

# Check if the argument is a FILE or directory
if [ -f "$1" ]; then
    # It's a FILE
    TARGET="$1"
elif [ -d "$1" ]; then
    # It's a directory
    TARGET="$1"
else
    echo "Invalid argument: $1 is neither a FILE nor a directory"
    exit 1
fi

# Define a function to process a single TypeScript FILE
function process_file() {
    local FILE="$1"
    # echo "Cleaning FILE: ${FILE}"
    # echo "--------------------------------------------------"
    # Remove comments, decorators, constructor, empty lines, and print only class content
    # sed -e '/\/\/ .*/d' -e '/\/\*/,/\*\//d' -e '/import .*;/d' -e '/import {/,/} from .*;/d' -e '/const ERR_MSGS = {/,/};/d' -e '/@.*(.*)/d' -e '/@.*({/,/})/d' -e '/@.*(/{:a;N;/})/!ba;d;}' -e '/constructor(/{:start /}/!{N;b start};d}' -e '/^[[:space:]]*$/d' "${FILE}"
    sed -e '/@.*(.*)/d' -e '/@.*({/,/})/d' -e '/@.*(/{:a;N;/})/!ba;d;}' -e '/\/\/ .*/d' -e '/\/\*/,/\*\//d' -e '/'\''use strict'\'';/d' -e '/import .*;/d' -e '/import {/,/} from .*;/d' -e '/const ERR_MSGS = {/,/};/d' -e '/constructor(/{:start /}/!{N;b start};d}' -e '/^export default .*;$/d' -e '/^[[:space:]]*$/d' "${FILE}"
}

# Directory to search for .entity.ts FILES
PATTERN="*.dto.ts" # "*.entity.ts" or "*.dto.ts"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-cli/src/"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-web/src/"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/common/entity"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/project-communication"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/project-management"
# DIR="/Users/clark.hsu/src/myProject/project-suite/project-suite-service/src/stakeholders"

# Check if the TARGET is a directory
if [ -d "${TARGET}" ]; then
    echo "Cleaning directory: ${TARGET}"
    echo "--------------------------------------------------"
    # Use find to locate .entity.ts FILES and apply sed to each of them
    # FILES=$(find "${TARGET}" -maxdepth 1 -type f -name ${PATTERN} | sort)
    FILES=$(find "${TARGET}" -type f -name ${PATTERN} | sort)
    echo "${FILES}"
    for FILE in ${FILES}; do
        if [ -f "${FILE}" ]; then
            # Replace the echo command with your desired command
            process_file "${FILE}"
        fi
    done
else
    # It's a single FILE
    process_file "${TARGET}"
fi
