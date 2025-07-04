import background from '../assets/sunset-baclground.png';

export const BackgroundImage = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${background})`,
      paddingTop: '64px',
      paddingLeft: '16px',
      paddingRight: '16px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
      overflowY: 'auto'
    }}
  >
    {children}
  </div>
);
