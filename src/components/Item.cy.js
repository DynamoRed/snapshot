import React from 'react'
import Item from './Item'

describe('<Item />', () => {
  it('renders', () => {
    cy.mount(<Item />)
  })
})