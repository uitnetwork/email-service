#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONT_END_DIR="$SCRIPT_DIR/../src/main/frontend"
FRONT_END_NODE_MODULES=$FRONT_END_DIR/node_modules
FRONT_END_DIST=$FRONT_END_DIR/dist
SPRING_RESOURCES_STATIC_DIR="$SCRIPT_DIR/../src/main/resources/static"
ACTION=$1

case "$ACTION" in
    clean)
        rm -rf $FRONT_END_NODE_MODULES
        ;;
    install)
        cd $FRONT_END_DIR
        npm install
        ;;
    build)
        cd $FRONT_END_DIR
        $FRONT_END_DIR/node_modules/.bin/ng build
        cp $FRONT_END_DIST/* $SPRING_RESOURCES_STATIC_DIR
        ;;
    *)
        echo "ERROR: Unknown action $ACTION"
        exit 1
esac
