import { FunctionComponent } from 'react';

import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './guards/RequireAuth';

import { Login, Public, Private } from '@/pages';
import GratitudeForm from '@/pages/Public/GratitudeForm';
import ReviewForm from '@/pages/Public/ReviewForm';
import ReviewAndGratitudePage from '@/pages/Public/ReviewAndGratitudePage';
import GratitudeDetailsPage from '@/pages/Public/GratitudeDetailsPage';
import ReviewDetailsPage from '@/pages/Public/ReviewDetailsPage';

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route path="/gratitude" element={<GratitudeForm />} />
      <Route path="/review" element={<ReviewForm />} />
      <Route path="/journal" element={<ReviewAndGratitudePage />} />
      <Route path="/gratitude/:id" element={<GratitudeDetailsPage />} />
      <Route path="/review/:id" element={<ReviewDetailsPage />} />

      {/* Protected Routes */}

      <Route
        path="/protected"
        element={
          <RequireAuth>
            <Private />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
