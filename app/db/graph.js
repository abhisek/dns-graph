"use strict";

const process = require('process')
const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('bolt://192.168.1.201', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
const session = driver.session()

function addDomain (tld, domain) {
   return session.run(`
      MERGE (a:Tld { name: $tld })
      MERGE (b:Domain { name: $domain })
      MERGE (a)-[:TLD_OF]->(b)
   `, { tld, domain })
}

function addNS (domain, nameserver) {
   return session.run(`
      MERGE (a:Domain { name: $domain })
      MERGE (b:Host { name: $nameserver })
      MERGE (a)-[:NS_RECORD]->(b)
   `, { domain, nameserver })
}

function addMX (domain, host) {
   return session.run(`
      MERGE (a:Domain { name: $domain })
      MERGE (b:Host { name: $host })
      MERGE (a)-[:MX_RECORD]->(b)
   `, { domain, host })
}

function addSubDomain (domain, host) {
   return session.run(`
      MERGE (a:Domain { name: $domain })
      MERGE (b:Host { name: $host })
      MERGE (a)-[:HAS_SUBDOMAIN]->(b)
   `, { domain, host })
}

function addHostIPv4 (host, addr) {
   return session.run(`
      MERGE (a:Host { name: $host })
      MERGE (b:IPv4 { name: $addr })
      MERGE (a)-[:RESOLVES_TO]->(b)
   `, { host, addr })
}

function addHostIPv6 (host, addr) {
   return session.run(`
      MERGE (a:Host { name: $host })
      MERGE (b:IPv6 { name: $addr })
      MERGE (a)-[:RESOLVES_TO]->(b)
   `, { host, addr })
}

function addTXT (host, txt) {
   return session.run(`
      MERGE (a:Host { name: $host })
      MERGE (b:TXT { name: $txt })
      MERGE (a)-[:TXT_RECORD]->(b)
   `)
}

module.exports = {
   addDomain,
   addNS,
   addMX,
   addSubDomain,
   addHostIPv4,
   addHostIPv6
}