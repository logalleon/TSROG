.PHONY: build tsc clean

app := ./index.js
tmp := ./tmp
src := ./src
srcFiles := $(shell find src/ -type f -name '*.ts')
sassFiles := $(shell find sass/ -type f -name '*.scss')

watch:
	while true; do make build -s; sleep 2; done;

build: index.js main.css

main.css: $(sassFiles)
	sass sass/main.scss main.css

index.js: $(tmp)
	browserify -e $(tmp) -o index.js

$(tmp): $(wildcard $(srcFiles))
	rm -rf $(tmp) && \
	tsc $(src)/index.ts -m commonjs --outDir $(tmp)

clean:
	rm -rf $(tmp)