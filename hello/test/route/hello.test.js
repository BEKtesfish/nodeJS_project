import {app} from '../../src/express.js';
import {expect} from 'chai';
import supertest from 'supertest';

const request =  supertest(app);

describe('Express Hello Routes', () => {
    it('should return "Hello World" for GET /', async ()=> {
        const res = await request.get('/hello')
        expect(res.status).to.equal(200)
        expect(res.text).to.equal('hello world!')
    })
    it('Should return "404 page not found" for GET /wrongpage ', async () => {
        const res = await request.get('/wrongpage')
        expect(res.status).to.equal(404)
        expect(res.body).to.have.property('status')
        expect(res.body.status).to.equal(404)
    })
    it('should return "500 Internal Server Error" for GET /', async ()=>{
        const res = await request.get('/500')
        expect(res.status).to.equal(500)
        expect(res.body).to.have.property('status')
        expect(res.body.status).to.equal(500)
    })
    it('should return "200 Hello World!" for GET /api/hello', async ()=>{
        const res= await request.get('/api/hello')
    
        expect(res.status).to.equal(200)
        expect(res.body.message).to.equal("Hello World!")
    })
})
