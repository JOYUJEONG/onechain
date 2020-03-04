"use strict";
import { boolean } from "random";

import { deepCopy, calculateMerkleRoot, getCurrentVersion, getCurrentTimestamp, SHA256, hexToBinary, deepEqual } from "./modules"; // utils
import { BlockHeader, Block } from "./modules"; // types
import { broadcast, responseLatestMsg } from "./modules"; // network

// TODO
function initBlockchain() {
    return getGenesisBlock();
}

/**
 * TODO: Use database to store the data permanently.
 * A current implemetation stores blockchain in local volatile memory.
 */
var blockchain = [initBlockchain()];

function getBlockchain() { return deepCopy(blockchain); }
function getLatestBlock() { return deepCopy(blockchain[blockchain.length - 1]); }

function generateRawBlock(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce, data) {
    const header = new BlockHeader(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce);
    return new Block(header, data);
}

function generateBlock(version, index, previousHash, timestamp, difficulty, nonce, data) {
    const merkleRoot = calculateMerkleRoot(data);
    return generateRawBlock(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce, data);
}

function getGenesisBlock() {
    const version = "1.0.0";
    const index = 0;
    const previousHash = '0'.repeat(64);
    const timestamp = 1231006505; // 01/03/2009 @ 6:15pm (UTC)
    const difficulty = 0;
    const nonce = 0;
    const data = ["The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"];

    return generateBlock(version, index, previousHash, timestamp, difficulty, nonce, data);
}

function generateNextBlock(blockData) {
    const previousBlock = getLatestBlock();

    const currentVersion = getCurrentVersion();
    const nextIndex = previousBlock.header.index + 1;
    const previousHash = previousBlock.hash();
    const nextTimestamp = getCurrentTimestamp();
    const merkleRoot = calculateMerkleRoot(blockData);
    const difficulty = getDifficulty(getBlockchain());
    const validNonce = findNonce(currentVersion, nextIndex, previousHash, nextTimestamp, merkleRoot, difficulty);

    return generateRawBlock(currentVersion, nextIndex, previousHash, nextTimestamp, merkleRoot, difficulty, validNonce, blockData);
}

function addBlock(newBlock) {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
        return true;
    }
    return false;
}

function mineBlock(blockData) {
    const newBlock = generateNextBlock(blockData);

    if (addBlock(newBlock)) {
        broadcast(responseLatestMsg());
        return newBlock;
    }
    else {
        return null; // TODO: undefined
    }
}

/**
 * TODO: Implement a stop mechanism.
 * A current implementation doesn't stop until finding matching block.
 */
function findNonce(version, index, previoushash, timestamp, merkleRoot, difficulty) {
    var nonce = 0;
    while (true) {
        var hash = SHA256([version, index, previoushash, timestamp, merkleRoot, difficulty, nonce]);
        if (hashMatchesDifficulty(hash, difficulty)) { return nonce; }
        nonce++;
    }
}

function hashMatchesDifficulty(hash, difficulty) {
    const hashBinary = hexToBinary(hash);
    const requiredPrefix = '0'.repeat(difficulty);
    return hashBinary.startsWith(requiredPrefix);
}

const BLOCK_GENERATION_INTERVAL = 10; // in seconds
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10; // in blocks

function getDifficulty(aBlockchain) {
    const latestBlock = aBlockchain[aBlockchain.length - 1];
    if (latestBlock.header.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.header.index !== 0) {
        return getAdjustedDifficulty(aBlockchain);
    }
    return latestBlock.header.difficulty;
}

function getAdjustedDifficulty(aBlockchain) {
    const latestBlock = aBlockchain[aBlockchain.length - 1];
    const prevAdjustmentBlock = aBlockchain[aBlockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    const timeTaken = latestBlock.header.timestamp - prevAdjustmentBlock.header.timestamp;
    const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;

    if (timeTaken < timeExpected / 2) {
        return prevAdjustmentBlock.header.difficulty + 1;
    }
    else if (timeTaken > timeExpected * 2) {
        return prevAdjustmentBlock.header.difficulty - 1;
    }
    else {
        return prevAdjustmentBlock.header.difficulty;
    }
}

function isValidBlockStructure(block) {
    return typeof (block.header.version) === 'string'
        && typeof (block.header.index) === 'number'
        && typeof (block.header.previousHash) === 'string'
        && typeof (block.header.timestamp) === 'number'
        && typeof (block.header.merkleRoot) === 'string'
        && typeof (block.header.difficulty) === 'number'
        && typeof (block.header.nonce) === 'number'
        && typeof (block.data) === 'object';
}

function isValidTimestamp(newBlock, previousBlock) {
    return (previousBlock.header.timestamp - 60 < newBlock.header.timestamp)
        && newBlock.header.timestamp - 60 < getCurrentTimestamp();
}

function isValidNewBlock(newBlock, previousBlock) {
    if (!isValidBlockStructure(newBlock)) {
        console.log("Invalid block structure: " + JSON.stringify(newBlock));
        return false;
    }
    else if (previousBlock.header.index + 1 !== newBlock.header.index) {
        console.log("Invalid index");
        return false;
    }
    else if (previousBlock.hash() !== newBlock.header.previousHash) {
        console.log("Invalid previousHash");
        return false;
    }
    else if (calculateMerkleRoot(newBlock.data) !== newBlock.header.merkleRoot) {
        console.log("Invalid merkleRoot");
        return false;
    }
    else if (!isValidTimestamp(newBlock, previousBlock)) {
        console.log('Invalid timestamp');
        return false;
    }
    else if (!hashMatchesDifficulty(newBlock.hash(), newBlock.header.difficulty)) {
        console.log("Invalid hash: " + newBlock.hash());
        return false;
    }
    return true;
}

function isValidChain(blockchainToValidate) {
    if (!deepEqual(blockchainToValidate[0], getGenesisBlock())) {
        return false;
    }
    var tempBlocks = [blockchainToValidate[0]];
    for (var i = 1; i < blockchainToValidate.length; i++) {
        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i]);
        }
        else { return false; }
    }
    return true;
}

function isReplaceNeeded(originalBlockchain, newBlockchain) {
    /**
     * TODO: the haviest chain rule.
     * The current implementation is the longest chain rule.
     */
    if (originalBlockchain.length < newBlockchain.length) { return true; }
    else if (originalBlockchain.length > newBlockchain.length) { return false; }
    else { return boolean(); }
}

function replaceChain(newBlockchain) {
    if (isReplaceNeeded(blockchain, newBlockchain) && isValidChain(newBlockchain)) {
        console.log("Received blockchain is valid. Replacing current blockchain with received blockchain");
        blockchain = newBlockchain;
        broadcast(responseLatestMsg());
    }
    else { console.log("Received blockchain invalid"); }
}

export default {
    getBlockchain,
    getLatestBlock,
    addBlock,
    mineBlock,
    replaceChain
};
