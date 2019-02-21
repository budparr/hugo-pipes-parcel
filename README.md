# The New Dynamic Hugo Starter - Hugo Pipes Setup with Parcel.

Note that this repo is only concerned with demonstrating an asset pipeline and not considered a full starter. Do with it as you wish, but keep in mind that everything here is designed for our internal workflow.

We use a [Changelog](CHANGELOG.md) on all of our projects. Please see that file for updates.

## tools

 - [Hugo](http://gohugo.io/) - A general-purpose website framework—written in Go—that generates static webpages.
 - [Parcel](https://parceljs.org/) - A "blazing" fast, zero configuration web application bundler.
 - PostCSS | [TailwindsCSS](https://tailwindcss.com/) (library of JS-based CSS classes ) | [PurgeCSS](https://www.purgecss.com/) (removes unused CSS)
 - [KyleAMathews/typefaces](https://github.com/KyleAMathews/typefaces) (load OS fonts locally with one little `require`)


# Hugo Asset Pipline

This set up utilizes Parcel for Javascript and open source font processing, Hugo Pipes + PostCSS for CSS processing, and `npm-run-all` to run Parcel and Hugo in parallel (see note below). We use the Yarn package manager, but you can use NPM if you like.

This asset pipeline is a shift for us from using Webpack to process JS/Fonts/CSS. Parcel is a bundler like Webpack, yet as a tradeoff for slightly less flexibility it has a smaller configuration and file footprint and builds faster; in fact, there is no Parcel configuration file. The shift to using Hugo to build CSS allows Hugo sites to be developed outside of an external build process. There are drawbacks to this approach, as outlined below.

### **_Notes:_**

 - This configuration is built around the assumption that JS/Fonts are processed in development, not production, though it would take minimal effort to do so.
 - The scripts in `package.json` include loading of environment variables with `cross-env` which is optional for some systems (not windows) and can safely be removed. Just replace `cross-env NODE_ENV=development` with `NODE_ENV=development`

## JS

- Uses Parcel Bundler.
- Parcel outputs to `assets/output/index.js`.
- Hugo is used to fingerprint and make a secure hash for Subresource Integrity.
  - If `fileExists "./assets/output/index.js` Hugo creates a hash of that file from `layouts/_head/scripts.html`.
- Hugo outputs the processed JS file to `public/output/index.min.[hash].js`.

## CSS

- ~Uses Hugo Pipes, utlizing PostCSS. NOTE: we use this method because we use utility-class CSS. I otherwise recommend you use Parcel to process your CSS. See "How to Switch to running JS-based PostCSS" below.~
- Uses Parcel/PostCSS as default. See "How to Switch to Hugo-based PostCSS" below.

### CSS via Hugo
- Hugo processes `assets/css/styles.css` with `assets/postcss.config.js`, utilizing Imports, TailwindCSS, Autoprefixer, and PurgeCSS.
- **If `NODE_ENV=development` is present in the build command, PostCSS will NOT process the file through PurgeCSS.**
- Hugo outputs the processed CSS file to `public/css/styles.min.[hash].css`.

### CSS via Parcel
- Parcel processes `assets/css/styles.css` with `assets/postcss.config.js`, utilizing Imports, TailwindCSS, Autoprefixer, and PurgeCSS.
- **If `NODE_ENV=development` is present in the build command, PostCSS will NOT process the file through PurgeCSS.**
- Hugo outputs the processed CSS file to `assets/output/index.[hash].css`.


## Fonts

- Open source fonts via [Typefaces](https://github.com/KyleAMathews/typefaces) uses Parcel Bundler.
- Parcel outputs CSS to `assets/output/index.css` and also puts the font files, hashed, in the same directory.
- Hugo Pipes processes files into public directory and create Prefetch links.
  - If `fileExists "./assets/output/index.css` Hugo creates the prefetch links from `layouts/_head/stylesheets.html`.
- Hugo outputs the processed fonts and CSS file to `public/output/index.min.[hash].css` and `public/output/font-name.[hash].woff[2]`.

## Images

- Assets stored in an S3 bucket or local to the repo, transformed via Imgix.


### TODO

- Account for resources in _header for caching and preload (is Scratch viable).
- Make sure our package.json commands are set up nicely.
- Determine workflow for managing fontst that are not called with the typogpraphy package (i.e. commercial fonts).

### Pros and cons of using Hugo to process PostCSS

#### Pros

- Do not have to run JS to change CSS, eliminating mismatch in timing while building CSS.
- Updates are faster in development.

#### cons

- Must Install Node modules just to run Hugo.
- Must run PostCSS (with Node modules) to build in production on the server, building CSS with every change.
- Creates a separate CSS file for main styles apart from any CSS files generated for fonts.

### How to Switch to running Hugo-based PostCSS

- Remove the main CSS file to `assets/index.js`.
- Change Tailwind imports to call tailwind via @import, instead of directly.
- Change initial CSS file `layouts/_head/stylesheets.html` to use Hugo (see comments in that file).
