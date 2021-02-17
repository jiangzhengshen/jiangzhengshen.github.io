var fs = require('fs');
var path = require('path');
var loaderUtils = require('loader-utils');
var isFunction = require('lodash/isfunction');
var isRegExp = require('lodash/isregexp');
var MarkdownIt = require('markdown-it');
var MarkdownItKatex = require('markdown-it-katex');

/**
 * Refer to https://github.com/kmalakoff/fs-loader/blob/fa6f4470223f85d0889ce3d654050bd6ab29cc3d/index.js#L17
 */
function isSelected(filter, name, fullPath) {
    // console.log(filter, name, fullPath);
    if (!filter) return true;
    if (isRegExp(filter)) return filter.test(name);
    if (isFunction(filter)) return filter(name, fullPath);
    return true;
}

function listFiles(foldPath, filter, dirFilter) {
    var results = [];
    var files = fs.readdirSync(foldPath);
    for (var i = 0; i < files.length; i++) {
        var file = path.join(foldPath, files[i]);
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            if (!isSelected(dirFilter, files[i], file)) 
                continue;

            var dir_results = listFiles(file, filter, dirFilter);
            if (dir_results && dir_results.length > 0) {
                results.push(...dir_results);
            }
        } else if (stat.isFile()) {
            if (!isSelected(filter, files[i], file))
                continue;

            var content = fs.readFileSync(file, 'utf-8');
            var meta = content.match(/^---+\r\n([.\s\S]+)\r\n---+\r\n\r\n([.\s\S]*)/);
            var meta_list = meta[1].split("\r\n");
            var body = meta[2];

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
            tmpRes["body"] = body;

            results.push(tmpRes);
        }
    }
    return results;
}

module.exports = function (source) {
    var params = loaderUtils.getOptions(this) || {};
    var includeBody = params.includeBody ? true : false;

    var options = this.exec(source, this.resource);

    var required = ['path'];
    for (var i = 0; i < required.length; i++) {
        var k = required[i];
        if (!options[k])
            throw new Error("The option " + k + " is required");
    }

    var post_path = path.join(path.resolve(__dirname), '..', options.path);
    var results = listFiles(post_path, options.filter, options.dirFilter);

    var md = new MarkdownIt();
    md.use(MarkdownItKatex);
    results.forEach(function (element) {
        var desc_html = md.render(element["description"]);
        element["description"] = desc_html;
        if (includeBody) {
            var html = md.render(element["body"]);
            element["body"] = html;
        }
        else {
            element["body"] = "";
        }
    });
    console.log(results);

    const json = JSON.stringify(results)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    return `export default ${json};`;
    // return `module.exports = ${json};`;
};
