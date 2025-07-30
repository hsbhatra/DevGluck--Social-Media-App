// Helper function to validate email format
export const isValidEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

// --------------------------------------------------------------------

// Helper function to validate strong passwords for registration
export const isValidStrongPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*#?&]{9,}$/;
  return regex.test(password);
  // return true; // Placeholder for strong password validation
};

// --------------------------------------------------------------------