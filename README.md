# diip

> Tool to find deep differences between two input arguments

Returns an array of the addresses of each difference or null if they are deeply equal.

## Install

````
$ npm install --save diip
````

## Usage

````javascript
const diip = require('diip');

diip(0, 0); // null

diip([{a: 0}, {b: [0, 1, 2]}],
     [{a: 0}, {b: [0, 1, 2]}]); // null

diip([{a: 0}, {b: [null, 1, 2]}],
     [{a: true}, {b: [0, 1, 2]}]); // [['0', 'a'], ['1', 'b', '0']]
````