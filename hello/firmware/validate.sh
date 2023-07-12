#!/bin/bash

set -e

TEMPDIR=`mktemp -d -t hello-validate-XXXXXXXXXX`

D2C_DIR="${TEMPDIR}/deviceToCloud"
mkdir $D2C_DIR
for file in deviceToCloud/*.json; do
  filename=$(basename "$file" .json)
  echo ""
  echo "# deviceToCloud: ${filename}"
  cat $file | jq
  echo "converting $filename"
  zcbor convert -c deviceToCloud.cddl -i $file -o $D2C_DIR/$filename.cbor --input-as json --output-as cbor -t deviceToCloud-message
  echo "comparing $filename"
  cmp deviceToCloud/$filename.cbor $D2C_DIR/$filename.cbor
done

C2D_DIR="${TEMPDIR}/cloudToDevice"
mkdir -p $C2D_DIR
for file in cloudToDevice/*.json; do
  filename=$(basename "$file" .json)
  echo ""
  echo "# cloudToDevice: ${filename}"
  cat $file | jq
  echo "converting $filename"
  zcbor convert -c cloudToDevice.cddl -i $file -o $C2D_DIR/$filename.cbor --input-as json --output-as cbor -t cloudToDevice-message
  echo "comparing $filename"
  cmp cloudToDevice/$filename.cbor $C2D_DIR/$filename.cbor
done

rm -r $TEMPDIR