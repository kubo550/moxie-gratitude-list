import { useParams, useNavigate, Link } from 'react-router-dom';
import { LocalStorage } from '@/contexts/localStorage';
import {
  Button,
  Typography,
  Box,
  Icon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useState } from 'react';
import { format } from 'date-fns';
import { colors } from '../../theme';
import { BackgroundImage } from '@/components/BackgroundImage';

type ReviewItem = {
  id: number;
  createdAt: string;
  questions: {
    checked?: boolean;
    description?: string;
  }[];
};

const questionsLabels = [
  'Was I resentful, selfish, dishonest or afraid?',
  'Do I owe an apology?',
  'Did I keep something to myself which should be discussed with another person at once?',
  'Was I kind and loving toward all?',
  'What could I have done better?',
  'Was I thinking of myself most of the time? Or was I thinking of what I could do for others, of what I could pack into the stream of life?',
  "Write down anything else below that should be included in the day's inventory:"
];

export default function ReviewDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const storage = LocalStorage.getInstance();
  const items = storage.getArrayItem<ReviewItem>('reviewEntries');

  const entry = items.find((item) => item.id.toString() === id);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!entry) {
    return <Typography variant="h6">Entry not found</Typography>;
  }

  const handleDeleteReview = () => {
    storage.removeArrayItemById<ReviewItem>('reviewEntries', entry.id.toString());
    navigate('/journal');
  };
  return (
    <BackgroundImage>
      <div
        className="mx-auto mt-10 max-w-3xl space-y-6"
        style={{
          padding: '20px',
          backgroundColor: colors.backgroundColor,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Daily Review
        </Typography>

        <Typography variant="body2" color="textSecondary" display="block" sx={{ mt: 1, textAlign: 'center' }}>
          {format(new Date(entry.createdAt), 'dd MMM yyyy, HH:mm')}
        </Typography>

        {entry.questions.map((q, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {index + 1}. {questionsLabels[index]}
            </Typography>
            {typeof q.checked === 'boolean' && (
              <Typography variant="body2" color={q.checked ? 'success.main' : 'text.secondary'}>
                Switch: {q.checked ? 'Yes' : 'No'}
              </Typography>
            )}
            {q.description && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {q.description}
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}

        <Button
          component={Link}
          to="/journal"
          variant="contained"
          startIcon={<Icon>chevron_left</Icon>}
          sx={{
            backgroundColor: '#9f6444',
            color: '#fff',
            fontWeight: 'bold'
          }}
        >
          Back
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={() => setConfirmOpen(true)}
          startIcon={<Icon>delete</Icon>}
          sx={{ ml: 5 }}
        >
          Delete
        </Button>

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          PaperProps={{
            sx: {
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              minWidth: { xs: '280px', sm: '400px' },
              backgroundColor: 'rgba(70,35,21,0.5)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              padding: 2,
              color: '#333'
            }
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              color: '#FFD2B5',
              pb: 1
            }}
          >
            Confirm Deletion
          </DialogTitle>
          <DialogContent dividers sx={{ pt: 0, color: '#FFF6EE', fontSize: '1.1rem' }}>
            <Typography sx={{ mb: 2, textAlign: 'center' }}>Are you sure you want to delete this entry?</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pt: 1 }}>
            <Button
              onClick={() => setConfirmOpen(false)}
              sx={{
                backgroundColor: '#9f6444',
                color: '#fff',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteReview}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </BackgroundImage>
  );
}
