import fetch from "node-fetch";
globalThis.fetch = fetch;

/*const DATASETS = require('./tech-track-dataset.json')
console.log(DATASETS)*/

fetch("../tech-track-dataset.json")
.then(res => res.json())
.then(data => console.log(data))

  