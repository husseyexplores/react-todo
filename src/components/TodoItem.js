import React from 'react';

// class TodoItem extends React.Component {
//   constructor(props) {
//     super(props);

//     this.todoItemRef = React.createRef();
//   }

//   componentDidMount() {
//     console.log(this.todoItemRef.current.clientHeight)
//   }

//   render() {

//     const { springStyles, handleRemoveTodo, handleToggleTask, keyIdx,  text, isDone } = this.props;
//     let className = 'todo__item-wrapper';
//     className += isDone ? ' cross' : '';
//     let svgClassName = 'checkmark';
//     svgClassName += isDone ? ' checkmark-active' : '';

//     return (
//     <div className={className} style={springStyles} ref={this.todoItemRef}>
//       <div className="checkbox-wrapper">
//         <input
//           className="input-checkbox"
//           id={keyIdx}
//           type="checkbox"
//           onChange={() => handleToggleTask(keyIdx)}
//         />
//         <label className="styled-checkbox" htmlFor={keyIdx}>
//           <svg
//             x="0px"
//             y="0px"
//             width="20px"
//             height="20px"
//             viewBox="0 0 32 32"
//             className={svgClassName}
//           >
//             <path
//               fill="none"
//               strokeWidth="2"
//               strokeLinecap="square"
//               strokeMiterlimit="10"
//               d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
//             />
//           </svg>
//         </label>
//       </div>
//       <label className="todo__item-task-text" htmlFor={keyIdx}>
//         {text}
//       </label>
//       <button
//         className="todo__item-remove"
//         onClick={() => handleRemoveTodo(keyIdx)}
//       >
//         <i className="material-icons">delete</i>
//       </button>
//     </div>
//     );
//   }
// }

const TodoItem = ({_todoItemRef, springStyles, handleRemoveTodo, handleToggleTask, keyIdx,  text, isDone }) => {
  let className = 'todo__item-wrapper';
  className += isDone ? ' cross' : '';
  let svgClassName = 'checkmark';
  svgClassName += isDone ? ' checkmark-active' : '';

  return (
    <div className={className} style={springStyles} ref={_todoItemRef}>
      <div className="checkbox-wrapper">
        <input
          className="input-checkbox"
          id={keyIdx}
          type="checkbox"
          onChange={handleToggleTask.bind(null, keyIdx)}
        />
        <label className="styled-checkbox" htmlFor={keyIdx}>
          <svg
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 32 32"
            className={svgClassName}
          >
            <path
              fill="none"
              strokeWidth="2"
              strokeLinecap="square"
              strokeMiterlimit="10"
              d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
            />
          </svg>
        </label>
      </div>
      <label className="todo__item-task-text" htmlFor={keyIdx}>
        {text}
      </label>
      <button
        className="todo__item-remove"
        onClick={handleRemoveTodo.bind(null, keyIdx)}
      >
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
};


export default TodoItem;