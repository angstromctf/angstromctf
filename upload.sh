aws s3 rm s3://angstromctf.com --recursive
ng build --prod --aot
aws s3 sync dist s3://angstromctf.com
