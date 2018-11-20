# Dolomite Exchange Service

Javascript library for interacting with the Dolomite Exchange API

## Install

```shell
npm install dolomite-exchange --save
```

## Development

Clone the repository and install `npm`, then install the dependencies

```shell
npm install
```

Start the `Development Server` which will automatically build your code for ES5 compliance and put it into the `lib` directory

```shell
npm start
```

Run tests. Running `npm start` in a separate tab along with the tests is highly reccomended as this allows for live reloading

```shell
npm test
```

**NOTE:** if `npm start` or `npm test` are giving you trouble, you may have to globally install gulp with `npm install -g gulp` 

Read more about developing services for the Dolomite Exchange Service in our [Development Docs](docs/DEVDOC.md)

## Release

Increment the `version` in `package.json` and then run

```shell
npm run release
```
