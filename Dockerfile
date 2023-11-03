FROM node:18

WORKDIR /user/src/app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG SUPA_URL
ARG SUPA_KEY

ENV MODE=production
ENV SERVER_PORT=8080
ENV SOCKET_HOST=https://test.zvyezda.com/ws
ENV SERVER_HOST=https://test.zvyezda.com
ENV SUPA_URL=$SUPA_URL
ENV SUPA_KEY=$SUPA_KEY

EXPOSE 8080

# yarn build && yarn start
CMD ["yarn", "gcp:start"]