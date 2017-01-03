FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .npmrc /usr/src/app/
COPY package.json /usr/src/app/
RUN npm install
RUN rm -f .npmrc

COPY . /usr/src/app

EXPOSE 4000

CMD ["npm", "start"]
