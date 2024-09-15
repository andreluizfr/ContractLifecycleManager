FROM node:18

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run dev