// Import Router from express to handle route definitions
const router = require('express').Router();

// Import routes for categories, products, and tags
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Register category routes to be served under '/categories' path
router.use('/categories', categoryRoutes);
// Register product routes to be served under '/products' path
router.use('/products', productRoutes);
// Register tag routes to be served under '/tags' path
router.use('/tags', tagRoutes);

// Export the configured router to be used by the main application
module.exports = router;
