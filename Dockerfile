FROM node:18

WORKDIR /user/src/app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG SERVER_PORT
ARG SOCKET_HOST
ARG SERVER_HOST
ARG POSTGRES_URL

ENV MODE=production
ENV SERVER_PORT=$SERVER_PORT
ENV SOCKET_HOST=$SOCKET_HOST
ENV SERVER_HOST=$SERVER_HOST
ENV POSTGRES_URL=$POSTGRES_URL

EXPOSE $SERVER_PORT

# yarn build && yarn start
CMD ["yarn", "gcr:start"]