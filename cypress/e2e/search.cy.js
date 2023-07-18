/// <reference types="cypress" />
import { apiKey } from '../../src/api/config'

describe('Search test suite', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Search a random value should redirect', () => {
        cy.get('input').type('code');
        cy.get('button').click();

        cy.url().should("include","/search/code");
    })

    it('Search a empty value should not redirect', () => {
        cy.get('input').type(' ');
        cy.get('button').should("be.disabled")
    })

    it('Search a random value should return non-null data', () => {
        cy.request('GET', `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=code&per_page=24&format=json&nojsoncallback=1`).then(response => {
            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('photos');
            expect(response.body.photos).not.to.be.empty;
        });
    })

    it('Search a null value should return null data and failed', () => {
        cy.request('GET', `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=24&format=json&nojsoncallback=1`).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('stat','fail');
        });
    })

    it('Search a unknown value should return null data', () => {
        cy.request('GET', `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dkqsjdkqkjk&per_page=24&format=json&nojsoncallback=1`).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('photos');
            expect(response.body.photos.total).to.be.equal(0);
        });
    })
})