'use client'
import { FormEvent, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormSchema } from '@/schemas/auth.schema';

type FormInputs = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (session) {
            let callbackUrl = searchParams.get('callbackUrl');
            if (callbackUrl) {
                let path = new URL(callbackUrl).pathname;
                router.push(path);
            } else {
                router.push('/');
            }
        }
    }, [session]);

    const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInputs>({
		resolver: zodResolver(LoginFormSchema)
	});

    const handleLoginWithFormData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData);
        await signIn('credentials', {
            ...formDataObject,
            redirect: true
        });
    };

    const handleLogin: SubmitHandler<FormInputs> = async (data) => {
        await signIn('credentials', {
            ...data,
            redirect: true
        });
    };

    return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="mb-16 text-2xl font-medium text-center">Sign in</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    {...register('email')}
                    placeholder="Email"
                    required
                />
                {errors.email?.message && (
					<p className="text-sm text-red-400">{errors.email.message}</p>
				)}
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    required
                />
                {errors.password?.message && (
					<p className="text-sm text-red-400">{errors.password.message}</p>
				)}
                <button
                    className="text-white font-bold animate-pulse"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default LoginForm;