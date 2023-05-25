#! /bin/bash
npm run install-server
npm run install-client
npm run build-server
npm run build-client
npm run --prefix server start