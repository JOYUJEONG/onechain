'use strict';
import { cloneDeep } from "lodash";
import { SHA256 as _SHA256 } from "crypto-js";
import merkle from "merkle";
import { readFileSync } from "fs";

function deepCopy(src) {
    return cloneDeep(src);
}

function deepEqual(value, other) {
    // return _.isEqual(value, other); // Can not get rid of functions.
    return JSON.stringify(value) === JSON.stringify(other);
}

/**
 * TODO: mkdir
 * Recursively make directories by tokenizing with '/'.
 */

/**
 * TODO: crypto.js
 * SHA256, merkles, et al.
 */
function SHA256(elems) {
    return _SHA256(elems.reduce(function (acc, elem) {
        return acc + elem;
    })).toString().toUpperCase();
}

function calculateMerkleTree(data) {
    return merkle("sha256").sync(data);
}

function calculateMerkleRoot(data) {
    const merkleTree = calculateMerkleTree(data);
    const merkleRoot = merkleTree.root() || '0'.repeat(64);
    return merkleRoot;
}

function hexToBinary(s) {
    const lookupTable = {
        '0': '0000', '1': '0001', '2': '0010', '3': '0011',
        '4': '0100', '5': '0101', '6': '0110', '7': '0111',
        '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
        'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
    };

    var ret = "";
    for (var i = 0; i < s.length; i++) {
        if (lookupTable[s[i]]) { ret += lookupTable[s[i]]; }
        else { return null; }
    }
    return ret;
}

function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000);
}

function getCurrentVersion() {
    const packageJson = readFileSync("./package.json");
    const currentVersion = JSON.parse(packageJson).version;
    return currentVersion;
}

export default {
    deepCopy,
    deepEqual,
    SHA256,
    calculateMerkleTree,
    calculateMerkleRoot,
    hexToBinary,
    getCurrentTimestamp,
    getCurrentVersion
};
