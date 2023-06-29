<p align="center">
    <img src="./monorepo.png" height="130"/>
</p>
<p align="center">
    <img src="https://img.shields.io/github/package-json/v/wellers0n/monorepo-edge?style=flat-square"/>
    <img src="https://img.shields.io/github/last-commit/wellers0n/monorepo-edge?style=flat-square"/>
    <a href="https://twitter.com/wellers0n_" target="_blank">
        <img src="https://img.shields.io/twitter/url/https/wellers0n_.svg?style=social"/>
    </a>
</p>

<p>
   <h1 align="center">Monorepo-edge</h1>
<p/>
    
<br/>

## Fullstack typescript/javascript

Monorepo-edge uses a stack full `JS/TS` on the frontend and backend, I'm making this project to improve
my skills!

## Node version

Use node `v18.12.1`

## Initing in the your PC

- For clone the project `git clone https://github.com/Wellers0n/monorepo-edge.git`
- Enter in the folder `cd monorepo-edge/`

## Install dependencies

```sh
yarn
```

## Avoid conflict

- WARNIGN: avoid conflicts with docker-compose

#### Mac

```sh
brew services stop --all
```

#### Linux

```sh
sudo service stop
```

#### Windows

```sh
pg_ctl -D "C:\Program Files\PostgreSQL\<Version>\data" stop
```

## Init application

Init docker-compose

At the root directory, run the following command:

### docker-compose

```sh
 docker-compose up --build -d
```

run application:

```sh
 yarn dev
```

## Run migrations and seed

- NOTE: Wait for docker-compose or start postgres locally, to run the following command

```sh
yarn migration:deploy
```

## Listening in

frontend port: `http://localhost:3000`

backend port: `http://localhost:3001`

## API Docs

Visit [http://localhost:3001/docs/](http://localhost:3001/api/) for more information about the documentation

 <img src="./swagger.png" />

## Stack used

[NextJS](https://nextjs.org/)<br/>
[NestJS](https://nestjs.com/)<br/>
[Postgresql](https://www.postgresql.org/)<br/>
[Docker](https://www.docker.com/)<br/>
[Jest](https://jestjs.io/pt-BR/)<br/>
[Swagger](https://swagger.io/)<br/>
[Docker-compose](https://docs.docker.com/compose/)<br/>
[Yarn](https://yarnpkg.com/en/)<br/>
[WorkSpaces](https://yarnpkg.com/lang/en/docs/workspaces/)<br/>
[Material-IU](https://mui.com/)<br/>
