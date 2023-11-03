'use server'

import prisma from '@/lib-server/prisma';
import { z } from 'zod';
import { RegistrationFormSchema } from '@/schemas/auth.schema';

type Inputs = z.infer<typeof RegistrationFormSchema>;

export const addUser = async (data: Inputs) => {
    const result = RegistrationFormSchema.safeParse(data);

    if (result.success) {
        const { name, email, password } = result.data;
        try {
            const user = await prisma.user.create({
                data: { name, email, password }
            });

            if (user) {
                return { success: true, response: 'User was created successful.' };
            }
        } catch (error) {
            return { success: false, error };
        }
    } else if (result.error) {
        return { success: false, error: result.error.format() };
    }
};