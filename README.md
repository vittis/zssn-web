# ZSSN - Vítor Bichara

Foi utilizado o Create React App como ponto de partida da aplicação.

## Frameworks e ferramentas
### Desenvolvimento
* UI: [React](https://reactjs.org/)
* Controle de estado: [Redux]() para estado global e [React Hooks](https://reactjs.org/docs/hooks-intro.html) para estado local
* Estilos: [SASS](https://sass-lang.com/) e [Bootstrap 4](https://getbootstrap.com/) via [reactstrap](https://reactstrap.github.io/)
* Cliente HTTP: [Axios](https://github.com/axios/axios)
* Ícones: [FontAwesome](https://fontawesome.com/)

### Build
* Module bundler: [Webpack 4](https://webpack.js.org/)
* Transpilador ES6+: [Babel 7](https://babeljs.io/)

### Linter
* [ESlint](https://eslint.org/)
* [Prettier](https://github.com/prettier/prettier)

## Configuração e uso

Instale todas as dependências do projeto através do yarn (ou npm):

```sh
yarn
```

Pronto! Suba o ambiente executando:

```sh
yarn start
```

## Estrutura do projeto

* `src/` base de código da aplicação;
* `src/services/api` configuração e custom hooks para integração com api;
* `src/components` componentes separados em pastas com seus respectivos estilos (se houver) e index.js para importação default (facilita visualização no editor);
* `src/pages/` componentes de primeiro nível em relação ao router;
* `src/styles` usa a [arquitetura 7-1](https://sass-guidelin.es/#the-7-1-pattern) para organizar o código SASS.

## Comandos

```sh
# sobe a aplicação em modo de desenvolvimento
yarn start
# executa testes
yarn test
# executa build do projeto com assets comprimidos e prontos para produção
yarn build 
```