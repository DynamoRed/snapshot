import React, { useState } from "react";

describe("Loader Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("displays the loader element", () => {
      // Mount the component
      cy.mount(<Loader />);
  
      // Assert that the loader element is displayed
      cy.get(".loader").should("exist");
    });
  });
  