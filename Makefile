include .env
export

PAGE_FILE ?= page-logseq-references
OUTPUT_PATH ?= ./src/content
CURLER ?= curl --silent -X POST http://127.0.0.1:12315/api \
                        -H "Authorization: Bearer ${LOGSEQ_TOKEN}" \
                        -H "Content-Type: application/json"
PAGE_NAME ?= test
ARTI_PATH ?= ${OUTPUT_PATH}/${PAGE_NAME}
grab-page: 
	@${CURLER} -d '{"method": "logseq.Editor.getPageBlocksTree", "args": ["${PAGE_NAME}"]}' \
		| jq -c '.[] | {content, properties, uuid}' \
		> "${OUTPUT_PATH}/${PAGE_NAME}.ndjson"
	@echo '---' > "${OUTPUT_PATH}/${PAGE_NAME}.md"
	@head -n 1 "${OUTPUT_PATH}/${PAGE_NAME}.ndjson" | jq '.properties' | yq -P -o yaml >> "${OUTPUT_PATH}/${PAGE_NAME}.md"
	@echo '---' >> "${OUTPUT_PATH}/${PAGE_NAME}.md"
	@echo '[[tableofcontents]]' >> "${OUTPUT_PATH}/${PAGE_NAME}.md"
	@tail -n +2 "${OUTPUT_PATH}/${PAGE_NAME}.ndjson" | deno run stupid-sectionizer.ts >> "${OUTPUT_PATH}/${PAGE_NAME}.md"

grab-pages-from-logseq:
	@${CURLER} -d '{"method": "logseq.db.q", "args": ["(page-property type post)"]}' \
	     | jq -c '.[] | {id, properties, name, uuid, originalName, file}' \
	     > ${PAGE_FILE}.ndjson
	@jq '.name' < ${PAGE_FILE}.ndjson \
		| xargs -n 1 -I '{}' sh -c "PAGE_NAME='{}' make grab-page"

run: grab-pages-from-logseq
	@deno task serve --port=8011

.PHONY: run grab-pages-from-logseq grab-page
