const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: `La ruta ${req.originalUrl} no fue encontrada`
    });
};

module.exports = notFoundHandler;