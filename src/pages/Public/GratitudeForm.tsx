import { Button, Icon, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { LocalStorage } from '@/contexts/localStorage';
import { BackgroundImage } from '@/components/BackgroundImage';

type GratitudeItem = {
  title: string;
  explanation: string;
};

type GratitudeFormInputs = {
  items: GratitudeItem[];
};

export default function GratitudeForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<GratitudeFormInputs>({
    defaultValues: {
      items: [{ title: '', explanation: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const onSubmit: SubmitHandler<GratitudeFormInputs> = (data) => {
    const storage = LocalStorage.getInstance();

    const newEntries = data.items.map((entry) => ({
      id: Date.now() + Math.random(),
      ...entry,
      createdAt: new Date().toISOString()
    }));

    newEntries.forEach((entry) => {
      storage.pushArrayItem('gratitudeEntries', entry);
    });

    reset({ items: [{ title: '', explanation: '' }] });
    navigate('/journal');
  };

  return (
    <BackgroundImage>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 max-w-md space-y-6">
        <h2 className="text-center text-2xl font-semibold">Gratitude</h2>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 border-b pb-4">
            <div>
              <label className="mb-1 block font-medium">What are you grateful for?</label>
              <TextField
                variant="outlined"
                {...register(`items.${index}.title`, { required: 'This field is required' })}
                type="text"
                placeholder="Sun"
                style={{
                  width: '100%'
                }}
              />
              {errors.items?.[index]?.title && (
                <p className="mt-1 text-sm text-red-500">{errors.items[index]?.title?.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-medium">Explanation</label>
              <TextField
                variant="outlined"
                {...register(`items.${index}.explanation`, { required: 'This field is required' })}
                placeholder="It brings warmth and light"
                style={{
                  width: '100%'
                }}
                multiline
              />
              {errors.items?.[index]?.explanation && (
                <p className="mt-1 text-sm text-red-500">{errors.items[index]?.explanation?.message}</p>
              )}
            </div>

            {fields.length > 1 && (
              <Button variant="outlined" color="error" onClick={() => remove(index)} startIcon={<Icon>delete</Icon>}>
                Remove
              </Button>
            )}
          </div>
        ))}

        <div className="flex justify-between gap-4">
          <Button
            variant="outlined"
            onClick={() => append({ title: '', explanation: '' })}
            startIcon={<Icon>add</Icon>}
            fullWidth
          >
            Add Another
          </Button>

          <Button type="submit" variant="contained" color="success" fullWidth>
            Save
          </Button>
        </div>

        <Button
          component={Link}
          to="/journal"
          variant="contained"
          color="error"
          startIcon={<Icon>chevron_left</Icon>}
          fullWidth
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </form>
    </BackgroundImage>
  );
}
