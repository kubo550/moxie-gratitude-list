import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Icon } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReviewAndGratitudePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 flex flex-col items-center space-y-6">
      <div className="flex w-full items-center space-x-1">
        <IconButton component={Link} to="/" aria-label="Go back">
          <Icon fontSize="large">chevron_left</Icon>
        </IconButton>

        <Typography variant="h4" className="flex-1 text-left">
          Choose Entry Type
        </Typography>
      </div>

      <Button variant="outlined" onClick={() => setOpen(true)} startIcon={<Icon>add</Icon>}>
        Add Entry
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Entry Type</DialogTitle>
        <DialogContent dividers>
          <Typography paragraph>Would you like to conduct a &quot;nightly&quot; review or a gratitude list?</Typography>
          <div className="mt-2 flex flex-col space-y-2">
            <Button component={Link} to="/gratitude" variant="contained" onClick={() => setOpen(false)}>
              Gratitude
            </Button>
            <Button component={Link} to="/review" variant="contained" onClick={() => setOpen(false)}>
              Review
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
