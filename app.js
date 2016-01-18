"use strict";

var http = require('http');
var https = require('https');
var fs = require('fs');

function httpGet(url) {
  return new Promise(function (resolve, reject) {
    var proto = http;
    if (url.startsWith('https')) {
      proto = https;
    }
    proto.get(url, function(res) {
      var body = '';
      res.on('data', function(data){
        body += data;
      });
      res.on('end', function() {
        resolve(body);
      });
    })
    .on('error', function(e) {
      reject(e);
    });
  });
}

function downloadFile(filename, url) {
  return new Promise(function (resolve, reject) {
    var file = fs.createWriteStream(filename);
    http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    })
    .on('error', function(e) {
      if (fs.exists(filename)) {
        fs.unlink(filename);
      }
      reject(e);
    });
  });
}

exports.get = httpGet;
exports.downloadFile = downloadFile;