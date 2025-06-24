import { Button, Icon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Public = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-3 bg-slate-900 text-white">
      <Typography variant="h1">moxie gratitude list</Typography>
      <div className="flex flex-row space-x-4">
        <Button component={Link} variant="contained" to="/gratitude" endIcon={<Icon>chevron_right</Icon>}>
          Gratitude
        </Button>
        <Button component={Link} variant="contained" to="/Review" endIcon={<Icon>chevron_right</Icon>}>
          Review
        </Button>
      </div>
      <Button component={Link} variant="contained" to="/review_and_gratitude" endIcon={<Icon>chevron_right</Icon>}>
        Nightly Review and Gratitude
      </Button>
      <Button component={Link} variant="contained" to="/protected" endIcon={<Icon>chevron_right</Icon>}>
        Go to private page
      </Button>
    </main>
  );
};
