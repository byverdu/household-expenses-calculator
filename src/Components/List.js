import React from "react";

const List = ({ collection, deleteHandler, id }) => (
  <ol>
    {collection.map((val, index) => (
      <li key={index}>
        {val.title} => {val.value}
        <button onClick={() => deleteHandler(collection, id, index)}>delete</button>
      </li>
    ))}
  </ol>
);

export default List;