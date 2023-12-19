#!/bin/bash
set -e
CURRENT_DIR=$(pwd)
VERSION=$(npm pkg get version | sed -r 's/"//g')
PACKAGE_DIR=${CURRENT_DIR}/build
NODE_MODULES_DIR=${CURRENT_DIR}/node_modules

ARCHIVE_NAME=tpx-iot-flow-public-documentation.tgz
TARGET_DIR=./target

if [ -d "$TARGET_DIR" ]
then
    echo "Folder $TARGET_DIR exists => remove folder"
    rm -rf ${TARGET_DIR}
fi

echo "Create target directory $TARGET_DIR"
mkdir -p ${TARGET_DIR}

echo "Packaging archive ${ARCHIVE_NAME}"
tar czvf ${TARGET_DIR}/${ARCHIVE_NAME} -C ${PACKAGE_DIR} .
echo "Archive was created $TARGET_DIR/$ARCHIVE_NAME"
