.PHONY: build tsc clean

app := ./index.js
tmp := ./tmp
src := ./src
srcFiles := $(shell find src/ -type f -name '*.ts')

build: index.js

watch:
	while true; do make build -s; sleep 2; done;

index.js: $(tmp)
	browserify -e $(tmp) -o index.js

$(tmp): $(wildcard $(srcFiles))
	rm -rf $(tmp) && \
	tsc $(src)/index.ts -m commonjs --outDir $(tmp)

clean:
	rm -rf $(tmp)