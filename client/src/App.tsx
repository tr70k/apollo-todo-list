import React, { useState } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import TodoList from './components/TodoList';
import AddTodo from "./components/AddTodo";
import Search from "./components/Search";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 1000,
    padding: '16px 16px 8px',
    margin: '48px auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function App() {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <AddTodo />
        <Search setSearch={setSearch} />
      </div>
      <TodoList search={search} />
    </Card>
  );
}

export default App;
