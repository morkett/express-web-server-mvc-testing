var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users-controller');

router.get('/', usersController.getContacts);
router.post('/', usersController.addContact);

router.get('/contact/:id', usersController.getOneContact);
router.delete('/contact/:id', usersController.deleteOneContact);


//
// router.get('/users/new', usersController.new);
// router.get('/users/:id/edit', usersController.edit);
//
// router.route('/users/:id')
//   .put(usersController.update)
//   .get(usersController.show)
//   .delete(usersController.destroy);

module.exports = router;
