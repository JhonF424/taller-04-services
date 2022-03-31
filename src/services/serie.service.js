const serieSchema = require('../models/serie.model');
const Boom = require('@hapi/boom');
class SeriesServices {
    async createSerie(serie) {
        serie.save()
            .then(
                (seriesFind) => {
                    if (!seriesFind) throw Boom.notFound("No se pudo crear la serie");
                    return seriesFind;
                }
            )

        return serie;
    }

    async listSeries() {
        return serieSchema.find()
            .then(
                (seriesFind) => {
                    if (!seriesFind) throw Boom.notFound("No se encontró el listado de series");
                    return seriesFind;
                }
            )
    }

    async showSerie(serieId) {
        return serieSchema.findById({ _id: serieId })
            .then(
                (serieFind) => {
                    if (!serieFind) throw Boom.notFound("No se encontró la serie");
                    return serieFind;
                }
            )
    }

    async findSerieByActor(actorName) {
        return serieSchema.find({ 'features_seasons.cast': actorName })
            .then(
                (serieFind) => {
                    if (!serieFind) throw Boom.notFound("No se encontró la serie");
                    return serieFind;
                }
            )
    }

    async findSerieByDate(date) {
        return serieSchema.find({ 'features_seasons.premier_date': date })
            .then(
                (serieFind) => {
                    if (!serieFind) throw Boom.notFound("No se encontró la serie");
                    return serieFind;
                }
            )
    }
    async editSerie(
        serieID,
        serie,
        number_seasons,
        orginal_lenguage,
        features_seasons

    ) {
        return serieSchema.findById({ _id: serieID }).then((serieFind) => {
            if (!serieFind) throw Boom.notFound("No se encontró la serie");
            return serieSchema.updateOne(
                { serieID },
                {
                    serie,
                    number_seasons,
                    orginal_lenguage,
                    features_seasons
                }
            )
        });
    }

    async removeSerie(serieId) {
        const serieRemove = serieSchema.findById({ _id: serieId });
        serieSchema.deleteOne(serieRemove)
            .then(
                (serieFind) => {
                    if (!serieFind) throw Boom.notFound("No se pude eliminar la serie");
                    return serieFind;
                }
            )
    }
}

module.exports = SeriesServices; 