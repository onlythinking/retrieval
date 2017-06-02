#!/usr/bin/env bash

echo 'Start build...'
tar -cvzf  server.tar.gz './server'
echo 'Start upload...'
scp -i ~/.ssh/id_rsa_boya_8 server.tar.gz root@172.16.20.8:/soft/nodejs/retrieval
echo 'Start remote cmd...'
ssh root@172.16.20.8 -i ~/.ssh/id_rsa_boya_8 <<EOF
  cd /soft/nodejs/retrieval
  if [ -d 'server' ]; then
    rm -rf server
  fi
	tar -xvzf server.tar.gz
	rm -rf server.tar.gz
  exit
EOF
rm -rf server.tar.gz
echo 'Build end..'
