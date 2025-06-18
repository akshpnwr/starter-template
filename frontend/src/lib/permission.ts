import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */

export type PermissionAction<T extends keyof typeof statement> =
  (typeof statement)[T][number];
export type PermissionResource = keyof typeof statement;

export type Permissions = {
  [K in PermissionResource]?: PermissionAction<K>[];
};

const statement = {
  ...defaultStatements,
  project: ['create', 'share', 'update', 'delete'],
  lead: ['create', 'share', 'update', 'delete', 'list'],
} as const;

const ac = createAccessControl(statement);

const user = ac.newRole({
  project: ['create'],
  lead: ['list'],
});

const admin = ac.newRole({
  project: ['create', 'update'],
  lead: ['create', 'share', 'update', 'delete', 'list'],
  ...adminAc.statements,
});

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export { ac, admin, user, Role };
