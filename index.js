'use strict';

const diip = (a, b) => {
    const diff = (original, successor) => {
        // get types
        let originalType = Object.prototype.toString.call(original);
        let successorType = Object.prototype.toString.call(successor);
        // reject when different types
        if (originalType !== successorType) {
            return false;
        }
        // functions are never considered equal
        if (originalType === '[object Function]') {
            return false;
        }
        // compare two objects or arrays
        if (originalType === '[object Object]' || originalType === '[object Array]') {
            let keys = Object.keys(original);
            let newKeys = Object.keys(successor);
            // creating union of both arrays of keys
            if (originalType === '[object Array]') {
                let lengthDifference = newKeys.length - keys.length;
                if (lengthDifference > 0) {
                    for (let i = lengthDifference; i > 0; --i) {
                        keys.push(newKeys[newKeys.length - i]);
                    }
                }
            } else {
                let keysObj = {};
                keys.forEach((key) => {
                    keysObj[key] = true;
                });
                newKeys.forEach((key) => {
                    if (!keysObj[key]) {
                        keys.push(key);
                    }
                });
            }
            return keys.reduce((accumulator, key) => {
                let temp = diff(original[key], successor[key]);
                if (temp !== true) {
                    if (typeof accumulator === 'boolean') {
                        accumulator = [];
                    }
                    if (temp === false) {
                        accumulator.push([key]);
                    } else {
                        temp.forEach((current) => {
                            current.unshift(key);
                            accumulator.push(current);
                        });
                    }
                }
                return accumulator;
            }, true);
        }
        // compare primitive types
        return original === successor;
    };
    let result = diff(a, b);
    if (result === true) {
        return null;
    } else if (result === false) {
        return [[]];
    }
    return result;
};

module.exports = diip;
