'use server'

import { z } from 'zod';
import { FormDataSchema } from '@/schemas/ReactHookForm.schema';

type Inputs = z.infer<typeof FormDataSchema>;

export const addEntry = async (data: Inputs) => {
    const results = FormDataSchema.safeParse(data);

    if (results.success) {
        return { success: true, data: results.data };
    }

    if (results.error) {
        return { success: false, error: results.error.format() };
    }
};