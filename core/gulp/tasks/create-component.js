const gulp = require('gulp')
const inquirer = require('inquirer')
const slugify = require('slugify')
const uppercamelcase = require('uppercamelcase')
const { template } = require('lodash')
const fs = require('fs')

gulp.task('create-component', (done) => {
  var prompts = [{
    name: 'componentName',
    message: 'What is the name of the component?'
  }, {
    name: 'moduleName',
    message: 'What module does the component belong to?'
  }]

  inquirer.prompt(prompts).then((answers) => {
    if (!answers.componentName || typeof answers.componentName !== 'string') {
      console.log('Component Name is not a string')
      return done()
    }

    if (!answers.moduleName || typeof answers.moduleName !== 'string') {
      console.log('Module name not given. Using component name')
      answers.moduleName = answers.componentName
    }

    // if (answers.componentName.split(' ').length === 1 || answers.componentName.split(' ').length === 1) {
    //   answers.componentName
    // }

    answers.moduleName = answers.moduleName.toLowerCase()
    answers.componentName = answers.componentName.toLowerCase()
    answers.moduleNameSlug = slugify(answers.moduleName)
    answers.componentNameSlug = slugify(answers.componentName)

    if (answers.componentNameSlug.split('-').length === 1) {
      answers.componentNameSlug = answers.componentNameSlug + '-component'
    }

    answers.componentNamePascalCase = uppercamelcase(answers.componentNameSlug)

    var folder = `core/modules/${answers.moduleNameSlug}`

    if (!fs.existsSync(folder)) {
      console.log('Module doesn\'t exist. Creating Module')
      fs.mkdirSync(folder)
    }

    var bower = fs.readFileSync('core/gulp/templates/_bower.json', 'utf8')

    fs.writeFileSync(`${folder}/bower.json`, template(bower)(answers), 'utf8')
    fs.writeFileSync(`${folder}/.bowerrc`, fs.readFileSync('core/gulp/templates/_bowerrc', 'utf8', 'utf8'))

    if (!fs.existsSync(`${folder}/components`)) {
      fs.mkdirSync(`${folder}/components`)
    }

    var component = fs.readFileSync('core/gulp/templates/_component.html', 'utf8')

    if (fs.existsSync(`${folder}/components/${answers.componentNameSlug}-component.html`)) {
      console.log('Will not overwrite existing component. Please choose a different component name or put it in a different module')
      return done()
    }
    fs.writeFileSync(`${folder}/components/${answers.componentNameSlug}.html`, template(component)(answers), 'utf8')

    var config = JSON.parse(fs.readFileSync('core/config/dev.json', 'utf8'))
    config.modules[answers.moduleNameSlug] = true
    fs.writeFileSync('core/config/dev.json', JSON.stringify(config, null, 2), 'utf8')
    return done()
  })
})
