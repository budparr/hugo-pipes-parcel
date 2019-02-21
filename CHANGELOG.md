# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.02] - 2019-02-21 (@budparr)

### changed

- Improved postcss.config.js to work with either Hugo's Pipes for CSS processing, or via Parcel.
  - Added `--no-cache` to some build scripts.
  - Added a separate deploy script to better control environment.
  - Added new stylesheet call (partial/stylesheets.html) to utilize Parcel PostCSS processing.
  

## [0.01] - 2019-02-11 (@budparr)

### Added

- Add initial setup
