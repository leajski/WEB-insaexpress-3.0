FROM node:9

WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY index.js .

ENV SW3_LOGIN=''
ENV SW3_PASSWORD=''
ENV INSAEXPRESS_API='https://api.insaexpress.racing'
ENV INSAEXPRESS_TOKEN='HeyCoucou'

CMD node index.js