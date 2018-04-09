start http-server -p 1337 ./
start tsc --watch src/index.js --outDir dist
start watch browserify -e dist/ -o index.js