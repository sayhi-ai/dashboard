FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm run preinstall
RUN npm install
COPY . /usr/src/app

#ADD private-install.sh /usr/src/app/private-install.sh
#RUN chmod +x /usr/src/app/private-install.sh
#RUN /usr/src/app/private-install.sh

EXPOSE 4000

CMD ["npm", "start"]
