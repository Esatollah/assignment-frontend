import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function CardAddition({ columnId, handleAddition }:
  { columnId: number, handleAddition: (columnId: number, content: string) => void }) {

  const [addingBoolean, setAddingBoolean] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const handleAddClick = () => {
    if (!inputValue) return

    setAddingBoolean(false);
    setInputValue('');
    handleAddition(columnId, inputValue);
  }

  const handleClose = () => {
    setInputValue('');
    setAddingBoolean(false);
  }

  return (
    <Box width={'100%'} display='flex' justifyContent='center' sx={{ marginTop: '.75rem' }}>
      {addingBoolean ?
        <Box display='' flex=''>
          <TextField id="filled-basic" label="Task" value={inputValue} variant="filled" onChange={e => setInputValue(e.target.value)} 
          onKeyDown={e => { if (e.key === 'Enter') handleAddClick() }} 
          />
          <Box display='flex' justifyContent='center' sx={{ marginTop: '4px' }}>
            <Button onClick={handleClose}>X</Button>
            <Button onClick={handleAddClick}>Add</Button>
          </Box>
        </Box> :
        <Box>
          <Button onClick={() => { setAddingBoolean(true) }}>
            <Typography variant="h6">Add Task</Typography>
          </Button>
        </Box>
      }
    </Box>
  );
}

