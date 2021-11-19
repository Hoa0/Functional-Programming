// get the data
const data = require("./dataset-oefen.json");

//function for promise for looping, change data
function procesData(){
	return new Promise ((resolve, reject)=>{ 
		let dataPromise = data;
		resolve(dataPromise);
	})
}

//cleaning data
function cleaningLetters(string){ 
	if (typeof string === "string"){ 
		return string.toLowerCase() 
	}
	else{
		return string
	}
}
console.log(cleaningLetters())

//get value
function getData(key, value){
return data[key][value]
}
console.log(getData(0,"Wat is je favoriete soort huisdier?"))

// looping
procesData()
	.then((data) => {
		return data.map(object =>{

		})
	})

