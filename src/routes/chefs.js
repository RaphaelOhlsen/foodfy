const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');

const ChefController = require('../app/controllers/admin/ChefController');

const ChefValidator = require('../app/validators/chef');

routes.get('/',ChefController.index);
routes.get('/create',ChefController.create);
routes.get('/:id',ChefController.show);
// routes.get('/:id/edit/:message',ChefController.edit);
routes.get('/:id/edit/',ChefController.edit);

routes.post('/',multer.array("photos", 1), ChefValidator.post, ChefController.post);
routes.put('/', multer.array("photos", 1), ChefValidator.put, ChefController.put);
routes.delete('/', ChefValidator.deleted, ChefController.deleted);

module.exports = routes;