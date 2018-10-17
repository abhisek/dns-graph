"use strict";

const fs = require('fs')
const zlib = require('zlib')
const readline = require('readline')
const process = require('process')

// https://stackoverflow.com/questions/38074288/read-gzip-stream-line-by-line
function forEachRecord(source, cb) {
   let lineReader = readline.createInterface({
      input: fs.createReadStream(source).pipe(zlib.createGunzip())
   })

   lineReader.on('line', (line) => {
      cb(line)
   })

   lineReader.on('close', () => {
      console.log('Finished processing file')
   })
}

function handleRecord(recordLine) {
   console.log(`Got line: ${recordLine}`)
}

if (process.mainModule.filename === __filename) {
   let sourceFile = process.env.FDNS_DATASET_FILE

   if (!sourceFile) {
      console.error('No file to import. Specify environment variable FDNS_DATASET_FILE')
      process.exit()
   }

   if (!fs.existsSync(sourceFile)) {
      console.error('Source file not found')
      process.exit()
   }

   console.log(`Starting FDNS dataset import from: ${sourceFile}`)
   forEachRecord(sourceFile, handleRecord)
}
