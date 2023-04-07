import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Enter your password'
  })
});

export const load = (async (event) => {
  // Server API:
  const form = await superValidate(event, schema);

  // Always return { form } in load and form actions.
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    // Same syntax as in the load function
    const form = await superValidate(event, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, always return { form } and things will just work.
      return fail(400, { form });
    }
    // TODO: Do something with the validated data
    throw redirect(302, '/');
    // Yep, return { form } here too
    return { form };
  }
} satisfies Actions;