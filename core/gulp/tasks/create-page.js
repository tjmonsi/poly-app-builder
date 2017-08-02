const gulp = require('gulp')
const inquirer = require('inquirer')
const slugify = require('slugify')
const uppercamelcase = require('uppercamelcase')
const { template } = require('lodash')
const fs = require('fs')

gulp.task('create-page', (done) => {
  var prompts = [{
    name: 'pageName',
    message: 'What is the name of the page?'
  }, {
    name: 'moduleName',
    message: 'What module does the page belong to?'
  }]

  inquirer.prompt(prompts).then((answers) => {
    if (!answers.pageName || typeof answers.pageName !== 'string') {
      console.log('Page Name is not a string')
      return done()
    }

    if (!answers.moduleName || typeof answers.moduleName !== 'string') {
      console.log('Module name not given. Using page name')
      answers.moduleName = answers.pageName
    }

    answers.moduleNameSlug = slugify(answers.moduleName)
    answers.pageNameSlug = slugify(answers.pageName)
    answers.pageNamePascalCase = uppercamelcase(answers.pageNameSlug)

    var folder = `core/modules/${answers.moduleNameSlug}`

    if (!fs.existsSync(folder)) {
      console.log('Module doesn\'t exist. Creating Module')
      fs.mkdirSync(folder)
    }

    var bower = fs.readFileSync('core/gulp/templates/_bower.json', 'utf8')

    fs.writeFileSync(`${folder}/bower.json`, template(bower)(answers), 'utf8')
    fs.writeFileSync(`${folder}/.bowerrc`, fs.readFileSync('core/gulp/templates/_bowerrc', 'utf8', 'utf8'))

    if (!fs.existsSync(`${folder}/pages`)) {
      fs.mkdirSync(`${folder}/pages`)
    }

    var page = fs.readFileSync('core/gulp/templates/_page.html', 'utf8')

    if (fs.existsSync(`${folder}/pages/${answers.pageNameSlug}-page.html`)) {
      console.log('Will not overwrite existing page. Please choose a different page name or put it in a different module')
      return done()
    }
    fs.writeFileSync(`${folder}/pages/${answers.pageNameSlug}-page.html`, template(page)(answers), 'utf8')

    var config = JSON.parse(fs.readFileSync('core/config/dev.json', 'utf8'))
    config.modules[answers.moduleNameSlug] = true
    config.fragments[`${answers.pageNameSlug}-page`] = `modules/${answers.moduleNameSlug}/pages/${answers.pageNameSlug}-page.html`
    config.routing[`/test-modules-pages/${answers.pageNameSlug}-page`] = `${answers.pageNameSlug}-page`
    fs.writeFileSync('core/config/dev.json', JSON.stringify(config, null, 2), 'utf8')

    console.log(`You can check it out at http://localhost:{PORT}/test-modules-pages/${answers.pageNameSlug}-page`)
    return done()
  })
})
