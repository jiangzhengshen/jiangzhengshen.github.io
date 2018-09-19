const fs = require('fs');
const path = require('path');

function listFiles(foldPath, results) {
    var files = fs.readdirSync(foldPath);
    for (var i = 0; i < files.length; i++) {
        var file = path.join(foldPath, files[i]);
        var stat = fs.statSync(file);
        if (stat.isDirectory() == true) {
            listFiles(file, results);
        } else if (stat.isFile()) {
            var content = JSON.parse(fs.readFileSync(file, 'utf-8')).content;
            var meta = content.match(/^---+\r\n([.\s\S]+)\r\n---+/);
            var meta_list = meta[1].split("\r\n");

            var tmpRes = {};
            meta_list.forEach(element => {
                words = element.split(/:\s*/);
                if (words[0] == "tags") {
                    tmpRes[words[0]] = words[1].split(/,\s*/);
                }
                else {
                    tmpRes[words[0]] = words[1];
                }
            });
            tmpRes["id"] = files[i].split('.')[0];
            results.push(tmpRes);
        }
    }
}

function keysort(key) {
    return function (a, b) {
        return a[key] < b[key];
    }
}

function md2json(foldPath, outputDir) {
    var files = fs.readdirSync(foldPath);
    for (var i = 0; i < files.length; i++) {
        var file = path.join(foldPath, files[i]);
        var stat = fs.statSync(file);
        if (stat.isDirectory() == true) {
            md2json(file, outputDir);
        } else if (stat.isFile()) {
            var content = fs.readFileSync(file, 'utf-8');
            fs.writeFileSync(path.join(outputDir, files[i].split('.')[0] + '.json'), JSON.stringify({ "content": content }));
        }
    }
}

md2json('./_post/', './static/post/');

var results = [];
listFiles('./static/post/', results);
var final = {
    "results": results.sort(keysort('published'))
}
fs.writeFileSync('./static/feed.json', JSON.stringify(final));

function readFold(foldPath) {
    var results = [];

    fs.readdir(foldPath, function (err, files) {
        if (err) {
            log(err);
            return false;
        }
        files.forEach(function (fileName) {
            var filePath = path.join(foldPath, fileName);
            fs.stat(filePath, function (err, stats) {
                if (err) {
                    log(err);
                    return false;
                }
                if (stats.isDirectory()) {
                    readFold(filePath);
                }
                if (stats.isFile()) {
                    fs.readFile(filePath, 'utf-8', function (error, content) {
                        if (error) {
                            log(error);
                        } else {
                            var meta = content.match(/^---+\r\n([.\s\S]+)\r\n---+/);
                            var meta_list = meta[1].split("\r\n");

                            var tmpRes = {};
                            meta_list.forEach(element => {
                                words = element.split(/:\s*/);
                                tmpRes[words[0]] = words[1];
                            });
                            results.push(tmpRes);
                        }
                    });
                }
            });
        });
    });

    return results;
}

// console.log(readFold('./static/post/'));
