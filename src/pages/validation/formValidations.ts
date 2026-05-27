import * as yup from 'yup';

export const topicFormSchema = yup.object().shape({
  category: yup.string().required(),
  subCategory: yup.string().required(),
  title: yup.string().required(),
  url: yup.string().required(),
  order: yup.string().optional(),
});

export const categoryFormSchema = yup.object().shape({
  name: yup.string().required('Category name is required.'),
  abbr: yup.string().required('Abbreviation is required.'),
});

export const subCategoryFormSchema = yup.object().shape({
  categoryId: yup.string().required('Category is required field.'),
  name: yup.string().required('Sub Category name is required field.'),
  //order: yup.string().optional(),
  order: yup.string().required('please add a display order.'),
});

export const registerFormSchema = yup.object().shape({
  email: yup.string().required('email is required').email(),
  password: yup.string().required('password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

export const signUpFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required').email('Enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test(
      'password-strength',
      'Password must contain at least 3 of: lowercase letters, uppercase letters, numbers, special characters (!@#$%^&*)',
      (value) => {
        if (!value) return false;
        const checks = [
          /[a-z]/.test(value),
          /[A-Z]/.test(value),
          /[0-9]/.test(value),
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
        ];
        return checks.filter(Boolean).length >= 3;
      },
    ),
});
