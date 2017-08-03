const gulp = require('gulp')
const fs = require('fs')
const {buildConfig, destinationFolder, themeConfig} = require('../utils/utils')

gulp.task('compile-manifest', (done) => {
  const theme = themeConfig()
  const config = buildConfig()
  const manifest = {
    name: config.app.title,
    short_name: config.app.shortTitle,
    start_url: theme.startUrl,
    display: theme.display,
    theme_color: theme.themeColor,
    background_color: theme.backgroundColor,
    icons: theme.icons
  }
  fs.writeFileSync(`${destinationFolder()}/manifest.json`, JSON.stringify(manifest, null, 2), 'utf8')
  done()
})
