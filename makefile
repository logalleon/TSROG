app := $(index.js)

build: $(app)

$(app): $(wildcard ./src/*.ts)
	tsc ./src/index.ts -m commonjs --outDir ./dist/ && \
	browserify -e ./dist/ -o $(app)