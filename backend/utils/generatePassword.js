function generatePassword(noLetters, noNumbers, noSymbols) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  let password = '';
  
  // Generate letters
  for (let i = 0; i < noLetters; i++) {
    password += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Generate numbers
  for (let i = 0; i < noNumbers; i++) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  // Generate symbols
  for (let i = 0; i < noSymbols; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  
  // Shuffle the password to ensure random distribution
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

module.exports = generatePassword;
