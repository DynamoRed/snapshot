import React, { useState } from "react";

describe("Gallery Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("displays images when results are provided", () => {
      // Mock the image data
      const imageData = [
        {
          farm: 1,
          server: "server1",
          id: "image1",
          secret: "secret1",
          title: "Image 1",
        },
        {
          farm: 2,
          server: "server2",
          id: "image2",
          secret: "secret2",
          title: "Image 2",
        },
      ];
  
      // Stub the API response with the mock data
      cy.intercept("GET", "https://api.example.com/images", {
        statusCode: 200,
        body: imageData,
      }).as("getImages");
  
      // Mount the component with the mocked data
      cy.visit("/", {
        onBeforeLoad(win) {
          cy.stub(win, "fetch")
            .withArgs("https://api.example.com/images")
            .returns(Promise.resolve({ body: imageData }));
        },
      });
  
      // Assert that the images are displayed
      cy.get('[data-cy="img"]').should("have.length", imageData.length);
    });
  
    it("displays 'not found' component when no images are provided", () => {
      // Stub the API response with an empty array
      cy.intercept("GET", "https://api.example.com/images", {
        statusCode: 200,
        body: [],
      }).as("getImages");
  
      // Mount the component with the empty data
      cy.visit("/", {
        onBeforeLoad(win) {
          cy.stub(win, "fetch")
            .withArgs("https://api.example.com/images")
            .returns(Promise.resolve({ body: [] }));
        },
      });
  
      // Assert that the 'not found' component is displayed
      cy.get('[data-cy="no-images"]').should("exist");
    });
  });
  