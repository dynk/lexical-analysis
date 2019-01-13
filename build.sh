#!/bin/bash
echo "start building..."
docker-compose down
docker image prune -f
if [ "$1" = "develop" ] || [ "$1" = "dev" ] || [ "$1" = "test" ] ; then
  export NODE_ENV=development 
  echo "Deploying develop"
  docker stop mongo-lexical   
  docker rm mongo-lexical  
  docker rmi mongo-lexical
  docker run -d -p 27017:27017 --name mongo-lexical -v /data/db:/data/db mongo --bind_ip_all
  npm run start:dev
else
  echo "Deploying production"
  git pull
  export NODE_ENV=production 
  docker-compose up --build
fi