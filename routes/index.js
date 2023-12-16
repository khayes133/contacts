const router = require('express').Router(); 
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/contacts', require('./contacts'));

module.exports = router;