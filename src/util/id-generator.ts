import * as uuid from 'uuid/v1';

export function generateUniqueId(): string {
  return uuid();
}
