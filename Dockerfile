FROM node:20
WORKDIR /server  

RUN npm install -g typescript ts-node nodemon
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["nodemon", "--exec", "ts-node", "src/server.ts"]
