import React, { useState } from "react";

describe("Container Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("triggers the runSearch function with the correct searchTerm", () => {
      // Mock the PhotoContext values
      const images = [
        {
          id: 1,
          title: "Image 1",
          url: "https://example.com/image1.jpg",
        },
        {
          id: 2,
          title: "Image 2",
          url: "https://example.com/image2.jpg",
        },
      ];
      const loading = false;
      const runSearch = cy.stub().as("runSearch");
  
      // Mount the component with the mocked values
      cy.mount(
        <PhotoContext.Provider value={{ images, loading, runSearch }}>
          <Container searchTerm="Nature" />
        </PhotoContext.Provider>
      );
  
      // Assert that runSearch is called with the correct searchTerm
      cy.get("@runSearch").should("be.calledWith", "Nature");
    });
  
    it("displays the Loader component when loading is true", () => {
      // Mock the PhotoContext values
      const images = [];
      const loading = true;
      const runSearch = () => {};
  
      // Mount the component with the mocked values
      cy.mount(
        <PhotoContext.Provider value={{ images, loading, runSearch }}>
          <Container searchTerm="Nature" />
        </PhotoContext.Provider>
      );
  
      // Assert that the Loader component is displayed
      cy.get("Loader").should("exist");
    });
  
    it("displays the Gallery component when loading is false", () => {
      // Mock the PhotoContext values
      const images = [
        {
          id: 1,
          title: "Image 1",
          url: "https://example.com/image1.jpg",
        },
        {
          id: 2,
          title: "Image 2",
          url: "https://example.com/image2.jpg",
        },
      ];
      const loading = false;
      const runSearch = () => {};
  
      // Mount the component with the mocked values
      cy.mount(
        <PhotoContext.Provider value={{ images, loading, runSearch }}>
          <Container searchTerm="Nature" />
        </PhotoContext.Provider>
      );
  
      // Assert that the Gallery component is displayed
      cy.get("Gallery").should("exist");
    });
  });
  