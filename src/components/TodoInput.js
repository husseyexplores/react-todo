import React from 'react';

const TodoInput = props => (
  <div className="input__wrapper">
    <input
      type="text"
      className="todo__input"
      value={props.inputValue}
      onChange={e => props.handleInputChange(e)}
      ref={props.inputRef}
      placeholder="Add todo..."
      onKeyDown={e => props.handleKeyDown(e)}
    />
    <button onClick={() => props.handleAddTodo()}>
      <i className="material-icons">create</i>
    </button>
  </div>
);

export default TodoInput;
