export const loginFormRules = {
  username: {
    required: 'Username is required',
  },
  password: {
    required: 'Password is required',
  },
  newPassword: {
    required: 'New password is required',
    minLength: {
      value: 8,
      message: 'New password must be at least 8 characters',
    },
    validate: {
      hasLowerCase: (value: string | undefined) =>
        (value !== undefined && /[a-z]/.test(value)) ||
        'New password must contain at least one lowercase letter',
      hasUpperCase: (value: string | undefined) =>
        (value !== undefined && /[A-Z]/.test(value)) ||
        'New password must contain at least one uppercase letter',
      hasNumber: (value: string | undefined) =>
        (value !== undefined && /[0-9]/.test(value)) ||
        'New password must contain at least one number',
      hasSymbol: (value: string | undefined) =>
        (value !== undefined && /[^\w\s]/.test(value)) ||
        'New password must contain at least one symbol from the allowed list: ^ $ * . [ ] { } ( ) ? " ! @ # % & / \\ , > < \' : ; | _ ~ ` = + -',
    },
  },
  mfaCode: {
    required: 'MFA code is required',
  },
}
