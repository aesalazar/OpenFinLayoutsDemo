var fs = require('fs');
var browserify = require('browserify');

//index.js
var wIndex = require('watchify');

var bIndex = browserify({
    entries: ['./server/index.js'],
    cache: {},
    packageCache: {},
    plugin: [wIndex],
    debug: true
});

bIndex.on('log', function (msg) {
    console.log(`browerify index: ${msg}`);
});

bIndex.on('error', function (msg) {
    console.error(`browerify index: ${msg}`);
});

bIndex.on('update', bundleIndex);
bundleIndex();

function bundleIndex() {
    bIndex.bundle().pipe(fs.createWriteStream('./public/js/index.js'));
}

//child.js
var wChild = require('watchify');

var bChild = browserify({
    entries: ['./server/child.js'],
    cache: {},
    packageCache: {},
    plugin: [wChild],
    debug: true
});

bChild.on('log', function (msg) {
    console.log(`browerify child: ${msg}`);
});

bChild.on('error', function (msg) {
    console.error(`browerify child: ${msg}`);
});

bChild.on('update', bundleChild);
bundleChild();

function bundleChild() {
    bChild.bundle().pipe(fs.createWriteStream('./public/js/child.js'));
}