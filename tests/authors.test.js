const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('Pruebas de la API de Autores', () => {

    afterAll(async () => {
        await pool.end();
    })
    
    it('Debería obtener la lista de autores literarios', async () => {
        const res = await request(app).get('/authors');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        // Verificamos que el primer autor sea Milan Kundera
        expect(res.body[0].name).toBe('Milan Kundera');
    });

    it('Debería obtener el detalle de Milan Kundera (ID 1)', async () => {
        const res = await request(app).get('/authors/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Milan Kundera');
    });

    it('Debería devolver 404 si el autor no existe', async () => {
        const res = await request(app).get('/authors/999');
        expect(res.statusCode).toEqual(404);
    });

    it('Debería fallar al crear un autor con email duplicado', async () => {
        const res = await request(app)
            .post('/authors')
            .send({ name: "Impostor", email: "milan@kundera.cz" });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
    });

    it('Debería fallar al crear un autor si el nombre está vacío', async () => {
        const res = await request(app)
            .post('/authors')
            .send({ name: "", email: "nuevo@correo.com" });
        
        expect(res.statusCode).toEqual(400);
    });

    it('Debería devolver 404 al intentar borrar un autor que no existe', async () => {
        const res = await request(app).delete('/authors/9999');
        expect(res.statusCode).toEqual(404);
    });
});