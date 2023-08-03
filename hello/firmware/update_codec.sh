#!/bin/bash

if [ ! -n "$1" ]; then
    echo "Error: Please provide the folder containing the cddl files"
    exit 1
fi

zcbor code -c $1/deviceToCloud.cddl \
	--default-max-qty 10 -e \
	-t deviceToCloud-message \
	--oc src/coap_encode.c \
	--oh include/deviceToCloud_encode.h \
	--oht include/deviceToCloud_encode_types.h
zcbor code -c $1/cloudToDevice.cddl \
	--default-max-qty 10 -d \
	-t cloudToDevice-message \
	--oc src/cloudToDevice_decode.c \
	--oh include/cloudToDevice_decode.h \
	--oht include/cloudToDevice_decode_types.h