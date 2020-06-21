const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');

const chefsController = require('../app/controllers/admin')

routes.get('/admin/chefs', chefs.index);
routes.get('/admin/chefs/create', chefs.create);
routes.get('/admin/chefs/:id', chefs.show);
routes.get('/admin/chefs/:id/edit', chefs.edit);

routes.post('/admin/chefs', multer.array("photos", 1), chefs.post);
routes.put('/admin/chefs', multer.array("photos", 1), chefs.put);
routes.delete('/admin/chefs', chefs.delete);