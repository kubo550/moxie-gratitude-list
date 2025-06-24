import React from 'react';
import { useNavigate } from 'react-router-dom';

// TODO fixme: this is a temporary solution to have a page with two buttons to navigate to gratitude and review forms
const ReviewAndGratitudePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1>Wybierz opcję</h1>
      </div>
      <button
        style={{ padding: '12px 24px', fontSize: '16px', marginBottom: '12px' }}
        onClick={() => navigate('/gratitude')}
      >
        Gratitude
      </button>
      <button style={{ padding: '12px 24px', fontSize: '16px' }} onClick={() => navigate('/review')}>
        Review
      </button>
    </div>
  );
};

export default ReviewAndGratitudePage;
