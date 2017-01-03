FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 4000

ADD private-install.sh ./private-install.sh
RUN chmod +x ./private-install.sh
CMD ["./private-install.sh"]
CMD ["npm", "start"]
