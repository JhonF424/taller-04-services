const SeriesService = require('../services/serie.service');
const SerieModel = require('../models/serie.model');
const service = new SeriesService();
const express = require('express');
const serieRoutes = express.Router();

serieRoutes.post('/serie', async (req, res) => {
    try {
        const serie = SerieModel(req.body);
        const data = await service.createSerie(serie);
        res.status(201).json({ data });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
});

serieRoutes.get('/', async (req, res) => {
    try {
        const data = await service.listSeries();
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
});

serieRoutes.get('/findByID/:serieId', async (req, res, next) => {
    try {
        const { serieId } = req.params;
        const data = await service.showSerie(serieId);
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
});

serieRoutes.get('/findByActor/:actorName', async (req, res, next) => {
    try {
        const { actorName } = req.params;
        const data = await service.findSerieByActor(actorName);
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
});

serieRoutes.get('/findByDate/:date', async (req, res, next) => {
    try {
        const { serieDate } = req.params;
        const data = await service.findSerieByDate(serieDate);
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
});

serieRoutes.delete('/delete/:serieId', async (req, res, next) => {
    try {
        const { serieId } = req.params;
        const data = await service.removeSerie(serieId);
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
});

serieRoutes.put('/update/:serieId', async (req, res, next) => {
    try {
        const { serieId } = req.params;
        const data = await service.editSerie(serieId);
        res.status(200), json({ data });
    } catch (error) {
        next(error);
    }
})

module.exports = serieRoutes;