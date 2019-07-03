import request from 'supertest';
import app from '../src/app';

// Note these tests are dependant on the word file
describe('Anagram API', () => {

    it('should return 400 when passing a number', (done) => {
        request(app)
        .get('/1234')
        .expect(400, done);
    });

    it('should return anagram for test', (done) => {
        request(app)
        .get('/test')
        .expect(200)
        .then(({ body }) => {
            const expectedAnagram = [ 'tets', 'sett', 'stet' ];
            expect(body.test).toBeTruthy();
            expect(body.test.sort()).toEqual(expectedAnagram.sort());
            done();
        });
    });

    it('should return anagram for test,food', (done) => {
        request(app)
        .get('/test,node')
        .expect(200)
        .then(({ body }) => {
            const expectedTestAnagram = [ 'tets', 'sett', 'stet' ];
            const expectedNodeAnagram = [ 'done' ];
            expect(body.test).toBeTruthy();
            expect(body.node).toBeTruthy();
            expect(body.test.sort()).toEqual(expectedTestAnagram.sort());
            expect(body.node.sort()).toEqual(expectedNodeAnagram.sort());
            done();
        });
    });

    it('should return no for xyz', (done) => {
        request(app)
        .get('/xyz')
        .expect(200)
        .then(({ body }) => {
            expect(body.xyz).toBeTruthy();
            expect(body.xyz).toEqual([]);
            done();
        });
    });

});
