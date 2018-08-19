# REST-API-posgres-on-docker 
### Description
REST-API working with postgresql server, both running on two different docker containers, commuticate each other.
Using linux OS-ubuntu 18.04 

## Prerequisites Installation:
    1. docker CE edition
    2. docker-compose
    3. nodeJS
    4. postgres
    5.optional:
        //using express package as a framework 
        npm install -g express-generator
        express --view=ejs
        npm install --save express
        npm install --save pg-promise bluebird
    6. npm install --save-dev nodemon
    7. npm install --save morgan

## Description and usage app:
    Setting-up:
        1. Activate and run rest-api and postgres containers
            $docker-compose up
        2. change PG_DOCKER_IP value locate in queries.js
            Docker provide his own sub-ip address, in order to manage communicate with postgres DB, need to update PG_DOCKER_IP                   locate in queries.js:
                a. find the sub-ip address of postgres container using following cmd:
                    $docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
                b. change PG_DOCKER_IP value.
    Build/Create schema in DB:
        1. connect postgres server
            $docker exec -it <container-name> psql -U postgres
        2. check for connection and db-name
            \c
        3. create a table
            CREATE TABLE persons(name text,age int); 
        4. Optional, insert values:
            INSERT INTO <table-name> (<attr1>,<attr2>...) values (<val1>,<val2>); 
        5. Show List of Relationship - the tables.
            \dt
        6. Optional, query - select all culums 
            select * from <table-name>;
        7. exit 
            \q

    CURL commands:
        REST-API server implement two kind of requests, GET and POST.
        Checking if rest-api server is alive
            $curl localhost:4000/
        GET: query for all names that are of certain age, response content-type: JSON:
            curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/api/v1/persons/age=<age>
        POST: update with a single object at the time, using JSON as content-type:
            $curl --header "Content-Type: application/json" \
            --request POST \
            --data '{"name":"<name>","age":"<age>"}' \
            http://localhost:4000/api/v1/persons
