const express = require('express');
const server = express();

const configureMiddleware = require('../config/middleware');
configureMiddleware(server);

// Routes
const projectRoutes = require('../routes/projectRoutes');
const actionRoutes = require('../routes/actionRoutes');

server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

module.exports = server;
