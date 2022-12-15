import { Card, Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function({ handleAddition }: { handleAddition: (content: string) => void }) {

  const [addingBoolean, setAddingBoolean] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const handleAddClick = () => {
    if (!inputValue) return

    setAddingBoolean(false);
    setInputValue('');
    handleAddition(inputValue);
  }

  const handleClose = () => {
    setInputValue('');
    setAddingBoolean(false);
  }

  return (
        <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400, maxHeight: 100}}>
        
          {addingBoolean ?
            <Box display='flex' flex='row'>
              <TextField id="filled-basic" label="Title" value={inputValue} variant="filled" onChange={e => setInputValue(e.target.value)} />
              <Button onClick={handleClose}>X</Button>
              <Button onClick={handleAddClick}>Add</Button>
            </Box> :
            <Button onClick={() => { setAddingBoolean(true) }}>
                Add Card
            </Button>
      }
    </Card>
  );
}
