import React from "react";

const List = ({ collection, deleteHandler }) => (
  <ol>
    {collection.map((val, index) => (
      <li key={index}>
        {val.title} => {val.value}
        <button onClick={() => deleteHandler(index)}>delete</button>
      </li>
    ))}
  </ol>
);

export default List;