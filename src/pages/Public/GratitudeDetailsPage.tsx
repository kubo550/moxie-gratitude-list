import { useParams, Link } from 'react-router-dom';
import { LocalStorage } from '@/contexts/localStorage';
import { Button, Typography, Icon, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';

type GratitudeItem = {
  id: number;
  title: string;
  explanation: string;
  createdAt: string;
};

export default function GratitudeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const storage = LocalStorage.getInstance();
  const items = storage.getArrayItem<GratitudeItem>('gratitudeEntries');

  const entry = items.find((item) => item.id.toString() === id);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!entry) {
    return <Typography variant="h6">Entry not found</Typography>;
  }

  const handleDeleteGratitude = () => {
    storage.removeArrayItemById<GratitudeItem>('gratitudeEntries', entry.id.toString());
    window.location.href = '/review_and_gratitude';
  };

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-4">
      <Typography variant="h4">{entry.title}</Typography>
      <Typography variant="body1" color="textSecondary">
        {new Date(entry.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1">{entry.explanation}</Typography>

      <Button component={Link} to="/review_and_gratitude" variant="contained" startIcon={<Icon>chevron_left</Icon>}>
        Back
      </Button>
      <Button
        variant="text"
        color="error"
        startIcon={<Icon>delete</Icon>}
        onClick={() => setConfirmOpen(true)}
        sx={{ ml: 5 }}
      >
        Delete
      </Button>

      {/* Dialog Potwierdzający */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this entry?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteGratitude}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
