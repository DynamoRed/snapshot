/// <reference types="cypress" />
const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";

import React, { useState } from "react";

describe('Search test suite', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Search a random value should redirect', () => {
        cy.get('input').type('code');
        cy.get('button').click();

        cy.url().should("include","/search/code");
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
})