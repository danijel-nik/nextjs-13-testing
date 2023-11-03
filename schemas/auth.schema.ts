import { z } from 'zod';

export const RegistrationFormSchema = z.object({
    name: z.string().nonempty('Name is required.'),
    email: z.string().email('Please provide a valid email.').nonempty('Email is required.'),
    password: z
        .string()
        .nonempty('Password is required.')
        .min(6, { message: 'Password must have at least 6 characters.' }),
    confirmPassword: z
        .string()
        .nonempty('Password is required.')
        .min(6, { message: 'Password must have at least 6 characters.' })
})
    .refine((data) => data.confirmPassword === data.password, {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    });
    // .refine(({ password, confirmPassword }) => password === confirmPassword, {
    //     message: 'Confirmed password doesn\'t match',
    //     path: ['confirmPassword']
    // });

    // .superRefine(({ password, confirmPassword }, ctx) => {
    //     if (password !== confirmPassword) {
    //         ctx.addIssue({
    //             code: 'custom',
    //             message: 'Confirmed password doesn\'t match',
    //             path: ['confirmPassword']
    //         });
    //     }
    // });

export const LoginFormSchema = z.object({
    email: z.string().email('Please provide a valid email.').nonempty('Email is required.'),
    password: z
        .string()
        .nonempty('Password is required.')
        .min(6, { message: 'Password must have at least 6 characters.' })
});