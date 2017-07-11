ng build --prod --aot --env=prod
ssh toor@angstromctf.com 'rm -rf /srv/http/angstromctf/'
scp -r dist/ toor@angstromctf.com:/srv/http/angstromctf/
