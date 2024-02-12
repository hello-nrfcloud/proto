#!/bin/bash

set -e
set -x

rm -rf dist/
npx swc -C jsc.experimental.keepImportAttributes=true -C jsc.experimental.emitAssertForImportAttributes=true -d dist/ ./nrfCloud
npx swc -C jsc.experimental.keepImportAttributes=true -C jsc.experimental.emitAssertForImportAttributes=true -d dist/ ./hello
npx swc -C jsc.experimental.keepImportAttributes=true -C jsc.experimental.emitAssertForImportAttributes=true -d dist/ ./validator
npx swc -C jsc.experimental.keepImportAttributes=true -C jsc.experimental.emitAssertForImportAttributes=true -d dist/ ./generate
npx swc -C jsc.experimental.keepImportAttributes=true -C jsc.experimental.emitAssertForImportAttributes=true -d dist/ ./fingerprint
cp -r ./schemas ./dist
mkdir ./dist/nrfcloud-application-protocols
cp -r ./nrfcloud-application-protocols/schemas ./dist/nrfcloud-application-protocols
