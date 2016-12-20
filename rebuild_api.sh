#!/bin/sh

mkdir api_build
cd api_build

git clone https://github.com/swagger-api/swagger-codegen

cd swagger-codegen

mvn clean package

java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i http://localhost:8000/api -l typescript-angular2 -o ../../src/app/api

cd ../..
rm -rf api_build
