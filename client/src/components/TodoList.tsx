import React from 'react';
import { Reference, useMutation, useQuery } from '@apollo/client';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import { Todo } from '../types';
import { DELETE_TODO, GET_TODOS, UPDATE_TODO } from '../graphqlRequests';
import getHighlightedText from '../utils/getHighlightedText';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
  },
  refreshIcon: {
    padding: 9,
    marginLeft: 3,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = ({ search = '' }) => {
  const classes = useStyles();

  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const [updateTodo] = useMutation(UPDATE_TODO);

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(
      cache,
      {
        data: { deleteTodo }
      }
    ) {
      cache.modify({
        fields: {
          todos(existingTodos = [], { readField }) {
            return existingTodos.filter((todoRef: Reference) => readField('id', deleteTodo) !== readField('id', todoRef));
          }
        }
      });
    }
  });

  if (loading) {
    return <Typography variant='h5' className={classes.title}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant='h5' className={classes.title}>Error =(</Typography>;
  }

  const todos = data.todos as Todo[];
  const filteredTodo = search ? todos.filter(todo => todo.text.includes(search)) : todos;
  const title = search ?
    <>Todo List (found {filteredTodo.length} of {todos.length} todos for "{<b>{search}</b>}"):</> :
    `Todo List (${todos.length}):`;

  return (
    <>
      <Typography variant='h5' className={classes.title}>
        {title}
        <IconButton
          onClick={() => refetch()}
          className={classes.refreshIcon}
        >
          <CachedIcon />
        </IconButton>
      </Typography>
      <List className={classes.list}>
        {filteredTodo.map(({ id, text, completed }) => {
          const labelId = `checkbox-list-label-${id}`;

          return (
            <ListItem
              key={id}
              onClick={() => updateTodo({ variables: { id, completed: !completed } })}
              role={undefined}
              button
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={getHighlightedText(text, search)}
                style={{ textDecoration: completed ? 'line-through' : 'none'}}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => deleteTodo({ variables: { id } })}
                  edge='end'
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default TodoList;
