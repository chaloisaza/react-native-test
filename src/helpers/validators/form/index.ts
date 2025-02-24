import { z } from 'zod';

const useFormValidators = () => {
  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(20, 'Name must be less than 50 characters'),
    surname: z
      .string()
      .min(2, 'Surname must be at least 2 characters')
      .max(50, 'Surname must be less than 50 characters'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    phone: z
      .string()
      .min(9, 'Phone number must be at least 9 digits')
      .max(11, 'Phone number must not exceed 11 digits')
      .regex(/^\d+$/, 'Phone number must contain only digits'),
  });

  return {
    formSchema,
  };
};

export default useFormValidators;
