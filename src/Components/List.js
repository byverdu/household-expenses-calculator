import React from "react";

const List = ({ collection, deleteHandler, id }) => (
  <ol >
    {id === 'salary' && (
      <li>Gross => Net</li>
    )}
    {collection.map((val, index) => (
      <li key={index}>
        {val.title} => {val.value}
        <button
          onClick={() => deleteHandler(collection, id, index)}
        >
          &#9587;
        </button>
      </li>
    ))}
  </ol>
);

export default List;