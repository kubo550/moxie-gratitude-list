import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Icon,
  Card,
  CardContent,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorage } from '@/contexts/localStorage';
import { format } from 'date-fns';

import { colors } from '../../theme';
import { BackgroundImage } from '@/components/BackgroundImage';

type GratitudeEntry = {
  id: number;
  title: string;
  explanation: string;
  createdAt: string;
};

type ReviewEntry = {
  id: number;
  title: string;
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
  const gratitudeCount = storage.getArrayItem('gratitudeEntries').length;
  const reviewCount = storage.getArrayItem('reviewEntries').length;
  const totalCount = gratitudeCount + reviewCount;

  useEffect(() => {
    const storedGratitude = storage.getArrayItem<GratitudeEntry>('gratitudeEntries');
    const storedReview = storage.getArrayItem<ReviewEntry>('reviewEntries');
    setGratitudeEntries(storedGratitude);
    setReviewEntries(storedReview);
  }, [storage]);

  return (
    <BackgroundImage>
      <div
        className="mt-4 text-center"
        style={{
          color: '#ffead7'
        }}
      >
        <Typography variant="subtitle2" sx={{ paddingTop: '8px' }}>
          You have made a total of <strong>{totalCount}</strong> entries
        </Typography>
        <Typography variant="body2">
          {gratitudeCount} gratitude, {reviewCount} review
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            sx={{
              backgroundColor: 'rgba(57, 88, 98, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(57, 88, 98, 0.5)',
              color: '#ffead7',
              marginTop: 1,
              paddingY: 1.4,
              fontWeight: 'bold',
              borderRadius: 5,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(57, 88, 98, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: 5,
                boxShadow: '0 2px 10px 0 rgba(31, 38, 135, 0.6)',
                transform: 'scale(1.1)'
              }
            }}
            onClick={() => setOpen(true)}
            startIcon={<Icon>add</Icon>}
          >
            Add Entry
          </Button>
        </Box>
      </div>
      <div
        style={{
          marginTop: '4px',
          maxHeight: 'calc(100vh - 220px)',
          overflowY: 'auto'
        }}
      >
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
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
          <div
            style={{
              width: '100%',
              height: '100%',
              filter: 'brightness(50%)'
            }}
          ></div>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <DialogTitle
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                textAlign: 'center',
                color: '#FFD2B5',
                pb: 1
              }}
            >
              Entry Type
            </DialogTitle>

            <DialogContent dividers sx={{ pt: 0, color: '#FFF6EE', fontSize: '1.1rem' }}>
              <Typography sx={{ mb: 2, textAlign: 'center' }}>
                Would you like to conduct a &quot;nightly&quot; review or a gratitude list?
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  component={Link}
                  to="/gratitude"
                  variant="contained"
                  onClick={() => setOpen(false)}
                  sx={{
                    bgcolor: '#9f6444',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: 2,
                    paddingY: 1.2,
                    '&:hover': {
                      bgcolor: '#562100'
                    }
                  }}
                >
                  Gratitude
                </Button>

                <Button
                  component={Link}
                  to="/review"
                  variant="contained"
                  onClick={() => setOpen(false)}
                  sx={{
                    bgcolor: '#faa748',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: 2,
                    paddingY: 1.2,
                    '&:hover': {
                      bgcolor: '#562100'
                    }
                  }}
                >
                  Review
                </Button>
              </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pt: 1 }}>
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  backgroundColor: '#9f6444',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Gratitude List */}
        <div className="mx-auto max-w-2xl space-y-4 px-4">
          <Typography variant="h6" className="pt-2 text-center" sx={{ color: '#ffead7' }}>
            Gratitude Entries
          </Typography>
          {gratitudeEntries.length === 0 && <Typography color="#ffead7">No gratitude entries yet.</Typography>}
          {gratitudeEntries.map((entry) => (
            <Card
              key={entry.id}
              sx={{
                backgroundColor: colors.backgroundColor,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(150, 80, 49, 0.5)',
                color: '#ffead7',
                marginTop: 1,
                paddingY: 1,
                fontWeight: 'bold',
                borderRadius: 5,
                textTransform: 'none'
              }}
            >
              <CardContent className="flex flex-col items-center">
                <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'center', color: '#ffead7' }}>
                  {entry.title}
                </Typography>
                <Typography variant="h6" display="block" sx={{ mt: 1, textAlign: 'center', color: '#EFCFB4' }}>
                  {format(new Date(entry.createdAt), 'dd MMM yyyy, HH:mm')}
                </Typography>
                <Button
                  component={Link}
                  to={`/gratitude/${entry.id}`}
                  sx={{
                    backgroundColor: '#9f6444',
                    color: '#fff',
                    paddingX: 4,
                    paddingY: 1,
                    marginTop: 2,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderRadius: 12,
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    textTransform: 'none',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.6)',
                      transform: 'scale(1.1)'
                    },
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Review List */}
        <div className="mx-auto max-w-2xl space-y-4 px-4">
          <Typography variant="h6" className="pt-2 text-center" sx={{ color: '#ffead7' }}>
            Review Entries
          </Typography>
          {reviewEntries.length === 0 && <Typography color="#ffead7">No review entries yet.</Typography>}
          {reviewEntries.map((entry) => (
            <Card
              key={entry.id}
              sx={{
                backgroundColor: colors.backgroundColor,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(150, 80, 49, 0.5)',
                color: '#ffead7',
                marginTop: 1,
                paddingX: 2,
                paddingY: 1,
                fontWeight: 'bold',
                borderRadius: 5,
                textTransform: 'none'
              }}
            >
              <CardContent className="flex flex-col items-center">
                <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'center', color: '#ffead7' }}>
                  {entry.title}
                </Typography>
                <Typography variant="h6" display="block" sx={{ mt: 1, textAlign: 'center', color: '#EFCFB4' }}>
                  {format(new Date(entry.createdAt), 'dd MMM yyyy, HH:mm')}
                </Typography>
                <Button
                  component={Link}
                  to={`/review/${entry.id}`}
                  sx={{
                    backgroundColor: '#9f6444',
                    color: '#fff',
                    paddingX: 4,
                    paddingY: 1,
                    marginTop: 2,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderRadius: 12,
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    textTransform: 'none',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.6)',
                      transform: 'scale(1.1)'
                    },
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BackgroundImage>
  );
}
