[[:us: | English | 영어]](https://github.com/twodude/onechain)
[[:kr: | Korean | 한국어]](https://github.com/twodude/onechain/tree/korean)

---

[![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![version](https://img.shields.io/badge/version-v2.2.2-orange.svg)](https://github.com/twodude/onechain/blob/master/package.json)
[![node](https://img.shields.io/badge/node-%3E%3D4.3.2-yellow.svg)](https://nodejs.org/en/)   

# one-chain
minimal blockchain ever.   

<!--
![onechain](https://github.com/twodude/onechain/blob/master/images/icon.png)
-->

Assist you to easily develop blockchain core.
> [2018 OSS Grand Developers Challenge Award](https://project.oss.kr)   
> Based on the following code: [lhartikk/naivechain](https://github.com/lhartikk/naivechain)   

## Abstract
![structure](https://github.com/twodude/onechain/blob/master/images/structure.png)

As Blockchain-based services grew, so open source that assists developing blockchain core was needed.
There are open source projects like Bitcoin and Ethereum, but those are too hard to learn and to use.

You can solve the above problems with
**```one-chain```, simple implementation of blockchain core.**
The one-chain adopts modular design: Dividing layers into blockchain, network, APIs, and wallet for clarity.
In addition, detailed comments and documents are provided to facilitate learning and reusing.

Both front-end and back-end of one-chain is written in Javascript (Node.js and Vue.js) but written in simple (without async, etc.) so that other language developers can understand them.

## Use-cases

* 📖 컴퓨터과학으로 배우는 블록체인 원리와 구현
  - [Chapter-1](https://github.com/twodude/onechain/tree/chapter-1)
  - [Chapter-2](https://github.com/twodude/onechain/tree/chapter-2)
  - [Chapter-3](https://github.com/twodude/onechain/tree/chapter-3)
  - [Chapter-4](https://github.com/twodude/onechain/tree/chapter-4)

<p align="center">
  <a href="http://www.yes24.com/Product/Goods/75235536">
    <img width="480" src="https://github.com/twodude/onechain/blob/master/images/book.jpeg">
  </a>
</p>

> Click on the image above to go to the mall where you can buy.

* Governance Simulator on Blockchain : Based on Smart City Cases
  - [Paper](http://www.dbpia.co.kr/Journal/ArticleDetail/NODE07614082)

* Blockchain Policy Simulator
  - [BBR Hackathon](http://www.breview.kr) [Excellence Award](http://decenter.sedaily.com/NewsView/1S639FV540)
  - [Video Demonstration](https://www.youtube.com/watch?v=aFcnPziT4FE)
  - [Code](https://github.com/twodude/blockchain-simulator)
  
* edu-chain
  - [Code](https://github.com/twodude/educhain)   

* Plasma DAG
  - [Code](https://github.com/plasma-dag/plasma-client)

<!--
* Noonsatae
  - [Avalanche Implementation](https://github.com/noonsatae)
-->

# How to Start

## Environments
- Node.js v8.11.3
- cURL 7.55.1 *or* Postman v6.4.4

## Install dependencies
```bash
npm install
```
## Run Nodes

### Start node #1
```bash
npm start
```

### Start node #2

* Set `HTTP_PORT` for HTTP communication

  ```$env:HTTP_PORT=3002```
  *or*
  ```export HTTP_PORT=3002```

* Set `P2P_PORT` for P2P communication among peers

  ```$env:P2P_PORT=6002```
  *or*
  ```export P2P_PORT=6002```

* (*option*) Set pre-connected `PEERS` before running

  ```$env:PEERS="ws://127.0.0.1:6001[, ws://127.0.0.1:6003, ...]"```
  *or*
  ```export PEERS="ws://127.0.0.1:6001[, ws://127.0.0.1:6003, ...]"```

* (*option*) Set `PRIVATE_KEY` where private_key is located

  ```$env:PRIVATE_KEY="second"```
  *or*
  ```export PRIVATE_KEY="second"```

  Now private_key is located in `./wallet/second/` instead of default location `./wallet/default/`.

```bash
npm start
```

# How to Use

<p align="center">
  <a href="https://youtu.be/uBeUTRtgGxI">
    <img width="480" src="https://img.youtube.com/vi/uBeUTRtgGxI/0.jpg">
  </a>
</p>

> Click on the image above to play the video.

### Get blockchain
```bash
curl http://127.0.0.1:3001/blocks
```

You can use 'pretty-print JSON' for better readability:
```bash
curl http://127.0.0.1:3001/blocks | python -m json.tool
```
Python >= 2.6 is required.

### Get a particular block
```bash
curl http://127.0.0.1:3001/block/:number
```

For example, let's get a block whose number (index) is 3:

```bash
curl http://127.0.0.1:3001/block/3
```

### Add new block
```bash
curl -X POST http://127.0.0.1:3001/mineBlock
curl -H "Content-type:application/json" --data "{\"data\" : [\"Anything you want\", \"Anything you need\"]}" http://127.0.0.1:3001/mineBlock
```

### Get current version
```bash
curl http://127.0.0.1:3001/version
```

### Get the version of particular block
```bash
curl http://127.0.0.1:3001/blockVersion/:number
```

For example, let's get a version of a block whose number (index) is 3:

```bash
curl http://127.0.0.1:3001/blockVersion/3
```

### Get connected peer(s)
```bash
curl http://127.0.0.1:3001/peers
```

### Add peer(s)
```bash
curl -H "Content-type:application/json" --data "{\"peers\" : [\"ws://127.0.0.1:6002\", \"ws://127.0.0.1:6003\"]}" http://127.0.0.1:3001/addPeers
```

### Get Address
```bash
curl http://127.0.0.1:3001/address
```

### Stop
```bash
curl -X POST http://127.0.0.1:3001/stop
```

# one-chain explorer
![explorer](https://github.com/twodude/onechain/blob/master/images/explorer.png)

**`one-chain explorer`** is the front-end used to visualize the state of the blockchain. This blockchain explore allows you to see the latest blocks and details about a particular block.

As you know, one-chain already has multiple functions with HTTP (RESTful API) endpoints. So the web page calls those endpoints and visualizes the results.

The full UI code is located in `./explorer/`. Vue.js and Vuetify are used.

# How to Start
```bash
cd explorer
npm install
```

## Run

**Requirements:** there must be at least one running node whose `HTTP_PORT` is `3001`.

```bash
npm run serve
```

The app now runs on http://localhost:8080/ by default. Using 'Chrome browser' is recommended.

# How to Use

* You can search a particular block by block number. Type in the search bar or click the `BLOCK #N` button.

* Turn on the 'Realtime Updates' switch at the top of page to get the blockchain in real-time. It will send a `/blocks` GET request to the full-node to get a blockchain in every 2 seconds.

# License
The one-chain project is licensed under the [Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0), also included in our repository in the [LICENSE](https://github.com/twodude/onechain/blob/master/LICENSE) file.
