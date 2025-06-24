import { Button, Icon, FormControlLabel, Switch, TextField, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

type ReviewFormInputs = {
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

export default function CheckQuestionsForm() {
  const { handleSubmit, control, watch, reset } = useForm<ReviewFormInputs>({
    defaultValues: {
      questions: questionsLabels.map(() => ({
        checked: false,
        description: ''
      }))
    }
  });

  const watchFields = watch('questions');

  const onSubmit: SubmitHandler<ReviewFormInputs> = (data) => {
    console.log('Answers:', data);
    reset({
      questions: questionsLabels.map(() => ({
        checked: false,
        description: ''
      }))
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Daily Review Form
      </Typography>

      {questionsLabels.map((label, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          {index < 5 ? (
            <>
              <Controller
                name={`questions.${index}.checked` as const}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label={`${index + 1}. ${label}`}
                  />
                )}
              />

              {watchFields?.[index]?.checked && (
                <Controller
                  name={`questions.${index}.description` as const}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={2}
                      sx={{ mt: 1 }}
                      placeholder="Add details..."
                    />
                  )}
                />
              )}
            </>
          ) : (
            <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {`${index + 1}. ${label}`}
              </Typography>
              <Controller
                name={`questions.${index}.description` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Write your response..."
                  />
                )}
              />
            </>
          )}
        </Box>
      ))}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save
      </Button>

      <Button component={Link} to="/" variant="outlined" startIcon={<Icon>chevron_left</Icon>} fullWidth sx={{ mt: 2 }}>
        Cancel
      </Button>
    </form>
  );
}
