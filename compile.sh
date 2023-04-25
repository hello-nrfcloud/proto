#!/bin/bash

set -e
set -x

npx swc -C jsc.experimental.keepImportAssertions=true -d dist/nrfCloud ./nrfCloud
npx swc -C jsc.experimental.keepImportAssertions=true -d dist/nrfGuide ./nrfGuide
npx swc -C jsc.experimental.keepImportAssertions=true -d dist/validator ./validator
npx swc -C jsc.experimental.keepImportAssertions=true -d dist/generate ./generate
cp -r schemas ./dist