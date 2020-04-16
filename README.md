#  kiosk-admin

## :arrow_up: How to Setup

**Step 1:** git clone this repository: `git clone [repo_url]`

**Step 2:** cd to the cloned repository: `cd webapp`

**Step 3:** Install the Application with `yarn`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run & Build
  * Run
    * Run `yarn start`
    * View app on http://localhost:3000/
  * Build
    * Run `yarn build`
    * View `build` folder in the repository

## :closed_lock_with_key: Secrets

API keys and other sensitive information are shared privately and stored in a .env.[environment] file.

Example file: `.env.sample`
```
REACT_APP_API_URL=https://myapi.com
REACT_APP_API_KEY=abc12345
```

and access them from React app like so:

```
process.env.REACT_APP_API_URL
process.env.REACT_APP_API_KEY
```

The `.env.[environment]` file is ignored by git keeping those secrets out of the repository.

## Run Storybook

* Run `yarn storybook`
* View storybook page on http://localhost:6006/

## Frontend Technical Stack
This is the list of important technologies that would be used to implement the project.

### Technical stack

#### Languages

**HTML5**
Hypertext Markup Language revision 5 (HTML5) is a markup language for the structure and presentation of World Wide Web contents. HTML5 supports the traditional HTML and XHTML-style syntax and other new features in its markup, New APIs, XHTML and error handling.

**CSS3**
A cascading style sheet (CSS) is a Web page derived from multiple sources with a defined order of precedence where the definitions of any style element conflict.

**SASS**
- Sass (Syntactically Awesome Stylesheets) is a style sheet language.
- Homepage: http://sass-lang.com

**JavaScript**
- An object-oriented computer programming language commonly used to create interactive effects within web browsers.
- ECMAScript 2015 is an ECMAScript standard that was ratified in June 2015. ES2015 is a significant update to the language, and the first major update to the language since ES5 was standardized in 2009.

#### Tools & Libraries

**React**
- A JavaScript library for building user interface.
- Homepage: https://facebook.github.io/react

**Redux** - [http://redux.js.org](http://redux.js.org/). Redux is a predictable state container for JavaScript apps.

**ReduxSauce** - [https://github.com/jkeam/reduxsauce](https://github.com/jkeam/reduxsauce). Provides a few tools for working with Redux-based code bases.

**Redux persist** - [https://github.com/rt2zz/redux-persist](https://github.com/rt2zz/redux-persist). Using Redux-Persist to Store Your State in LocalStorage

**ImmutableJS** - [https://facebook.github.io/immutable-js](https://facebook.github.io/immutable-js). Immutable collections for JavaScript.

**Apisauce** - [https://github.com/skellock/apisauce](https://github.com/skellock/apisauce). A JSON API client for JavaScript.

**Redux Saga** - [https://github.com/redux-saga/redux-saga](https://github.com/redux-saga/redux-saga). Is a library that aims to make side effects. It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write & test.


**Webpack**
- Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.
- Homepage: https://webpack.github.io
- Plugins
  - **Webpack Dev Middleware**
    - The webpack-dev-middleware is a small middleware for a connect-based middleware stack. It uses webpack to compile assets in-memory and serve them. When a compilation is running every request to the served webpack assets is blocked until we have a stable bundle.
    - Homepage: https://github.com/webpack/webpack-dev-middleware
  - **TerserWebpackPlugin**
    - Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
    - Homepage: https://webpack.js.org/plugins/terser-webpack-plugin/
- Loaders
  - **Sass**
    - CSS loader for Webpack
    - Homepage: https://github.com/jtangelder/sass-loader
  - **CSS**
    - SASS loader for Webpack
    - Homepage: https://github.com/webpack-contrib/css-loader
  - **ESLint**
    - The pluggable linting utility for JavaScript and JSX
    - Homepage: https://github.com/eslint/eslint
  - **File**
    - File loader for Webpack
    - Homepage: https://github.com/webpack-contrib/file-loader
  - **Style**
    - Style loader for Webpack
    - Homepage: https://github.com/webpack-contrib/style-loader

**Flow**
- Is a Static Type Checker for JavaScript.
- Homepage: https://flow.org

**Storybook**
- Is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.
- Homepage: https://storybook.js.org

**React-router**
- Declarative routing for React.
- Homepage: https://github.com/ReactTraining/react-router

**Husky**
- Husky can prevent bad git commit, git push.
- Homepage: https://github.com/typicode/husky

**Prettier**
- Prettier is an opinionated code formatter
- Homepage: https://prettier.io
