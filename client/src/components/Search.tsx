import React, { useRef, useState } from 'react';
import { IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import debounce from '../utils/debounce';

const useStyles = makeStyles((theme) => ({
  clearIcon: {
    marginRight: theme.spacing(-1),
    padding: theme.spacing(1),
  },
}));

type SearchProps = {
  setSearch: (search: string) => void,
}

const Search = ({ setSearch }: SearchProps) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const debouncedSave = useRef(debounce((search: string) => setSearch(search), 1000)).current;

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value)
    debouncedSave(e.target.value);
  }

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
    setSearchText('')
    setSearch('');
  }

  return (
    <TextField
      value={searchText}
      onChange={handleSearch}
      variant='outlined'
      size='small'
      placeholder='search...'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton onClick={handleClear} className={classes.clearIcon}>
            <ClearIcon />
          </IconButton>
        )
      }}
    />
  );
}

export default Search;
