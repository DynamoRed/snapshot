import React from 'react'
import Gallery from './Gallery'

describe('<Gallery />', () => {
  it('renders', () => {
    cy.mount(<Gallery />)
  })
})