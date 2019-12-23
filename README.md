# Zombie Survival Social Network - Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

API repo: [https://github.com/vittis/zssn-api](https://github.com/vittis/zssn-api)

## Tech Stack
### Devlopment
* UI: [React](https://reactjs.org/)
* State Control: [Redux](https://redux.js.org/) for global state e [React Hooks](https://reactjs.org/docs/hooks-intro.html) for local state
* Styling: [SASS](https://sass-lang.com/) and [Bootstrap 4](https://getbootstrap.com/) powered by [reactstrap](https://reactstrap.github.io/)
* HTTP Client: [Axios](https://github.com/axios/axios)
* Icons: [FontAwesome](https://fontawesome.com/)
* Form Control: [Formik](https://jaredpalmer.com/formik/docs/overview)
* [Typescript](https://www.typescriptlang.org/)

### Linter
* [ESlint](https://eslint.org/)
* [Prettier](https://github.com/prettier/prettier)

## Usage

Install dependencies:

```sh
yarn (or npm i)
```

Done! Start the service:

```sh
yarn start
```

## Project Structure

* `src/` code base;
* `src/services/api` config and custom hook for data fetch;
* `src/components` components isolated with its styling (if any) and index.ts for easier import and editor visualization;
* `src/pages/` first level router components;
* `src/styles` uses the [7-1 architecture](https://sass-guidelin.es/#the-7-1-pattern) to organize SASS code.

## Comandos

```sh
# run the app
yarn start
# run test
yarn test
# build static assets
yarn build 
```