/// <reference types="cypress" />

describe('Interactions test suites', () => {
    beforeEach(() => {
        cy.visit('/bird');
    })

    it('Image zoom when hover it', () => {
        cy.get('[data-cy="img"]').first()
        .realHover()
        .should('not.have.css', 'transform', 'scale(1.25)')
    })
})