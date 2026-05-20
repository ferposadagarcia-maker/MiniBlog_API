const express = require('express');
const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFound.middleware');

const path = require('node:path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const openApiPath = path.join(__dirname, '..', 'docs', 'openapi.yaml');
const openApiDocument = YAML.load(openApiPath);

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;