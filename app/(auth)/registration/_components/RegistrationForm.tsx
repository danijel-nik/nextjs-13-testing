'use client'
import { FormEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegistrationFormSchema } from '@/schemas/auth.schema';
import { addUser } from '@/actions/user.actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';

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

    const { mutate: registerUser } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            reset();
        }
    });

    const handleRegistration: SubmitHandler<FormInputs> = (data) => {
        registerUser(data);
    };

    return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="mb-16 text-2xl font-medium text-center">Registration</h1>
            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="flex flex-col gap-4 sm:w-1/2"
            >
                <Input
                    {...register('name')}
                    placeholder="Full Name*"
                />
                {errors.name?.message && (
                    <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
                <Input
                    {...register('email')}
                    placeholder="Email*"
                />
                {errors.email?.message && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
                <Input
                    type="password"
                    {...register('password')}
                    placeholder="Password*"
                />
                {errors.password?.message && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                )}
                <Input
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm Password*"
                />
                {errors.confirmPassword?.message && (
                    <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
                <Button
                    className="animate-pulse"
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </div>
    )
}

export default RegistrationForm;