const gulp = require('gulp')
const inquirer = require('inquirer')
const slugify = require('slugify')
const del = require('del')
const fs = require('fs')

gulp.task('delete-module', (done) => {
  var prompts = [{
    name: 'moduleName',
    message: 'What is the name of the module you want to delete?'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Do you want to delete the said module?',
    default: false
  }]

  inquirer.prompt(prompts).then((answers) => {
    if (!answers.moveon) {
      return done()
    }

    answers.moduleNameSlug = slugify(answers.moduleName)
    del([`core/modules/${answers.moduleNameSlug}`]).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'))
      var config = JSON.parse(fs.readFileSync('core/config/dev.json', 'utf8'))
      delete (config.modules[answers.moduleNameSlug])
      fs.writeFileSync('core/config/dev.json', JSON.stringify(config, null, 2), 'utf8')
      done()
    })
  })
})
