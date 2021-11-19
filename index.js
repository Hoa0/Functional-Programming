// get the data
const DATA_SET = require('./tech-track-dataset.json')
const DATA_SAMPLE = require('./dataset-oefen.json')
const FETCH_PATH = require('cross-fetch')
const API = 'https://www.fruityvice.com/api/fruit/all'
// console.table(DATA_SAMPLE)

/**
 * antwoord van de vraag krijgen
 * @param {String} vraag
 * @returns
 */
function getValue (vraag) {
  const OBJECT = Object.assign({}, DATA_SET) // manipuleren van data
  return Object.entries(OBJECT).forEach(([key, value]) => {

    // geeft alle data
    // voor iedere object the key and value, antwoord van de vraag krijgen
    // console.log(`${key}, ${value[vraag]}`)
    // data in kleineletters
    // console.log(`${key}, ${CLEAN_LET_TOLOWER(value[vraag])}`)
  })
}

// getValue('Wat is je oogkleur?')
getValue('Wat wil je worden als je groot bent?')

/**
 * function die checkt of het een string is
 * @param {String} string
 * @returns kleine letters weergeven van de waardes
 */
const CLEAN_LET_TOLOWER = function cleaningLetters (string) {
  if (typeof string === 'string') {
    return string.toLowerCase()
  } else {
    return string
  }
}

/**
   * function die waarden gelijkwaardig maakt
   * @param {String} baan
   * @returns value 'front-end developer'
 */
const CLEAN_JOB = function cleanValueJob (baan) {
  const correctValue = 'front-end developer'
  switch (baan) {
    case 'frontend developer':
      return correctValue
    case 'webdeveloper / webdesigner':
      return correctValue
    case 'code designer':
      return correctValue
    case 'front-ender':
      return correctValue
    default:
      return baan
  }
}
// console.log(cleanValue('webdeveloper / webdesigner'))

/**
//  * zoek naar string symbolen en vervang het naar empty
 * @param {String} string ±!@#$%^&*()_+
 * @returns empty space
 */
const RM_SYMBOLS = function (string) {
  const REGEX = /[^A-Za-z0-9\s]/g
  // clean symbols, ? een snelle true or false (kijkt als de cond true is of false)
  return typeof string === 'string' ? string.replace(REGEX, '') : string
}

/**
 * empty space, lege ruimte vervangen naar empty
 * @param {String} string
 * @param {String} replacement
 * @returns "empty"
 */
const RM_EMPTY = function (string, replacement) {
  // return string === '' ? string = 'empty' : string
  return string === '' ? replacement : string
}

/**
 * mogelijk voor het manipuleren van data door een nieuwe array
 * @returns dataset
 */
function maakPromise () {
  // maakt nieuwe promise aan, stuurt deze terug met de dataset
  // en lost het op, promise == fulfilled
  return new Promise((resolve, reject) => {
    const dataset = DATA_SET
    resolve(dataset)
  })
}

/**
 * looping om vervolgens -> data weergeven
 */
maakPromise()
  .then(
    function (data) {
      // iedere element van een arrat
      return data.map((element) => {
        Object.keys(element).forEach(key => {
          // element[key] = cleanValueJob(cleaningLetters(element[key])),
          element[key] = CLEAN_LET_TOLOWER(element[key])
          element[key] = CLEAN_JOB(element[key])
          element[key] = RM_EMPTY(element[key])
          element[key] = RM_SYMBOLS(element[key])
        })
        return element
      })
    }
  )
/* .then(opgeschoondeData => {
    console.log(opgeschoondeData)
  })
.catch((e) => console.error(e))
.finally(console.log('finished cleaning')) */

/**
 * function naar het url path, met fetch async
 * response -> haalt promise op en resolve het
 * @param {String} URL
 * @returns het url path naar de API
 */
const GET_DATA_FETCH = async function (URL) {
  try {
    const RESPONSE = await FETCH_PATH(URL)
    return RESPONSE.json()
  } catch (error) {
    console.error(error)
  }
}

// read data
/**
 * function waarmee objecten opgeschoond worden van API
 * @param {JSON} data
 * @returns clean json object
 */
const GET_FRUIT = async function (data) {
  const x = await data
  // data opschonen, api
  x.map(
    element => {
      Object.keys(element).forEach(key => {
        element[key] = CLEAN_LET_TOLOWER(element[key])
        element[key] = RM_EMPTY(element[key])
        element[key] = RM_SYMBOLS(element[key])
      })
      return element
    })
  console.log(await x)
  return x
}

GET_FRUIT(GET_DATA_FETCH(API))
