# Muninn Protocols [![npm version](https://img.shields.io/npm/v/@bifravst/muninn-proto.svg)](https://www.npmjs.com/package/@bifravst/muninn-proto)

[![GitHub Actions](https://github.com/bifravst/Muninn-proto/actions/workflows/build-and-publish.yaml/badge.svg)](https://github.com/bifravst/Muninn-proto/actions/workflows/build-and-publish.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

Documents the communication protocol between the Muninn backend and the web
application.

## Usage

```bash
npm i --save-exact @bifravst/muninn-proto
```

[Example](./example.ts)

## Setup

Fetch the submodules

```bash
git submodule init
git submodule update --remote
```

Install the dependencies:

```bash
npm ci
```

## Run tests

```bash
npm test
```

## Update generated code

```bash
npx tsx generate/types/schema-to-type.ts
npx tsx generate/schema/NRFCloudMessage.schema.ts
npx prettier --write .
```
