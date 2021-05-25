#!/bin/bash
set -e

npm install --no-optional

npm run build

npm run export

npm run upload