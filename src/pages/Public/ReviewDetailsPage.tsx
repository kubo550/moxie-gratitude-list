import { useParams, Link } from 'react-router-dom';
import { LocalStorage } from '@/contexts/localStorage';
import { Button, Typography, Box, Icon, Divider } from '@mui/material';

type ReviewEntry = {
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
  const { id } = useParams<{ id: string }>();
  const storage = LocalStorage.getInstance();
  const items = storage.getArrayItem<ReviewEntry>('reviewEntries');

  const entry = items.find((item) => item.id.toString() === id);

  if (!entry) {
    return <Typography variant="h6">Entry not found</Typography>;
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-6">
      <Typography variant="h4" gutterBottom>
        Daily Review
      </Typography>

      <Typography variant="body2" color="textSecondary">
        {new Date(entry.createdAt).toLocaleString()}
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

      <Button component={Link} to="/review_and_gratitude" variant="contained" startIcon={<Icon>chevron_left</Icon>}>
        Back
      </Button>
    </div>
  );
}
