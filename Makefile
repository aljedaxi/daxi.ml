include .env
export

PAGE_FILE ?= page-logseq-references
PAGE_PATH ?= ~/zettel/pages
OUTPUT_PATH ?= ./src/logseqing/
CURLER ?= curl --silent -X POST http://127.0.0.1:12315/api \
                        -H "Authorization: Bearer ${TOKEN}" \
                        -H "Content-Type: application/json"
PAGE_NAME ?= test
grab-page: 
	@${CURLER} -d '{"method": "logseq.Editor.getPageBlocksTree", "args": ["${PAGE_NAME}"]}' \
		| jq -c '.[] | {content, properties, uuid}' \
		> "${OUTPUT_PATH}/${PAGE_NAME}.ndjson"

grab-pages:
	@${CURLER} -d '{"method": "logseq.db.q", "args": ["(page-property type post)"]}' \
	     | jq -c '.[] | {id, properties, name, uuid, originalName, file}' \
	     > ${PAGE_FILE}.ndjson
	@jq '.name' < ${PAGE_FILE}.ndjson \
		| xargs -n 1 -I '{}' sh -c "PAGE_NAME='{}' make grab-page"

run:
	@deno task serve -p 8011

.PHONY: grab-pages grab-page
