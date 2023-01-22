# FriendsHq

# WARNING: This repository is deprecated, and in read-only mode.
# Updated repository using Vue 3 can be found [here](https://github.com/looselytyped/web-apps-with-vue3)


This is an Vue.js 2+ application.
It attempts to demonstrate creating a simple web application using Vue.js.

The constructs that we see being employed in this demo are:

- Creating Vue.js components
- Creating component hierarchies
- `props` and custom events
- Smart vs. Dumb components
- Ajax using `axios`
- Routes, routing, and the `router-view`
- Forms using Vue.js
- Using the best practices for naming and project layout
- Unit/integration/e2e testing

This project also leverages [Vuetify](https://vuetifyjs.com/en/) for styling.

## Prerequisites

- Download and install `node` per [this](https://nodejs.org/en/download/)
  - This will install `npm` as well
- As an alternative to `npm` you can use `yarn`.
  If you choose to do so, you can find installation instructions [here](https://yarnpkg.com/en/)
- Vue CLI - You will find instructions [here](https://cli.vuejs.org/)

### Optional (but highly recommended)

- Install [Git](https://git-scm.com/downloads)
- Install [Visual Studio Code](https://code.visualstudio.com/)
  - Install [Vetur](https://github.com/vuejs/vetur)
  - Install the [EditorConfig extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - Intall the [Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
  - Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Install [Google Chrome](https://www.google.com/chrome/index.html)
  - Install the [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

## Getting started

First `git-clone` or [download]() this repository (Though it's preferred you clone)

Then open a terminal, `cd` to the directory where you cloned this repository.

**Make sure `node`/`npm` (or `yarn` if you have it installed) are in your path!**

```bash
npm install # or `yarn install`
```

## Running the app

Open **two** terminals.
In both `cd` to the directory where you cloned this repository.

**In the first one, run**

```bash
npm run server # or `yarn run server`
```

You should see something to the effect of

```
$ json-server --watch server/api/db.json

  \{^_^}/ hi!

  Loading server/api/db.json
  Done

  Resources
  http://localhost:3000/friends

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

**In the second terminal run**

```bash
npm serve # or `yarn serve`
```

Once the console is settled, visit [http://localhost:8080/](http://localhost:8080/) and you should see a `http://localhost:8080/` with a "Hello" message.

You are all set!

## Running the tests

**Replace `npm` with `yarn` if that is what you are using**

### Lints and fixes files

```bash
npm run lint
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Run your unit tests

```bash
npm run test:unit
```

Every once in a while it seems that Jest gets in a weird state, leading to errors that look like so:

```bash
 FAIL  tests/unit/Example.spec.js
  ● Test suite failed to run

    /Users/raju/Documents/presentations/2019/A-Vue-Perspective/friends-hq/tests/unit/Example.spec.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import "core-js/modules/es6.array.iterator";
                                                                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    SyntaxError: Unexpected string

      at ScriptTransformer._transformAndBuildScript (node_modules/jest-runtime/build/script_transformer.js:403:17)
```

At this point, try clearing the Jest cache like so:

```bash
./node_modules/jest/bin/jest.js --clearCache
```

And then run `test:unit` again.

## Navigating the source code

The best way to peruse the changes in this codebase is to follow the commit history.
Each commit has been deliberately designed to highlight one particular aspect in our exploration of Vue.js.

## Credits

This project is inspired by [Monica](https://github.com/monicahq/monica).