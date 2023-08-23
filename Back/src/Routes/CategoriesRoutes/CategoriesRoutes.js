const {
  putHandlerCategory,
} = require('../../Handlers/HandlerCategories/PutHandlerCategory');
const {
  deleteHandlerCategory,
} = require('../../Handlers/HandlerCategories/deleteHandlerCategory');
const {
  getHandlerCategory,
} = require('../../Handlers/HandlerCategories/getHandlerCategory');
const {
  postHandlerCategory,
} = require('../../Handlers/HandlerCategories/postHandlerCategory');

const router = require('express').Router();

router.post('/', postHandlerCategory);
router.get('/', getHandlerCategory);
router.get('/:id', getHandlerCategory);
router.put('/:id', putHandlerCategory);
router.delete('/:id', deleteHandlerCategory);

module.exports = router;
