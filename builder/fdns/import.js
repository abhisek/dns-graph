"use strict";

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const readline = require('readline')
const process = require('process')
const psl = require('psl')

console.log("AAAAA: " + path.resolve(path.join(__dirname, 'node_modules')))

process.env.NODE_PATH = path.resolve(path.join(__dirname, 'node_modules'))
const db = require('../../db/graph')

let queuedCount = 0
let importCount = 0
let errorCount = 0

function updateStatus(msg) {
   process.stdout.clearLine()
   process.stdout.cursorTo(0)
   process.stdout.write(msg)
}

function updateStatusMsg() {
   updateStatus(`Running import job: [Queued:${queuedCount}] [Success:${importCount}] [Error:${errorCount}]`)
}

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

function onError(error) {
   errorCount += 1
   updateStatusMsg()
}

function onSuccess() {
   importCount += 1
   updateStatusMsg()
}

function handleRecord(recordLine) {
   let record
   let name
   let value
   let type
   
   try {
      record = JSON.parse(recordLine)
      name = record['name'].replace(/[\s#;\\]/g, '')
      value = record['value'].replace(/[\s#;\\]/g, '')
      type = record['type']
   } catch(ex) {
      console.log(`Failed to parse record: ${recordLine}`)
      return
   }

   let pslName = psl.parse(name)

   if (type == 'a') {
      db.addDomain(pslName.tld, pslName.domain).then(onSuccess).catch(onError)
      db.addSubDomain(pslName.domain, name).then(onSuccess).catch(onError)
      db.addHostIPv4(name, value).then(onSuccess).catch(onError)
   }
   else if (type == 'aaa') {
      db.addDomain(pslName.tld, pslName.domain).then(onSuccess).catch(onError)
      db.addSubDomain(pslName.domain, name).then(onSuccess).catch(onError)
      db.addHostIPv6(name, value).then(onSuccess).catch(onError)
   }
   else if (type == 'mx') {
      db.addDomain(pslName.tld, pslName.domain).then(onSuccess).catch(onError)
      db.addSubDomain(pslName.domain, name).then(onSuccess).catch(onError)
      db.addMX(name, value).then(onSuccess).catch(onError)
   }
   else if (type == 'ns') {
      db.addDomain(pslName.tld, pslName.domain).then(onSuccess).catch(onError)
      db.addSubDomain(pslName.domain, name).then(onSuccess).catch(onError)
      db.addNS(name, value).then(onSuccess).catch(onError)
   }

   queuedCount += 1
   updateStatusMsg()
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

   setTimeout(function() {}, 5000)
}
