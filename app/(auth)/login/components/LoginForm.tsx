'use client'
import { FormEvent, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormSchema } from '@/schemas/auth.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-4 sm:w-1/2"
            >
                <Input
                    {...register('email')}
                    placeholder="Email"
                    autoComplete="off"
                />
                {errors.email?.message && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
                <Input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    autoComplete="off"
                />
                {errors.password?.message && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                )}
                <Button
                    className="animate-pulse"
                    type="submit"
                >
                    Sign In
                </Button>
            </form>
        </div>
    )
}

export default LoginForm;