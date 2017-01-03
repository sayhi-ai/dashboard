FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

ADD private-install.sh ./private-install.sh
RUN chmod +x ./private-install.sh
RUN ./private-install.sh
RUN npm install

COPY . /usr/src/app

EXPOSE 4000

CMD ["npm", "start"]
