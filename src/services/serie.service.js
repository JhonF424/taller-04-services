const serieSchema = require('../models/serie.model');

class SeriesServices {
    async createSerie(serie) {
        serie.save();
        return serie;
    }

    async listSeries() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(serieSchema.find()), 3000);
        });
    }

    async showSerie(serieId) {
        return serieSchema.findById({ _id: serieId });
    }

    async findSerieByActor(actorName) {
        return serieSchema.find({ 'features_seasons.cast': actorName });
    }

    async findSerieByDate(date) {
        return serieSchema.finf({ 'features_seasons.premier_date': date });
    }
    // async editSerie(
    //     serieID,
    //     serie,
    //     number_seasons,
    //     original_language,
    //     features_seasons,

    //     ) {
    //     return serieSchema.findById({ _id: serieID }).then((serieFind) => {
    //         if (!serieID) throw Error('Serie no encontrada');
    //         return serieSchema.updateOne(
    //             { serieID },
    //             { serie, number_episodes, number_seasons, description }
    //         )
    //     });
    // }

    async removeSerie(serieId) {
        const serieRemove = serieSchema.findById({ _id: serieId });
        serieSchema.deleteOne(serieRemove);
    }
}

module.exports = SeriesServices; 