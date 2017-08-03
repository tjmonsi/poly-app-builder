const gulp = require('gulp')
const inquirer = require('inquirer')
const slugify = require('slugify')
const uppercamelcase = require('uppercamelcase')
const { template } = require('lodash')
const fs = require('fs')

gulp.task('create-model', (done) => {
  var prompts = [{
    name: 'modelName',
    message: 'What is the name of the model/data structure?'
  }]

  inquirer.prompt(prompts).then((answers) => {
    if (!answers.modelName || typeof answers.modelName !== 'string') {
      console.log('Model Name is not a string')
      return done()
    }

    answers.modelName = answers.modelName.toLowerCase()
    answers.moduleName = answers.modelName.toLowerCase()
    answers.moduleNameSlug = slugify(answers.moduleName)
    answers.modelNameSlug = slugify(answers.modelName)
    answers.modelNamePascalCase = uppercamelcase(answers.modelNameSlug)

    var folder = `core/modules/${answers.moduleNameSlug}`

    if (!fs.existsSync(folder)) {
      console.log('Module doesn\'t exist. Creating Module')
      fs.mkdirSync(folder)
    }

    var bower = fs.readFileSync('core/gulp/templates/_bower.json', 'utf8')

    fs.writeFileSync(`${folder}/bower.json`, template(bower)(answers), 'utf8')
    fs.writeFileSync(`${folder}/.bowerrc`, fs.readFileSync('core/gulp/templates/_bowerrc', 'utf8', 'utf8'))

    if (!fs.existsSync(`${folder}/models`)) {
      fs.mkdirSync(`${folder}/models`)
    }

    var data = fs.readFileSync('core/gulp/templates/_model.html', 'utf8')

    if (fs.existsSync(`${folder}/models/${answers.modelNameSlug}-data.html`)) {
      console.log('Will not overwrite existing model.')
      return done()
    }
    fs.writeFileSync(`${folder}/models/${answers.modelNameSlug}-data.html`, template(data)(answers), 'utf8')

    if (!fs.existsSync(`${folder}/reducers`)) {
      fs.mkdirSync(`${folder}/reducers`)
    }

    var reducers = fs.readFileSync('core/gulp/templates/_reducers.html', 'utf8')

    if (fs.existsSync(`${folder}/reducers/reducers.html`)) {
      console.log('Will not overwrite existing reducer.')
      return done()
    }
    fs.writeFileSync(`${folder}/reducers/reducers.html`, template(reducers)(answers), 'utf8')

    var config = JSON.parse(fs.readFileSync('core/config/dev.json', 'utf8'))
    config.modules[answers.moduleNameSlug] = true
    fs.writeFileSync('core/config/dev.json', JSON.stringify(config, null, 2), 'utf8')

    return done()
  })
})
