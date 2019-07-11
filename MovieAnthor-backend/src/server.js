'use strict';

const Hapi = require('@hapi/hapi');
const Service = require(`./service/service`);
const Context = require('./database/Context');
const firestore = require('./database/firestore');

const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

exports.init = async () => {
    await server.initialize();
    const db = await firestore.initializeDb();
    const context = new Context(db);
    const service = new Service(context);

    server.route({
        method: 'GET',
        path: '/api/movies',
        handler: async (request, h) => {
            const list = await service.getall();
            return list;
        }
    });

    server.route({
        method: 'GET',
        path: '/api/movies/{id}',
        handler: async (request, h) => {
            const id = encodeURIComponent(request.params.id);
            const movie = await service.get(id);
            return movie;
        }
    });

    server.route({
        method: 'POST',
        path: '/api/movies',
        handler: async (request, h) => {
            const obj = request.payload;
            const r = await service.create(obj);
            return r;
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/movies/{id}',
        handler: async (request, h) => {
            const id = encodeURIComponent(request.params.id);
            const newobj = request.payload;
            return await service.update(id, newobj);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/movies/{id}',
        handler: async (request, h) => {
            const id = encodeURIComponent(request.params.id)
            console.log(id);
            return await service.delete(id);
        }
    });

    return server;
};

exports.start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});