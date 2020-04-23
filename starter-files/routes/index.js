const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// Do work here

 const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/:slug', catchErrors(storeController.getSingleStore));
router.get('/add', authController.isLoggedIn, storeController.addStore)
router.post('/add', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore))
router.post('/add/:id', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore))
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/tags/', catchErrors(storeController.getStoresByTag))
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag))

router.get('/login', userController.loginForm)
router.post('/login', authController.login)

router.get('/register', userController.registerForm)
router.post('/register', 
    userController.validateRegister,
    catchErrors(userController.registerUser),
    authController.login
    )
router.get('/logout', authController.logout)


module.exports = router;
