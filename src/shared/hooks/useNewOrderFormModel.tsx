import { hasLength, isNotEmpty, useForm } from '@mantine/form';

export type NewOrderFields = {
  items: string[];
  email: string;
  address: {
    firstName: string;
    secondName: string;
    country: string;
    city: string;
    street: string;
    apartment: string;
  };
  billingAddress: {
    sameAsDelivery: boolean;
    firstName: string;
    secondName: string;
    country: string;
    city: string;
    street: string;
    apartment: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  sendEmail: boolean;
  comment: string;
};

export const useModel = () => {
  return useForm<NewOrderFields>({
    initialValues: {
      items: [],
      email: '',

      address: {
        firstName: '',
        secondName: '',
        country: '',
        city: '',
        street: '',
        apartment: '',
      },

      billingAddress: {
        sameAsDelivery: true,
        firstName: '',
        secondName: '',
        country: '',
        city: '',
        street: '',
        apartment: '',
      },
      shippingMethod: '',
      paymentMethod: 'card',
      sendEmail: true,
      comment: '',
    },

    validate: {
      items: (value) => (value.length <= 0 ? 'Choose an item' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      address: {
        firstName: hasLength({ min: 2 }, 'Enter your first name'),
        secondName: hasLength({ min: 2 }, 'Enter your last name'),
        country: isNotEmpty('Enter your country'),
        city: isNotEmpty('Enter your city'),
        street: isNotEmpty('Enter your street'),
        apartment: isNotEmpty('Enter your apartment'),
      },
      billingAddress: {
        firstName: (value, values) =>
          values.billingAddress.sameAsDelivery
            ? null
            : hasLength({ min: 2 }, 'Enter your first name')(value),
        secondName: (value, values) =>
          values.billingAddress.sameAsDelivery
            ? null
            : hasLength({ min: 2 }, 'Enter your last name')(value),
        country: (value, values) =>
          values.billingAddress.sameAsDelivery
            ? null
            : isNotEmpty('Enter your country')(value),
        city: (value, values) =>
          values.billingAddress.sameAsDelivery
            ? null
            : isNotEmpty('Enter your city')(value),
        street: (value, values) =>
          values.billingAddress.sameAsDelivery
            ? null
            : isNotEmpty('Enter your street')(value),
        apartment: (value, values) =>
          values.billingAddress.sameAsDelivery
            ? null
            : isNotEmpty('Enter your apartment')(value),
      },
      shippingMethod: isNotEmpty('Choose shipping method'),
      paymentMethod: isNotEmpty('Choose payment method'),
    },
  });
};
