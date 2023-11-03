'use client'
import { FormEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegistrationFormSchema } from '@/schemas/Auth.schema';

type FormInputs = z.infer<typeof RegistrationFormSchema>;

const RegistrationForm = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors }
	} = useForm<FormInputs>({
		resolver: zodResolver(RegistrationFormSchema)
	});

    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session]);

    const handleRegistration: SubmitHandler<FormInputs> = async (data) => {
        console.log(data);
    };

    return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="mb-16 text-2xl font-medium text-center">Registration</h1>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    {...register('name')}
                    placeholder="Full Name*"
                />
                {errors.name?.message && (
					<p className="text-sm text-red-400">{errors.name.message}</p>
				)}
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    {...register('email')}
                    placeholder="Email*"
                />
                {errors.email?.message && (
					<p className="text-sm text-red-400">{errors.email.message}</p>
				)}
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    type="password"
                    {...register('password')}
                    placeholder="Password*"
                />
                {errors.password?.message && (
					<p className="text-sm text-red-400">{errors.password.message}</p>
				)}
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm Password*"
                />
                {errors.confirmPassword?.message && (
					<p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
				)}
                <button
                    className="text-white font-bold animate-pulse"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegistrationForm;