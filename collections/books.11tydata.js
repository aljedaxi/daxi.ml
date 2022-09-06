const events = require ('events')
const fs = require ('node:fs')
const readline = require ('node:readline')

module.exports = () => {
	const rl = readline.createInterface ({
		input: fs.createReadStream ('./public/books.jsonl'),
		crlfDelay: Infinity,
	})
	return {
		jsonl: async function* getLines() {
			for await(const l of rl) {
				yield JSON.parse (l)
			}
		}
	}
}
