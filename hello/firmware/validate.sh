#!/bin/bash

set -e
mkdir -p from-device-cbor-validate
for file in from-device-json/*.json; do
  filename=$(basename "$file" .json)
  echo "converting $filename"
  zcbor convert -c from-device.cddl -i $file -o from-device-cbor-validate/$filename.cbor --input-as json --output-as cbor -t from-device-message
  echo "comparing $filename"
  cmp from-device-cbor/$filename.cbor from-device-cbor-validate/$filename.cbor
done
mkdir -p to-device-cbor-validate
for file in to-device-json/*.json; do
  filename=$(basename "$file" .json)
  echo "converting $filename"
  zcbor convert -c to-device.cddl -i $file -o to-device-cbor-validate/$filename.cbor --input-as json --output-as cbor -t to-device-message
  echo "comparing $filename"
  cmp to-device-cbor/$filename.cbor to-device-cbor-validate/$filename.cbor
done
