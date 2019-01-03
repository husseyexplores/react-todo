import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionMotion, spring, presets } from 'react-motion';

import './css/style.css';

import ReflectState from './components/ReflectState';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

class App extends React.Component {
  state = {
    todoList: [
      { key: 't1', data: { text: 'Board the plane', isDone: false } },
      { key: 't2', data: { text: 'Sleep', isDone: false } },
      {
        key: 't3',
        data: { text: 'Try to finish conference slides', isDone: false },
      },
      { key: 't4', data: { text: 'Eat cheese and drink wine', isDone: false } },
      { key: 't5', data: { text: 'Go around in Uber', isDone: false } },
      { key: 't6', data: { text: 'Talk with conf attendees', isDone: false } },
      { key: 't7', data: { text: 'Show Demo 1', isDone: false } },
      { key: 't8', data: { text: 'Show Demo 2', isDone: false } },
      {
        key: 't9',
        data: { text: 'Lament about the state of animation', isDone: false },
      },
      { key: 't10', data: { text: 'Show Secret Demo', isDone: false } },
      { key: 't11', data: { text: 'Go home', isDone: false } },
    ],
    inputValue: '',
  };

  inputRef = React.createRef();

  handleInputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  };

  handleAddTodo = () => {
    // console.log('handleAddTodo');
    const task = this.state.inputValue.trim();
    if (task === '') return;
    // create todo
    const newItem = {
      key: 't' + Date.now(),
      data: { text: this.state.inputValue, isDone: false },
    };
    //append at the start of array
    this.setState({ todoList: [newItem].concat(this.state.todoList), inputValue: '' });
    this.inputRef.current.focus();
  };

  handleToggleTask = (doneKey) => {
    console.log('handleToggleTask');
    const todoList = this.state.todoList.map(todo => {
      if (todo.key === doneKey) {
        todo.data.isDone = !todo.data.isDone;
      }
    });
    this.setState({ ...todoList });
  };

  handleRemoveTodo = removeKey => {
    // console.log('handleRemoveTodo');
    const todoList = this.state.todoList.filter(todo => todo.key !== removeKey);
    this.setState({ todoList });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleAddTodo();
    }
  };

  /* Animations */

  getDefaultStyles = () => {
    return this.state.todoList.map(todo => ({
      ...todo,
      style: { height: 0, opacity: 1 },
    }));
  };

  getStyles = () => {
    const { todoList, inputValue } = this.state;
    return todoList
      .filter(todo => {
        if (
          (inputValue.trim().length &&
            todo.data.text.toUpperCase().includes(inputValue.toUpperCase())) ||
          !inputValue.trim().length
        ) {
          return todo;
        }
      })
      .map((todo) => {
        return {
          ...todo,
          style: {
            height: spring(60, presets.gentle),
            opacity: spring(1, presets.gentle),
          },
        };
      });
  };

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  }

  /* Animations End */

  render() {
    const { todoList, inputValue } = this.state;
    const itemsLeft = todoList.filter(({ data: { isDone } }) => !isDone).length;
    const filteredListItems = todoList
      .filter(todo => {
        if (
          (inputValue.trim().length &&
            todo.data.text.toUpperCase().includes(inputValue.toUpperCase())) ||
          !inputValue.trim().length
        ) {
          return todo;
        }
      })
      .map((todo, i) => (
          <TodoItem
            key={todo.key}
            keyIdx={todo.key}
            {...todo}
            handleRemoveTodo={this.handleRemoveTodo}
            handleToggleTask={this.handleToggleTask}
          />
        )
      );

    return (
      <div className="App">
        <Row>
          {/* <ReflectState {...this.state} /> */}
        </Row>
        <Container>
          <Header
            title="Todos"
            tagline="Made with ❤️"
            smallTagline=" and some React"
          />
          <Row>
            <TodoInput
              handleInputChange={this.handleInputChange}
              handleAddTodo={this.handleAddTodo}
              inputValue={this.state.inputValue}
              inputRef={this.inputRef}
              handleKeyDown={this.handleKeyDown}
            />
          </Row>
          <Row>
            <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}
            >
            {styles =>
              <TodoItemsWrapper>
                {styles.map(({key, style, data: {text, isDone}}) =>
                  <TodoItem
                    springStyles={style}
                    key={key}
                    keyIdx={key}
                    text={text}
                    isDone={isDone}
                    handleRemoveTodo={this.handleRemoveTodo}
                    handleToggleTask={this.handleToggleTask}
                  />
                )}
              </TodoItemsWrapper>
            }

            {/* {styles =>
              <ul className="todo-list">
                {styles.map(({key, style, data: {isDone, text}}) =>
                  <li key={key} style={style} className={isDone ? 'completed' : ''}>
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        onChange={this.handleToggleTask.bind(null, key)}
                        checked={isDone}
                      />
                      <label>{text}</label>
                      <button
                        className="destroy"
                        onClick={this.handleRemoveTodo.bind(null, key)}
                      />
                    </div>
                  </li>
                )}
              </ul>
            } */}
            </TransitionMotion>
          </Row>
        </Container>
      </div>
    );
  }
}

{/* <TransitionMotion
  defaultStyles={this.getDefaultStyles()}
  styles={this.getStyles()}
  willLeave={this.willLeave()}
  willEnter={this.willEnter}
/>; */}

const TodoItemsWrapper = props => (
  <div className="todo__items-container" {...props} />
);

const Row = props => <div className="row" {...props} />;

const Container = props => <div className="container" {...props} />;

ReactDOM.render(<App />, document.querySelector('#root'));
