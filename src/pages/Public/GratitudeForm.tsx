import { Button, Icon } from '@mui/material';
import { Link } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';

type GratitudeFormInputs = {
  title: string;
  explanation: string;
};

export default function GratitudeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<GratitudeFormInputs>();

  const onSubmit: SubmitHandler<GratitudeFormInputs> = (data) => {
    console.log('Zapisano dane:', data);
    reset(); // opcjonalnie czyści formularz po zapisie
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 max-w-md space-y-4">
      <h2 className="text-center text-2xl font-semibold">Gratitude</h2>

      <div>
        <label className="mb-1 block font-medium">What are you grateful for?</label>
        <input
          {...register('title', { required: 'This field is required' })}
          type="text"
          placeholder="e.g. Sun"
          className="w-full rounded p-2 text-gray-800"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block font-medium">Explanation</label>
        <textarea
          {...register('explanation', { required: 'This field is required' })}
          placeholder="e.g. Today the sun was shining and the walk was wonderful."
          className="h-28 w-full resize-none rounded p-2 text-gray-800"
        />
        {errors.explanation && <p className="mt-1 text-sm text-red-500">{errors.explanation.message}</p>}
      </div>

      <Button type="submit" variant="contained" color="success" fullWidth>
        Save
      </Button>
      <Button component={Link} to="/" variant="outlined" startIcon={<Icon>chevron_left</Icon>} fullWidth sx={{ mt: 2 }}>
        Cancel
      </Button>
    </form>
  );
}
