import React from "react";

const List = ({ collection, deleteHandler, id }) => (
  <ol >
    {id === 'salary' && (
      <li>
        <span>Gross</span><span>=></span><span>Net</span>
      </li>
    )}
    {collection.map((val, index) => (
      <li key={index}>
        <span>{val.title}</span><span>=></span><span>{val.value}</span>
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