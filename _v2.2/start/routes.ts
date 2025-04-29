/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import appSchema from './schema.js'

router.on('/').render('pages/home')

router.on('/test').render('pages/test', {
  username: appSchema.name,
})
