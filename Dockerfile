#Pull images
FROM node:latest

#Setup folder structure
RUN mkdir -p /usr/src/app

#Setup Defaults for actions
WORKDIR /usr/src/app

#Install node dependencies
COPY package.json /usr/src/app/
RUN npm install

#Copy app to container
COPY . /usr/src/app

#Setup container configuration
EXPOSE 3000

#Start
CMD [ “node”, app.js” ]