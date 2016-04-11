[![NPM Version](https://img.shields.io/npm/v/middleman-middleware.svg)](https://www.npmjs.com/package/middleman-middleware)

# Middleman Middleware

This middleware will create a mirror of a given URL response and inject given CSS and JS into the response.

*This can be used with express or any other accepting HTTP server*

### Installation

`npm install middleman-middleware`

### Example Usage with Express:

```js
var express = require('express');
var middlemanMiddleware = require('middleman-middleware');

var app = express();

app.use(middlemanMiddleware({
  url: 'http://www.reddit.com',
  css: 'body{background-color: red;}',
  js: 'alert("hi reddit");'
}));

app.listen(3000);
```
