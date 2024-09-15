FROM node:18

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 5555

CMD npm run dev