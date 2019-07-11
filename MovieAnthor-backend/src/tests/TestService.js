process.env.NODE_ENV = 'test';

const { deepEqual, ok } = require("assert");
const chai = require('chai');
const chaiHttp = require('chai-http');
const { init } = require('../server');
const { clearDb } = require('../database/firestore');

chai.use(chaiHttp);
const should = chai.should();

const MovieTest = {
    title: 'Annabelle Comes Home',
    trailer: 'https://youtu.be/-OFrNe_FYhc',
    actors: 'Vera Farmiga, Patrick Wilson, Mckenna Grace',
    summarizedPlot: 'While babysitting the daughter of Ed and Lorraine Warren, a teenager and her friend unknowingly awaken an evil spirit trapped in a doll.',
    genre: 'Horror, Mystery, Thriller',
    date: ' 27/06/2019'
};

describe('Tests API routes', () => {
    let server;

    before(async () => {
        await clearDb('src/config/firebase-private-key-test.json');
        server = await init();
    });

    it('Busca todos os filmes cadastrados', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/movies'
        });

        res.should.have.status(200);
        res.result.should.be.a('array');
        res.result.length.should.be.eql(3);
    });

    it('Adiciona um filme na base', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/movies',
            payload: JSON.stringify(MovieTest)
        });

        res.should.have.status(200);
        res.result.should.be.eql(MovieTest);
    });

    it('Pesquisa um filme na base', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/movies/Annabelle'
        });

        res.should.have.status(200);
        res.result.should.be.eql(MovieTest);
    });

    it('Edita um filme na base', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/movies/Spider-Man',
            payload: JSON.stringify(MovieTest)
        });

        res.should.have.status(200);
        res.result.should.be.true;
    });

    it('Exclui um filme na base', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/movies/ToyStory'
        });

        res.should.have.status(200);
        res.result.should.be.true;
    });
});