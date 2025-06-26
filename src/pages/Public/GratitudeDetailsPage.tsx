import { useParams, Link } from 'react-router-dom';
import { LocalStorage } from '@/contexts/localStorage';
import { Button, Typography, Icon } from '@mui/material';

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

  if (!entry) {
    return <Typography variant="h6">Entry not found</Typography>;
  }

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
    </div>
  );
}
