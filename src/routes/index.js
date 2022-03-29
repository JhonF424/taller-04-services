const express = require('express');
const seriesRoutes = require('./serie.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v2', router);
    router.use('/series', seriesRoutes);
}

module.exports = routerApi;