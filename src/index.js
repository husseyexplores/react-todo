import React from 'react';
import ReactDOM from 'react-dom';
// import { TransitionMotion, spring, presets } from 'react-motion';
import { UnmountClosed as Collapse } from 'react-collapse';
import { presets } from 'react-motion';

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
    const task = this.state.inputValue.trim();
    if (task === '') return;
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

  /* Animations End */

  render() {
    const { todoList, inputValue } = this.state;
    const itemsLeft = todoList.filter(({ data: { isDone } }) => !isDone).length;

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
            <TodoItemsWrapper>
              {
                this.state.todoList.map(todo => {
                  const todoItem = <TodoItem
                                      key={todo.key}
                                      keyIdx={todo.key}
                                      text={todo.data.text}
                                      isDone={todo.data.isDone}
                                      handleRemoveTodo={this.handleRemoveTodo}
                                      handleToggleTask={this.handleToggleTask}
                                    />

                  const todoItemWithAnimation = (inputValue.trim().length &&
                      todo.data.text.toUpperCase().includes(inputValue.toUpperCase())) ||
                    !inputValue.trim().length
                   ?
                    <Collapse isOpened={true} springConfig={presets.wobbly}>
                      {todoItem}
                    </Collapse>
                    :
                    <Collapse isOpened={false} springConfig={presets.wobbly}>
                      {todoItem}
                    </Collapse>

                  return todoItemWithAnimation;
                })
              }

            </TodoItemsWrapper>
          </Row>
        </Container>
      </div>
    );
  }
}

const TodoItemsWrapper = props => (
  <div className="todo__items-container" {...props} />
);

const Row = props => <div className="row" {...props} />;

const Container = props => <div className="container" {...props} />;

ReactDOM.render(<App />, document.querySelector('#root'));
