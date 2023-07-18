/// <reference types="cypress" />

describe('Navigation between pages test suites', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Visit a unknown page should return "Not Found"', () => {
        cy.visit("/djksqjdkqsjdkjqskdjk")
        cy.get("h2").contains("Page Not Found")
    })

    it('By default should go to montains search page', () => {
        cy.get('[data-cy="img"]').should('be.visible');

        cy.get('h2').contains('mountain');
    })

    it('Go on beaches button should change url and page content', () => {
        cy.get('a').contains('Beaches').click();
        cy.url().should("include", "/beach");

        cy.get('[data-cy="img"]').should('be.visible');
        cy.get('h2').contains('beach');
    })

    it('Go on birds button should change url and page content', () => {
        cy.get('a').contains('Birds').click();
        cy.url().should("include", "/bird");

        cy.get('[data-cy="img"]').should('be.visible');
        cy.get('h2').contains('bird');
    })

    it('Go on food button should change url and page content', () => {
        cy.get('a').contains('Food').click();
        cy.url().should("include", "/food");

        cy.get('[data-cy="img"]').should('be.visible');
        cy.get('h2').contains('food');
    })

    it('Go on mountain button should change url and page content', () => {
        cy.get('a').contains('Mountain').click();
        cy.url().should("include", "/mountain");

        cy.get('[data-cy="img"]').should('be.visible');
        cy.get('h2').contains('mountain');
    })
})