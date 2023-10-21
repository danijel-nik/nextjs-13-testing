'use client'
import { FormEvent, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation'

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

    const handleSubimt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData);
        await signIn('credentials', {
            ...formDataObject,
            redirect: true
        });
    };

    return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="mb-16 text-2xl font-medium text-center">Sign in</h1>
            <form onSubmit={handleSubimt}>
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="block rounded-lg text-black py-1 px-2 mb-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
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