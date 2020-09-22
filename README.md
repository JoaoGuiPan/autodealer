# Autodealer

Autodealer Web App and API

# Building

First, you will need to have Docker, node.js and Java 8 (make sure it is jdk 1.8, otherwise it will not work due to the grpc/spring api requirements) installed on your machine.
To build the code, simply run `./mvnw clean install` in 'autodealer-api' folder and then `npm install` in 'autodealer-front' folder.

# Running

To run the app, first run the envoy proxy in 'autodealer-api' folder:

`docker run -d -v "$(pwd)"/envoy/envoy.yaml:/etc/envoy/envoy.yaml:ro \`
`-p 8081:8081 -p 9901:9901 envoyproxy/envoy:v1.15.0`

After that, run `./mvnw spring-boot:run` in 'autodealer-api' folder and then `npm start` in 'autodealer-front' folder.The app will be available at `http://localhost:3000/`.

# Documentation

The REST API documentation is available at `http://localhost:8080/swagger-ui.html`.
