FROM node:23.5.0

WORKDIR app

COPY public /app/public
COPY src /app/src
COPY package.json /app/package.json

RUN npm install

CMD ["npm", "start"]