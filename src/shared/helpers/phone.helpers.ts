export function formatPhoneNumber(phoneNumber: string): string {
  // Remove any existing hyphens, spaces, or parentheses
  phoneNumber = phoneNumber.replace(/[- ()]/g, '');

  // Check if the phone number starts with a '+'
  if (phoneNumber[0] !== '+') {
    throw new Error("Phone number must start with a '+'");
  }

  // Extract the country code (1 to 3 digits)
  let countryCode = '';
  let restOfNumber = '';

  if (phoneNumber.length >= 12 && phoneNumber.length <= 14) {
    countryCode = phoneNumber.slice(1, phoneNumber.length - 10);
    restOfNumber = phoneNumber.slice(phoneNumber.length - 10);
  } else {
    throw new Error('Invalid phone number format');
  }

  // Ensure the rest of the number has exactly 10 digits
  if (restOfNumber.length !== 10) {
    throw new Error(
      'The phone number must have exactly 10 digits after the country code'
    );
  }

  // Format the rest of the number
  let formattedNumber = `+${countryCode}-${restOfNumber.slice(0, 3)}-${restOfNumber.slice(3, 6)}-${restOfNumber.slice(6)}`;
  return formattedNumber;
}
