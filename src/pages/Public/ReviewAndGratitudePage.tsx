import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Icon,
  Card,
  CardContent
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorage } from '@/contexts/localStorage';

type GratitudeEntry = {
  id: number;
  title: string;
  explanation: string;
  createdAt: string;
};

type ReviewEntry = {
  id: number;
  questions: {
    checked?: boolean;
    description?: string;
  }[];
  createdAt: string;
};

export default function ReviewAndGratitudePage() {
  const [open, setOpen] = useState(false);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [reviewEntries, setReviewEntries] = useState<ReviewEntry[]>([]);

  const storage = LocalStorage.getInstance();

  useEffect(() => {
    const storedGratitude = storage.getArrayItem<GratitudeEntry>('gratitudeEntries');
    const storedReview = storage.getArrayItem<ReviewEntry>('reviewEntries');
    setGratitudeEntries(storedGratitude);
    setReviewEntries(storedReview);
  }, []);

  const handleDeleteGratitude = (id: number) => {
    storage.removeArrayItemById<GratitudeEntry>('gratitudeEntries', id.toString());
    setGratitudeEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleDeleteReview = (id: number) => {
    storage.removeArrayItemById<ReviewEntry>('reviewEntries', id.toString());
    setReviewEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="mt-12 flex flex-col items-center space-y-6 px-4">
      {/* Header */}
      <div className="flex w-full items-center space-x-1">
        <IconButton component={Link} to="/" aria-label="Go back">
          <Icon fontSize="large">chevron_left</Icon>
        </IconButton>

        <Typography variant="h4" className="flex-1 text-left">
          Review & Gratitude Entries
        </Typography>
      </div>

      {/* Add Entry Dialog */}
      <Button variant="outlined" onClick={() => setOpen(true)} startIcon={<Icon>add</Icon>}>
        Add Entry
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Entry Type</DialogTitle>
        <DialogContent dividers>
          <Typography paragraph>
            Would you like to conduct a &quot;nightly&quot; review or a gratitude list?
          </Typography>
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

      {/* Gratitude List */}
      <div className="w-full max-w-2xl space-y-4">
        <Typography variant="h6">Gratitude Entries</Typography>
        {gratitudeEntries.length === 0 && (
          <Typography color="textSecondary">No gratitude entries yet.</Typography>
        )}
        {gratitudeEntries.map((entry) => (
          <Card key={entry.id} variant="outlined">
            <CardContent>
              <Typography fontWeight="bold">{entry.title}</Typography>
              <Typography variant="body2" color="textSecondary">{entry.explanation}</Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {new Date(entry.createdAt).toLocaleString()}
              </Typography>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => handleDeleteGratitude(entry.id)}
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review List */}
      <div className="w-full max-w-2xl space-y-4">
        <Typography variant="h6">Review Entries</Typography>
        {reviewEntries.length === 0 && (
          <Typography color="textSecondary">No review entries yet.</Typography>
        )}
        {reviewEntries.map((entry) => (
          <Card key={entry.id} variant="outlined">
            <CardContent>
              {entry.questions.map((q, idx) =>
                q.checked || q.description ? (
                  <div key={idx} className="mb-2">
                    <Typography fontWeight="bold">
                      {idx + 1}. {q.checked !== undefined ? (q.checked ? '✅ Yes' : '❌ No') : ''}
                    </Typography>
                    {q.description && (
                      <Typography variant="body2" color="textSecondary">{q.description}</Typography>
                    )}
                  </div>
                ) : null
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {new Date(entry.createdAt).toLocaleString()}
              </Typography>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => handleDeleteReview(entry.id)}
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
