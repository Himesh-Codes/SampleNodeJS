FROM node:latest
# app working dir setup
WORKDIR /usr/src/app

# copy the external base dir with package.json, package-lock.json
COPY package*.json ./

RUN npm install

# copy all file in current repo to destination
COPY . .

# port expose
EXPOSE 3000
# commands
CMD [ "node", "index.js" ]