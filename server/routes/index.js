var router = require('koa-router')();

router.get('/', require('./home'));
router.get('/angular-people', require('./angular-people'));
router.get('/people', require('./people'));

router.post('/person', require('./add-person'));
router.put('/person', require('./update-person'));
router.del('/person/:id', require('./remove-person'));

module.exports = router;