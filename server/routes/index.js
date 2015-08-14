var router = require('koa-router')();

router.get('/', require('./home'));
router.get('/angular-people', require('./angular-people'));
router.get('/people', require('./people'));

router.post('/add-person', require('./add-person'));

module.exports = router;