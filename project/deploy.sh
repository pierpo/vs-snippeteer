#!/bin/bash

cd ..
rm -rf asset-manifest.json favicon.ico index.html manifest.json service-worker.js static
cp -r project/build/* .
rm -rf project/build
cd project
