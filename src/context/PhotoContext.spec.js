import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { PhotoContext, PhotoContextProvider } from "./PhotoContext";

jest.mock("axios");

describe("PhotoContextProvider", () => {
  test("fetches and sets images on runSearch", async () => {
    const photos = [
      { id: 1, title: "Photo 1" },
      { id: 2, title: "Photo 2" },
    ];
    const response = {
      data: {
        photos: {
          photo: photos,
        },
      },
    };
    axios.get.mockResolvedValueOnce(response);

    const { getByText, queryByText } = render(
      <PhotoContextProvider>
        <PhotoContext.Consumer>
          {({ runSearch, images, loading }) => (
            <>
              <button onClick={() => runSearch("cats")}>Search</button>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ul>
                  {images.map((photo) => (
                    <li key={photo.id}>{photo.title}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </PhotoContext.Consumer>
      </PhotoContextProvider>
    );

    fireEvent.click(getByText("Search"));

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
      expect(queryByText("Photo 1")).toBeInTheDocument();
      expect(queryByText("Photo 2")).toBeInTheDocument();
    });
  });

  test("handles error on failed request", async () => {
    const error = "Failed to fetch data";
    axios.get.mockRejectedValueOnce(error);

    const { getByText, queryByText } = render(
      <PhotoContextProvider>
        <PhotoContext.Consumer>
          {({ runSearch, images, loading }) => (
            <>
              <button onClick={() => runSearch("cats")}>Search</button>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ul>
                  {images.map((photo) => (
                    <li key={photo.id}>{photo.title}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </PhotoContext.Consumer>
      </PhotoContextProvider>
    );

    fireEvent.click(getByText("Search"));

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
      expect(queryByText("Photo 1")).toBeNull();
      expect(queryByText("Photo 2")).toBeNull();
      expect(console.log).toHaveBeenCalledWith(
        "Encountered an error with fetching and parsing data",
        error
      );
    });
  });
});
