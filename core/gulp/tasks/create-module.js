const gulp = require('gulp')
const inquirer = require('inquirer')
const slugify = require('slugify')
const fs = require('fs')

gulp.task('create-module', (done) => {
  var prompts = [{
    name: 'moduleName',
    message: 'What is the name of your module?'
  }]

  inquirer.prompt(prompts).then((answers) => {
    if (!answers.moduleName || typeof answers.moduleName !== 'string') {
      console.log('Module Name is not a string')
      return done()
    }

    answers.moduleName = answers.moduleName.toLowerCase()
    answers.moduleNameSlug = slugify(answers.moduleName)
    var folder = `src/modules/${answers.moduleNameSlug}`

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    } else {
      console.log('folder exists')
    }

    fs.writeFileSync(`${folder}/.gitinclude`, '', 'utf8')

    var config = JSON.parse(fs.readFileSync('src/config/dev.json', 'utf8'))
    config.modules[answers.moduleNameSlug] = true
    fs.writeFileSync('src/config/dev.json', JSON.stringify(config, null, 2), 'utf8')
    return done()
  })
})
