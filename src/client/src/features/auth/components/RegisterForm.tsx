import React from 'react';
import * as z from 'zod';

import { Button } from '../../../components/Elements';
import { Form, InputField } from '../../../components/Form';
import { useAuth } from '../../../libs/auth';
import { useNotificationStore } from '../../../stores/notifications';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  first_name: z.string().min(1, 'Required'),
  last_name: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { addNotification } = useNotificationStore();
  const { register, isRegistering } = useAuth();

  return (
    <div>
      <Form<CreateAccountData, typeof schema>
        onSubmit={async (values) => {
          const response = await register(values);
          if (response.profile) {
            onSuccess();
          } else {
            addNotification({
              type: 'error',
              title: 'Failed to register',
              message: response.error,
            });
          }
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField type="email" label="Email" error={formState.errors['email']} registration={register('email')} />
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['first_name']}
              registration={register('first_name')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['last_name']}
              registration={register('last_name')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button isLoading={isRegistering} type="submit" variant="inverse" className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
