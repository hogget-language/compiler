# Hogget compiler

[![Build Status](https://travis-ci.org/hogget-language/compiler.svg?branch=master)](https://travis-ci.org/hogget-language/compiler)

## Installation

Requires Node.js v4 or higher. This package has no dependencies.

```sh
npm install hogget --global
hgg --version
```

## Compiling

The Hogget compiler needs an input and output to run. To run from the terminal:

```sh
hgg --input program.hgg --output program.hgg.js
```

or, more concisely:

```sh
hgg -i program.hgg -o program.hgg.js
```

To run programatically from Node.js:

```js
import hogget from 'hogget'
const hoggetString = "log('the answer is ' add(12 30))"
console.log(hogget(hoggetString))
```

The [hogget](https://www.npmjs.com/package/hogget) package also exports a `parse` and an `execute` method.

## Interpreter mode: compile + evaluate

To run from the terminal, either the `--evaluate` or `-e` option must be used:

```sh
hgg --evaluate --input program.hgg
```

To run programatically from Node.js:

```js
import { execute } from 'hogget'
const hoggetString = "log('the answer is ' add(12 30))"
execute(hoggetString)
```

## Linting

To run from the terminal, either the `--lint` or `-l` option must be used:

```sh
hgg --lint --input program.hgg
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
hgg --format --input program.hgg --output program.hgg
```

To run programatically from Node.js:

```js
import { format } from 'hogget'
const hoggetString = 'let myAdd = (a b) => { let result = add(a b); result; };'
console.log(format(hoggetString))
```
