###########
# BUILDER #
###########

# pull official base image
FROM node:16.13-alpine

# set work directory
WORKDIR /app

# install dependencies and avoid `node-gyp rebuild` errors
COPY package*.json ./

# copy our react project
COPY . .

RUN npm install -g typescript
RUN npm install -g ts-node

RUN npm install

RUN npm run build

#########
# FINAL #
#########

COPY ./build ./build

EXPOSE 3000

RUN npm install -g serve && \
    npm install -g runtime-env-cra

CMD ["/bin/sh", "-c", "runtime-env-cra && serve -s . -l 3000 --no-clipboard"]