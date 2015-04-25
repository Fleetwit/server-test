# Server Management & Scaling #

This repository is a simple multi-thread HTTP server written in NodeJS.

It is simulating FleetWit's API server, which is also  multi-thread and written in NodeJS.

## Instructions ##

Your goal is to setup and scale this HTTP server on AWS.

Credentials to connect to AWS have been sent by email.

- Setup a small machine, any unix or linux of your choice.
- Install the dependencies required.
- Clone and install the HTTP server.
- Setup the HTTP server as a service.
- Scale up to have the HTTP server running on 3 machines.
- Provide the URL of the load balancer



## Dependencies to install ##

In order to install the HTTP server, you need to install:

- git
- nodejs
- npm

## Install ##

- Clone this repository on the machine using git
- cd into the directory
- Execute: `npm install` to install the server's dependencies.

### To launch the server ###

To launch the HTTP server, execute (from the repository) `node main.js -port 80`

Once the server is launched, the console will display: `Server listening on port 80`

### To test the server ###

The HTTP server only serves one page: `/`.

If you open the server's IP in the browser, you'll see a JSON response, exposing a few of the machine's properties: CPUs, type, platform, uptime...

