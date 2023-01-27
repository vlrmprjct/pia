![GitHub License](https://img.shields.io/github/license/vlrmprjct/pia?style=flat-square)
![GitHub Issues](https://img.shields.io/github/issues/vlrmprjct/pia?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/vlrmprjct/pia?style=flat-square)
![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/vlrmprjct/pia?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/vlrmprjct/pia?style=flat-square)

# **PIA**  ( **P**arts **I**nventory **A**ssistant ) ( evolved )

## ⚠️ Development discontinued due to time constraints. ⚠️


🆕 [PIA APP 🌍 https://pia-evo.vercel.app/](https://pia-evo.vercel.app/) ( unlimited access )


This is 🚨 __working in progress__ 🚨 Electronics Parts/component Inventory Application called PIA using ExpressJS and ReactJS but ___without___ [CRA](https://github.com/facebook/create-react-app).

__Please note:__  __WIP__ ⚙️ means, proof of concept and not finishid yet !

---

## Screenshots

| Light | Dark |
|--|--|
|![](doc/view-login-dark.jpg) | ![](doc/view-welcome-dark.jpg) |
| ![](doc/view-parts-1-dark.jpg) | ![](doc/view-parts-2-dark.jpg) |
| ![](doc/view-parts-3-dark.jpg) | ![](doc/view-parts-1-light.jpg)

---
More screenshots @ [https://github.com/vlrmprjct/pia/tree/main/doc](https://github.com/vlrmprjct/pia/tree/main/doc)

---

## Table of contents

  - [Introduction](#introduction)
    - [Alternatives](#alternatives)
    - [Future Tasks](#pias-future-tasks)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Authorization](#authorization)
    - [Storage](#storage)
    - [ESLint](#eslint)
    - [Nodemon](#nodemon)
    - [Express](#express)
    - [Concurrently](#concurrently)


---

## Introduction

There a many ready to use Inventory-Systems or -Applications written in PHP or other languages
with a huge overkill about functions or server configurations.
What I need is a lightweight system running local or everywhere with a fast lightning search and easy to extend.

Why without [Create React App](https://github.com/facebook/create-react-app) ?

CRA is a quick way to get started with React development and it requires no build configuration.
But it completely hides the build config which makes it difficult to extend. In short it is a Black Box!
Another point is, we don't need all with CRA shipped packages.


### PIAs Future Tasks
- DOT.ENV Support ✔️
- ~~Initial setup process~~
- Build Process ✔️
- Vercel App Integration ✔️
- Electron Wrapper ( ? )
- ~~Octopart API Integration ( ? )~~
- OEMSecret API Integration ✔️
- BOM Imports ✔️
- Projects BOMs
- Dark Mode according OS Settings ✔️
- Github Login ✔️
- ~~Github Gists as DB~~
- Repository as Storage using [GitRows](https://github.com/gitrows/gitrows) ✔️


### Alternatives

- [Part-DB](https://github.com/Part-DB/Part-DB)
- [Partsbox](https://partsbox.com/)
- [Partkeepr](https://partkeepr.org/)
- [Bomist](https://bomist.com/)
- [Binner](https://github.com/replaysMike/Binner)
- [Applications using Octopart](https://octopart.com/api/app-gallery)

## Quick Start

```bash
# Clone the repository
$ git clone https://github.com/vlrmprjct/pia

# Go inside the directory
$ cd pia

# Install dependencies
$ yarn

# Start development server
$ yarn start

# Build for production
$ yarn build

```

## Documentation

### Authorization

The authorisation is quite simple by using Github as Authorisation provider. So no username and passwort is needed for using PIA.
Just a Github-Account is needed.

### Storage

We use [GitRows](https://github.com/gitrows/gitrows) as Data-Storage Provider.
Gitrows fetches data from a repository, whether is it `public` or `private`.

In our case, it is a **private repository**, so no one has access!

Test it: [PIA-Datebase](https://github.com/vlrmprjct/pia-database). You should get a `404` response.!
### ESLint

[We using Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript) which is used by many JavaScript developers worldwide. Since we are going to write both client (browser) and server side (Node.js) code, Optionally, we can override the Airbnb's configurations to suit our needs. I have turned off [**no-console**](https://eslint.org/docs/rules/no-console), [**comma-dangle**](https://eslint.org/docs/rules/comma-dangle) and [**react/jsx-filename-extension**](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) rules.

### Nodemon

Nodemon is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.

Below is the `nodemon.json` file which we using.

```javascript
{
  "watch": ["src/server/"],
  "delay": 500
}
```

Here, we tell nodemon to watch the files in the directory src/server where out server side code resides. Nodemon will restart the node server whenever a file under src/server directory is modified after a short delay.

### Express

Express is a web application framework for Node.js. It is used to build our backend API's.

`src/server/index.js` is the entry point to the server application. Below is the src/server/index.js file

### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. We using it to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm/yarn script commands used.

```javascript
        "start": "concurrently 'npm run start:client' 'npm run start:server' 'nodemon dist/server.js'",
        "start:client": "webpack-dev-server --config config/webpack.config.js --config-name client --env.development --hot",
        "start:server": "webpack --config config/webpack.config.js --config-name server --env.development --profile --watch"
```
