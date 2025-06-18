import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  project: ['create', 'share', 'update', 'delete'],
} as const;

const ac = createAccessControl(statement);

const user = ac.newRole({
  project: ['create'],
});

const admin = ac.newRole({
  project: ['create', 'update'],
  ...adminAc.statements,
});

enum RolesEnum {
  user = 'user',
  admin = 'admin',
}

export { ac, RolesEnum, admin, user };
