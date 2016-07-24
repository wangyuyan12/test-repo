const thrift = require('thrift')
const entry_types = require('../../../thrift/lib/gen-nodejs/entry_types')
const EyaosRPC = require('../../../thrift/lib/gen-nodejs/EyaosRPC')

const conn = thrift.createConnection('localhost', 9090)

// var client = thrift.Multiplexer.createClient('EyaosRPC', EyaosRPC, conn)
var mul = new thrift.Multiplexer()

var client = mul.createClient('EyaosRPC', EyaosRPC, conn)
console.dir(client)
conn.end()