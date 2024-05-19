import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Todo List App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TodoForm />
                <TodoList />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
