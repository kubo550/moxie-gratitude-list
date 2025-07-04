import { AppBar, Toolbar, Button, Box, Typography, Icon, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const titlesMap: Record<string, string> = {
    '/journal': 'Journal',
    '/gratitude': 'Gratitude',
    '/review': 'Review'
  };

  const title = titlesMap[location.pathname] || '';

  return (
    <AppBar
      position="fixed"
      sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      style={{ background: '#000000', opacity: '0.7' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Puste miejsce lub logo po lewej */}
        <Box sx={{ width: 48 }} />
        {title && (
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none'
            }}
          >
            {title}
          </Typography>
        )}

        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <IconButton sx={{ color: '#fff', padding: '4px' }} aria-label="Go back">
            <Icon fontSize="small">chevron_left</Icon>
          </IconButton>
          <Button
            color="inherit"
            sx={{
              minWidth: 'auto',
              padding: 0,
              textTransform: 'none',
              color: '#fff',
              '&:hover': { backgroundColor: 'transparent' }
            }}
          >
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
