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
            step={input.type === 'number' ? '0.001' : null}
          />
        </label>
      ))
    }
    <button>{collection.textButton}</button>
  </form>
);

export default Form;