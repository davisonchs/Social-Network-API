const router = require('express').Router();
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./thoughtRoutes');


router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
