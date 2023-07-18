import React from "react";

const Image = ({ url, title }) => (
  <li>
    <img data-cy="img" src={url} alt={title} />
  </li>
);

export default Image;
