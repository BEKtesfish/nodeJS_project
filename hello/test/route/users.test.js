import {expect} from "chai";
import request from 'supertest';
import express from 'express';
import {router} from '../../src/route/users.js';

const app = express();

app.use(express.json())
app.use('/api', router)

describe('User Router', () =>{
    beforeEach(async ()=>{
        await request(app).delete('/api/users').send()
    })

    it('Should create a new user', async ()=>{
        const res = await request(app)
            .post('/api/users')
            .send({ id : 1 , name : 'Bereket' })
            .expect(201)
        expect(res.body).to.have.property('id', 1)
        expect(res.body).to.have.property('name', 'Bereket')
    })

    it('get all users', async ()=>{
        await request(app).post('/api/users').send({ id : 1 , name : 'bereket'})

        const res = await request(app)
                    .get('/api/users')
                    .expect(200)
        expect(res.body).to.be.an('array').that.has.lengthOf(1)
        expect(res.body[0]).to.have.property('id',1)
        expect(res.body[0]).to.have.property('name','bereket')
    })
    it('get user by id', async ()=>{
        await request(app).post('/api/users').send({ id : 1 , name : 'bereket'})
        await request(app).post('/api/users').send({ id : 2 , name : 'dawit'})

        const res1 = await request(app).get('/api/users/1')
                    .expect(200)
        const res2 = await request(app).get('/api/users/2')
                    .expect(200)
        expect(res1.body).to.have.property('id',1)
        expect(res1.body).to.have.property('name','bereket')
        expect(res2.body).to.have.property('id',2)
        expect(res2.body).to.have.property('name','dawit')
    })

    it("Delete user by ID", async ()=>{
        await request(app).post('/api/users').send({id: 1, name: 'bereket'})
        await request(app).post('/api/users').send({id: 2, name: 'dawit'})
        const res = await request(app).delete('/api/users/1').expect(200)
  
        expect(res.body).to.have.property('result', 'user deleted')

    
    })
    it("Delete All users", async ()=>{
        await request(app).post('/api/users').send({id: 1, name: 'bereket'})
        await request(app).post('/api/users').send({id: 2, name: 'dawit'})
        const res = await request(app).delete('/api/users').expect(200)
        expect(res.body).to.have.property('result', 'All users deleted')
    })
    it('Should partialy update user data', async ()=>{
        await request(app).post('/api/users').send({id:1, name : 'bereket'})
        
        const res= await request(app).patch('/api/users/1').send({name : 'dawit', job : 'student'}).expect(201)
  
        expect(res.body.user).to.have.property('id',1)
        expect(res.body.user).to.have.property('name',"dawit")
        expect(res.body.user).to.have.property('job',"student")
    })
    it('should update user data',async ()=>{
        await request(app).post('/api/users').send({id:1, name : 'bereket'})
        const res = await request(app).put('/api/users/1').send({id:2}).expect(201)
        expect(res.body.user).to.have.property('id', 2)
        expect(Object.keys(res.body.user)).has.lengthOf(1)
        
    })

})