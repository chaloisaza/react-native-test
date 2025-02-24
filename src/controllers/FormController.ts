import { useState } from 'react';
import { Alert } from 'react-native';
import useValidators from '../helpers/validators';
import { z } from 'zod';
import useActions from '../api/actions';
import { FormData } from '../types/form';

const useFormController = () => {
  // helpers
  const { useFormValidators } = useValidators();
  const { formSchema } = useFormValidators();

  // actions
  const { useFormActions } = useActions();
  const { actSendForm } = useFormActions();

  // states
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
  });

  // functions
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const onSuccess = () => {
      Alert.alert('Success', 'Form submitted successfully!', [
        {
          text: 'Close',
          onPress: () => {
            setFormData({
              name: '',
              surname: '',
              email: '',
              phone: '',
            });
          },
        },
      ]);
    };

    const onError = (error: any) => {
      console.log('Error submitting form', error);

      Alert.alert('Error', 'Error submitting form', [
        {
          text: 'Close',
        },
      ]);
    };

    await actSendForm(formData, onSuccess, onError);
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path[0]]: curr.message,
          }),
          {},
        );
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  return {
    errors,
    formData,
    setErrors,
    setFormData,
    validateForm,
    handleSubmit,
    handleChange,
  };
};

export default useFormController;
