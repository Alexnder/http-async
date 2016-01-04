# http-async
node.js es6 http wrapper

## Install
`npm install --save https://github.com/Alexnder/http-async.git`

## Usage
```
var httpAsync = require('http-async');

httpAsync.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0")
.then(function(data) {
  return JSON.parse(data);
})
.then(function(result) {
  console.log(result.name, result.main.temp);
});

httpAsync.downloadFile("result.json", "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0");
```