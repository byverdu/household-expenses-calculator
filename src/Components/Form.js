import React from 'react';

const Form = ({collection, onSubmit, onchange }) => (
  <form onSubmit={onSubmit} className="form">
    {
      collection.inputs.map(input => (        
        <label htmlFor="title" key={input.id}>
          {input.placeholder}
          <input
            className={input.className}
            id={input.id}
            required
            type={input.type}
            placeholder={input.placeholder}
            onChange={onchange}
          />
        </label>
      ))
    }
    <button>{collection.textButton}</button>
  </form>
);

export default Form;