// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape')
const Container = require('@holochain/holochain-nodejs-bleeding')

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()

const testObject = {
		since: "2018-12-06T13:30:00-04:00",
		until: "2018-12-06T14:30:00-04:00"
	},
	testObjectHash = "QmYA4YLREc7rEE5g9s9Ak6XL5bUivEfdYSax41MxYUKXjj"

test('Save event and retrieve', t => {
	const result = app.call("calendar", "main", "save_event", testObject)
	t.deepEqual( result , { Ok : testObjectHash } )
	t.end()
})

test('Retrieve event', t => {
	const result = app.call("calendar", "main", "get_events", {hash:testObjectHash})
	console.log('Result: ',result)
	t.equal(true,Array.isArray(result.Ok))
	t.end()
})

// test('Retrieve event', (t) => {
//   const result = app.call("calendar", "main", "get_events", {})
//   t.deepEqual(result,[{
//   		since:"2018-12-06T13:30:00-04:00",
//   		until:"2018-12-06T14:30:00-04:00"
//   	}])
//   t.end()
// })