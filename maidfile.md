<!-- https://github.com/egoist/maid -->
## dev

Run tasks `parcel_build`, and then run`hugo` and `parcel_watch` in parallel after this.

## deploy

Run task `parcel_build`, and then run `hugo`.

## parcel_watch

```bash
parcel watch ./assets/index.js --out-dir assets/output
```

## parcel_build

```bash
parcel build ./assets/index.js --out-dir assets/output --experimental-scope-hoisting
```

## hugo

Run task os before this.

```js
const { spawn } = require('child_process');
//const hugo_source = `./bin/hugo.macos`;
const hugo_source = 'hugo';
//const hugo_source = require('hugo-bin');
const args = process.argv.slice(3)
const hugoArgs = args.length === 0 ? ['--gc', '--minify'] : args;

console.log('flags: ', hugoArgs)

const hugo = spawn(hugo_source, hugoArgs, { 
  stdio: "pipe"
});

hugo.stdout.on('data', (data) => {
  console.log(`${data}`);
});

hugo.on("close", function(code) {
  if (code === 0) {
    console.log('build complete');
  } else {
    console.log('build failed');
  }
});
```