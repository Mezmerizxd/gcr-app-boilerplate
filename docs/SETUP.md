# Setup

## Installation

Clone the repo

```bash
git clone https://github.com/mezmerizxd/gcr-app-boilerplate.git
```

Change directory

```bash
cd gcr-app-boilerplate
```

Install dependencies

```bash
yarn install
```

## Environment Variables

Create a `.env` file in the root directory and then copy the contents of `.env.example` into it. Then fill in the values.

## Database

This boilerplate uses Postgres as the database. You can use any database you want but you will have to change the code to reflect that.

```bash
yarn database:migrate:dev

yarn database:migrate:deploy
```

## Development

```bash
yarn watch
```

## Deployment

```bash
yarn gcr:deploy
```
