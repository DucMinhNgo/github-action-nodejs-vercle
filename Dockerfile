FROM node:14

WORKDIR /app

COPY package.json .
COPY . .

EXPOSE 3000
RUN npm install

CMD npm start