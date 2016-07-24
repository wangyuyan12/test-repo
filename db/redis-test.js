'use strict'

const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)
let client = redis.createClient()

client.on('error', function(err) {
	console.log("Error" + err)
})
console.dir(client)

/*client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});*/

/*client.set("foo1", "OK")
client.get('foo1', function(err, resp) {
	console.log(resp.toString())
	client.quit()
})*/

client.set('foo1', 'ok2', redis.print)

client.get('foo1', function(err, resp) {
	console.log(resp.toString())
	client.quit()
})

client.getAsync('foo1').then((err, resp) => {
	console.log(resp)
})