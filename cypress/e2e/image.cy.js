import React, { useState } from "react";

describe("Image Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("displays the image with the correct URL and alt text", () => {
      // Define the image properties
      const url = "https://example.com/image.jpg";
      const title = "Example Image";
  
      // Mount the component with the image properties
      cy.mount(<Image url={url} title={title} />);
  
      // Assert that the image is displayed with the correct URL and alt text
      cy.get('[data-cy="img"]').should("have.attr", "src", url);
      cy.get('[data-cy="img"]').should("have.attr", "alt", title);
    });
  });
  