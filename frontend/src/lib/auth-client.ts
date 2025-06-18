import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, adminClient } from 'better-auth/client/plugins';
import { ac, admin, user } from './permission';
import { AUTH_BASE_URL } from './constants';

export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: AUTH_BASE_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        phone: {
          type: 'string',
          required: true,
        },
      },
    }),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});
