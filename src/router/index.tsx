import { FunctionComponent } from 'react';

import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './guards/RequireAuth';

import { Login, Public, Private } from '@/pages';
import GratitudeForm from '@/pages/Public/GratitudeForm';
import ReviewForm from '@/pages/Public/ReviewForm';
import ReviewAndGratitudePage from '@/pages/Public/ReviewAndGratitudePage';

export const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route path="/gratitude" element={<GratitudeForm />} />
      <Route path="/review" element={<ReviewForm />} />
      <Route path="/review_and_gratitude" element={<ReviewAndGratitudePage />} />

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
