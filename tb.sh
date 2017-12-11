docker build -t testbuild .
docker run -d -v $PWD:/app -p 5000:5000 testbuild /bin/sh -c "cd /app; npm run test-server"
#docker ps -a
docker run testbuild /bin/sh -c "cd /app npm run test"
