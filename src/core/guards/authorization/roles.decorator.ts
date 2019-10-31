import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => {
  const ret = SetMetadata('roles', roles);
  console.log('META:', ret);
  return ret;
};
