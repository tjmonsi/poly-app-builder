const gulp = require('gulp')
const gulpif = require('gulp-if')
const mergeStream = require('merge-stream')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cssSlam = require('css-slam').gulp
const htmlMinifier = require('gulp-html-minifier')
// const { generateCountingSharedBundleUrlMapper, generateSharedDepsMergeStrategy } = require('polymer-bundler')
const { PolymerProject, HtmlSplitter } = require('polymer-build')
const { destinationFolder, buildConfig } = require('../utils/utils')

gulp.task('polymer-build', () => {
  const config = buildConfig()
  const sourcesHtmlSplitter = new HtmlSplitter()
  const cwd = process.cwd()
  var fragments = []
  for (var i in config.fragments) {
    fragments.push(config.fragments[i])
  }
  process.chdir(destinationFolder())
  const project = new PolymerProject({
    entrypoint: `index.html`,
    shell: `shell/app-shell.html`,
    sources: [
      'modules/**/*'
    ],
    fragments,
    extraDependencies: [
      `manifest.json`,
      `index.js`,
      `bower_components/webcomponentsjs/custom-elements-es5-adapter.js`,
      `bower_components/webcomponentsjs/webcomponents-hi-ce.js`,
      `bower_components/webcomponentsjs/webcomponents-hi-ce.js.map`,
      `bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js`,
      `bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js.map`,
      `bower_components/webcomponentsjs/webcomponents-hi.js`,
      `bower_components/webcomponentsjs/webcomponents-hi.js.map`,
      `bower_components/webcomponentsjs/webcomponents-lite.js`,
      `bower_components/webcomponentsjs/webcomponents-lite.js.map`,
      `bower_components/webcomponentsjs/webcomponents-loader.js`,
      `bower_components/webcomponentsjs/webcomponents-sd-ce.js`,
      `bower_components/webcomponentsjs/webcomponents-sd-ce.js.map`
    ]
  })

  const sourcesStream = project.sources()
    .pipe(sourcesHtmlSplitter.split())
    .pipe(gulpif(/\.js$/, babel({presets: ['env'], compact: true, minified: true})))
    .pipe(gulpif(/\.js$/, uglify()))
    .pipe(gulpif(/\.css$/, cssSlam()))
    .pipe(gulpif(/\.html$/, htmlMinifier({
      minifyCSS: true,
      removeComments: true
    })))
    .pipe(sourcesHtmlSplitter.rejoin())

  const depStream = project.dependencies()
    .pipe(sourcesHtmlSplitter.split())
    .pipe(gulpif((file) => {
      return file.path.indexOf('slug') < 0 && file.path.indexOf('web-animations') < 0 && file.path.indexOf('custom-elements-es5-adapter.js') < 0 && /\.js$/.test(file.path)
    }, babel({presets: ['env'], compact: true, minified: true})))
    .pipe(gulpif((file) => {
      return file.path.indexOf('custom-elements-es5-adapter.js') < 0 && /\.js$/.test(file.path)
    }, uglify()))
    .pipe(gulpif(/\.css$/, cssSlam()))
    .pipe(gulpif(/\.html$/, htmlMinifier({
      minifyCSS: true,
      removeComments: true
    })))
    .pipe(sourcesHtmlSplitter.rejoin())

  return mergeStream(sourcesStream, depStream)
    .pipe(project.bundler())
    .pipe(project.addCustomElementsEs5Adapter())
    .pipe(project.addPushManifest())
    .pipe(gulp.dest(`build`))
    .on('end', () => {
      process.chdir(cwd)
    })
})
