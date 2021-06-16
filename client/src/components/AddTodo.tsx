import React, { useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconButton, makeStyles, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { ADD_TODO } from '../graphqlRequests';

const useStyles = makeStyles((theme) => ({
  input: {
    width: 500,
  },
  submitButton: {
    padding: 9,
    marginLeft: 3,
  },
}));

const AddTodo = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null!);

  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: { addTodo }
      }
    ) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  text
                  completed
                }
              `
            });
            return existingTodos.concat(newTodoRef);
          }
        }
      });
    }
  });

  const handleAddTodo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputText) {
      await addTodo({ variables: { text: inputText } });
      setInputText('');
    }
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextField
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={loading}
        inputRef={inputRef}
        variant='outlined'
        placeholder='what will need to do?'
        size='small'
        className={classes.input}
      />
      <IconButton
        type='submit'
        disabled={loading || !inputText}
        color='primary'
        className={classes.submitButton}
      >
        <AddIcon />
      </IconButton>
    </form>
  );
}

export default AddTodo;
