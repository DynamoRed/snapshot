import React, { useState } from "react";

describe("Item Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("displays the correct search term in the heading", () => {
      // Define the search term
      const searchTerm = "Nature";
  
      // Mount the component with the search term
      cy.mount(<Item searchTerm={searchTerm} />);
  
      // Assert that the heading contains the search term
      cy.contains("h2", `${searchTerm} Pictures`).should("exist");
    });
  
    it("renders the Container component with the correct search term prop", () => {
      // Define the search term
      const searchTerm = "Animals";
  
      // Mount the component with the search term
      cy.mount(<Item searchTerm={searchTerm} />);
  
      // Assert that the Container component is rendered with the correct prop
      cy.get("Container").invoke("prop", "searchTerm").should("equal", searchTerm);
    });
  });
  