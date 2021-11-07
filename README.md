# Git Linter2
## Git commit standard

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Git Linter is simple package that make sure to prevent any commit that is not matching the Conventional Commits, run unit test before commiting and run eslint or add it if it is not exist

## Features

- Force git commit to follow Conventional Commits.
- Add eslint to package.json if it's not exist.
- Run Unit test before accept the commit to make sure to not push broken code.
- Run eslint -fix or the existing eslint command to make sure that all developers have same code base.



## Tech

Git linter uses the following to work properly:
- [node.js] - to run bash command.
- [Git hooks] - to trigger pre-commit hook and msg-commit hook

And of course Git linter itself is open source with a [public repository]
 on GitHub.

## Installation

Git linter requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd [project-name]
npm install git-linter2
```
## Licence
ISC
