ng build --prod --aot
ssh toor@angstromctf.com 'rm -rf /srv/http/angstromctf/'
scp -r dist/ toor@angstromctf.com:/srv/http/angstromctf/
