# Poly-app-builder

The Poly-app-builder


## Getting started
* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X or use nvm
    * [Gulp](http://gulp.io): `npm install -g gulp`
    * [Firebase tools](http://firebase.com): `npm install -g firebase-tools`
    * Poly-app-builder: `git clone git@github.com:tjmonsi/poly-app-builder.git`
    * Poly-app-builder plugins and app dependencies: `cd poly-app-builder && npm install && chmod 755 bower-install && ./bower-install`
* Additional instructions:
    * Once installed, change the git remote alias of poly-app-builder to upstream by this command:
        * `git remote add upstream git@github.com:tjmonsi/poly-app-builder.git`
        * `git remote set-url origin git@github.com:[USERNAME_OR_ORGANIZATION]/[NEW_REPO]`
            * this will set the origin to your repository and the upstream to the poly-app-builder's repo for upgrades
* Run:
    * `gulp watch` — builds the project to `dist/public` and runs the program in `localhost:5000`
    * `gulp watch -p $IP -h $HOST` - builds the project to `dist/public` and runs the program. This is for C9 users
    * `gulp` - builds the project
    * `export ENV=production && gulp build` — copies `dev.json` to `prod.json` and builds minified project for production
    * `firebase serve` - runs the project (if done after gulp build, runs production) at `localhost:5000`
    * `gulp copy-config --source [SOURCE_CONFIG_NAME] --dest [DESTINATION_CONFIG_NAME]` - copies the content of the `[SOURCE_CONFIG_NAME].json` file to `[DESTINATION_CONFIG_NAME].json` file
    * `gulp create-module` - to create a module
    * `gulp create-model` - to create a data model mixin and Redux actions for the model. Wraps the model mixin with FirebasePropertyMixin
    * `gulp create-page` - to create a simple page along with a url
    * `gulp create-component` - to create a simple reusable component
    * `gulp delete-module` - delete's module and removes the module in the `dev.json` file
* Learn:
    * `dist/public/` dir is fully auto-generated and served by HTTP server.
    * `core/` holds all project core codes. Touch at your own risk
    * `src/` holds all project code
        * `src/config` holds all config files that help build the project, manifest files, service-workers, theme and routes
            * `src/config/dev.sample.json` a sample config file (See What is inside the dev.json)
        * `src/modules` holds all plug-and-play modules that are used in the project
            * `src/modules/[MODULE_NAME]` module folder
                * `src/modules/[MODULE_NAME]/components` all components that are part of this module
                * `src/modules/[MODULE_NAME]/mixins` all mixins that are part of this module
                * `src/modules/[MODULE_NAME]/model` all data model mixins that are part of this module
                * `src/modules/[MODULE_NAME]/reducers` all redux reducers that are part of this module
                * `src/modules/[MODULE_NAME]/icons` all iconsets that are part of this module
                * `src/modules/[MODULE_NAME]/forms` all form components for the data model that are part of this module
                * `src/modules/[MODULE_NAME]/pages` all pages that are part of this module
        * `src/database` holds all rules for realtime database of firebase and firebase storage
            * `src/database/rules.json` holds all rules for realtime database of firebase
        * `src/opts` holds all other options that will be loaded in the site
            * `src/opts/auth-functions` holds all authentication methods that can be used to check authentication before going to a page
        * `src/scripts` holds all additional js scripts to be loaded in the site
            * `src/scripts/index.js` This one is the root index.js loaded in the site
        * `src/service-worker` holds all additional js files to be loaded in the service worker
            `src/service-worker/routing.js` holds all routing rules for caching data when routes are called in this
* What is inside the dev.json?
    * `app` - holds all config for the app
    * `theme` - holds all config about the theme
    * `modules` - you can add, enable, and disable modules here
    * `fragments` - add all lazy-loaded files here
    * `routing` - add the routing mechanism of your app here
    * `httpCodes` - holds the pages that will be shown if there's no existing route or user is unauthorized
    * `shellComponents` - holds all additional components you want to add in the shell. (All are lazy-loaded, so make sure they are put in the fragments as well)
    * `serviceWorker` - holds all config for service-worker generation
    * `hosting` - holds all config for hosting in firebase
