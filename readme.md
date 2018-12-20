# Hogget compiler

## Installation

Requires Node.js v10 or higher. This package has no dependencies.

```sh
npm install hogget --global
hogget --version
```

## Compiling

The Hogget compiler needs an input and output to run. To run from the terminal:

```sh
hogget --input program.hgg --output program.hgg.js
```

or, more concisely:

```sh
hogget -i program.hgg -o program.hgg.js
```

To run programatically from Node.js:

```js
import hogget from 'hogget'
const hoggetString = "log('the answer is' add(12 30))"
console.log(hogget(hoggetString))
```

The [hogget](https://www.npmjs.com/package/hogget) package also exports a `parse` and an `execute` method.

## Linting

To run from the terminal, either the `--lint` or `-l` option must be used:

```sh
hogget --lint --input program.hgg
```

To run programatically from Node.js:

```js
import { lint } from 'hogget'
const hoggetString = 'let myAdd = (a b) => { let result = add(a b); result; };'
console.log(lint(hoggetString))
```

## Formatting

To run from the terminal, either the `--format` or `-f` option must be used:

```sh
hogget --format --input program.hgg
```

To run programatically from Node.js:

```js
import { format } from 'hogget'
const hoggetString = 'let myAdd = (a b) => { let result = add(a b); result; };'
console.log(format(hoggetString))
```
