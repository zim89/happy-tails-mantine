import Checkbox from '@/components/Checkbox';
import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { cn } from '@/shared/lib/utils';
import { Card, Divider, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

type Props = {
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};

export default function DeliveryForm({ form }: Props) {
  return (
    <Card>
      <h3 className='mb-2 text-xl/6 font-bold'>Delivery Options</h3>
      <Divider className='mb-6' />

      {/*Input Email*/}
      <div>
        <TextInput
          withAsterisk
          label='Email'
          classNames={{
            wrapper: 'mb-6',
            input: cn(
              'form-input h-full max-w-[40.8rem]',
              form?.errors?.email && 'form-error--input'
            ),
            root: 'form-root',
            label: 'form-label',
            error: 'form-error',
          }}
          {...form.getInputProps('email')}
        />
      </div>

      <div
        className={
          'mb-11 grid max-w-[40.75rem] grid-cols-1 gap-4 gap-y-6 md:grid-cols-2 '
        }
      >
        {/*Input First Name*/}
        <div>
          <TextInput
            withAsterisk
            label='First name'
            classNames={{
              input: cn(
                'form-input h-full max-w-[26rem]',
                form.getInputProps('address.firstName').error && 'form-error--input'
              ),
              root: 'form-root',
              label: 'form-label',
              error: 'form-error',
            }}
            {...form.getInputProps('address.firstName')}
          />
        </div>

        {/*Input Second Name*/}
        <div>
          <TextInput
            withAsterisk
            label='Second name'
            classNames={{
              input: cn(
                'form-input h-full max-w-[26rem]',
                form.getInputProps('address.secondName').error && 'form-error--input'
              ),
              root: 'form-root',
              label: 'form-label',
              error: 'form-error',
            }}
            {...form.getInputProps('address.secondName')}
          />
        </div>

        {/*Input Country*/}
        <div>
          <TextInput
            label='Country'
            classNames={{
              input: cn(
                'form-input h-full max-w-[26rem]',
                form.getInputProps("address.country").error && 'form-error--input'
              ),
              root: 'form-root',
              label: 'form-label',
              error: 'form-error',
            }}
            {...form.getInputProps('address.country')}
          />
        </div>

        {/*Input City*/}
        <div>
          <TextInput
            label='City'
            classNames={{
              input: cn(
                'form-input h-full max-w-[26rem]',
                form.getInputProps('address.city').error && 'form-error--input'
              ),
              root: 'form-root',
              label: 'form-label',
              error: 'form-error',
            }}
            {...form.getInputProps('address.city')}
          />
        </div>

        {/*Input Street*/}
        <div>
          <TextInput
            label='Street'
            classNames={{
              input: cn(
                'form-input h-full max-w-[26rem]',
                form.getInputProps('address.street').error && 'form-error--input'
              ),
              root: 'form-root',
              label: 'form-label',
              error: 'form-error',
            }}
            {...form.getInputProps('address.street')}
          />
        </div>

        {/*Input Apartment*/}
        <div>
          <TextInput
            label='Apartment'
            classNames={{
              input: cn(
                'form-input h-full max-w-[26rem]',
                form.getInputProps('address.apartment').error && 'form-error--input'
              ),
              root: 'form-root',
              label: 'form-label',
              error: 'form-error',
            }}
            {...form.getInputProps('address.apartment')}
          />
        </div>
      </div>

      <Checkbox
        label='Billing Address Same As Delivery'
        classNames={{
          root: 'group',
          body: 'checkbox-body',
          inner: 'checkbox-inner',
          input: 'checkbox-input',
          label: 'checkbox-label',
        }}
        {...form.getInputProps('billingAddress.sameAsDelivery', {
          type: 'checkbox',
        })}
      />

      {!form.values.billingAddress.sameAsDelivery && (
        <>
          <h3 className='mb-2 mt-6 text-xl/6 font-bold'>Billing Options</h3>
          <div
            className={
              'grid max-w-[40.75rem] grid-cols-1 gap-4 gap-y-6 md:grid-cols-2'
            }
          >
            {/*Input First Name*/}
            <div>
              <TextInput
                withAsterisk
                label='First name'
                classNames={{
                  input: cn(
                    'form-input h-full max-w-[26rem]',
                    form.getInputProps('address.apartment').error && 'form-error--input'
                  ),
                  root: 'form-root',
                  label: 'form-label',
                  error: 'form-error',
                }}
                {...form.getInputProps('billingAddress.firstName')}
              />
            </div>

            {/*Input Second Name*/}
            <div>
              <TextInput
                withAsterisk
                label='Second name'
                classNames={{
                  input: cn(
                    'form-input h-full max-w-[26rem]',
                    form.getInputProps('address.apartment').error && 'form-error--input'
                  ),
                  root: 'form-root',
                  label: 'form-label',
                  error: 'form-error',
                }}
                {...form.getInputProps('billingAddress.secondName')}
              />
            </div>

            {/*Input Country*/}
            <div>
              <TextInput
                label='Country'
                classNames={{
                  input: cn(
                    'form-input h-full max-w-[26rem]',
                    form.getInputProps('address.apartment').error && 'form-error--input'
                  ),
                  root: 'form-root',
                  label: 'form-label',
                  error: 'form-error',
                }}
                {...form.getInputProps('billingAddress.country')}
              />
            </div>

            {/*Input City*/}
            <div>
              <TextInput
                label='City'
                classNames={{
                  input: cn(
                    'form-input h-full max-w-[26rem]',
                    form.getInputProps('address.apartment').error && 'form-error--input'
                  ),
                  root: 'form-root',
                  label: 'form-label',
                  error: 'form-error',
                }}
                {...form.getInputProps('billingAddress.city')}
              />
            </div>

            {/*Input Street*/}
            <div>
              <TextInput
                label='Street'
                classNames={{
                  input: cn(
                    'form-input h-full max-w-[26rem]',
                    form.getInputProps('address.apartment').error && 'form-error--input'
                  ),
                  root: 'form-root',
                  label: 'form-label',
                  error: 'form-error',
                }}
                {...form.getInputProps('billingAddress.street')}
              />
            </div>

            {/*Input Apartment*/}
            <div>
              <TextInput
                label='Apartment'
                classNames={{
                  input: cn(
                    'form-input h-full max-w-[26rem]',
                    form.getInputProps('address.apartment').error && 'form-error--input'
                  ),
                  root: 'form-root',
                  label: 'form-label',
                  error: 'form-error',
                }}
                {...form.getInputProps('billingAddress.apartment')}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
