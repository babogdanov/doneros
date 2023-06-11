export const ERROR = {
  login: {
    emailRequired: 'Please enter your email.',
    passwordRequired: 'Password is required and must be at least 6 characters long.',
  },
  register: {
    confirmPassword: 'Passwords do not match.',
  },
  menuItem: {
    nameRequired: "Please enter the menu item's name",
    descriptionRequired: (length: number) =>
      `Please enter a description of at least ${length} characters`,
  },
  generic: {
    pictureUrlRequried: 'Please enter a valid picture URL',
  },
}
