var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users-controller');

router.get('/', usersController.getContacts);
router.post('/', usersController.addContact);

router.get('/contact/:id', usersController.getOneContact);
router.put('/contact/:id', usersController.updateContact);
router.delete('/contact/:id', usersController.deleteOneContact);



module.exports = router;
