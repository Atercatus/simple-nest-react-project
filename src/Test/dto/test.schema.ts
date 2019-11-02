import { object, string, number } from '@hapi/joi';

export const testSchema = object({
  head: string().alphanum(),
  body: [string(), number()],
});
