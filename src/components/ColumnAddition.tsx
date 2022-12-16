import { Card, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function ColumnAddition({ handleAddition }: { handleAddition: (content: string) => void }) {

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
    <Card variant="outlined" sx={{ bgcolor: '#042344', width: 300, height: 'fit-content', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {addingBoolean ?
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <TextField id="filled-basic" label="Title"
            value={inputValue} variant="filled" sx={{ bgcolor: '#e0e0e0', borderRadius: '1rem', marginTop: '1rem' }}
            onKeyDown={e => { if (e.key === 'Enter') handleAddClick() }}
            onChange={e => setInputValue(e.target.value)} />
          <Box display='flex' justifyContent='space-between' sx={{ marginTop: '4px' }}>
            <Button variant='contained' sx={{ margin: "4px" }} onClick={handleClose}>X</Button>
            <Button variant='contained' sx={{ margin: "4px" }} onClick={handleAddClick}>Add</Button>
          </Box>
        </Box> :
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Button variant='contained' color='primary' onClick={() => { setAddingBoolean(true) }}>
            <Typography variant="h6" color='white'>Add Column</Typography>
          </Button>
        </Box>
      }
    </Card>
  );
}
