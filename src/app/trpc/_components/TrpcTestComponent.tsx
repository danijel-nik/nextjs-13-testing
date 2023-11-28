'use client'

import { trpc } from "@/lib-client/trpc-client";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormDataSchema } from '@/schemas/ReactHookForm.schema';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';

type Inputs = z.infer<typeof FormDataSchema>;

const TrpcTestComponent = () => {

    const getTodos = trpc.getTodos.useQuery();
    const addForm = trpc.addForm.useMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });

    const processForm: SubmitHandler<Inputs> = async (data) => {
        try {
            addForm.mutate(data);
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="flex gap-6 mb-10">
                <form
                    onSubmit={handleSubmit(processForm)}
                    className="flex flex-1 flex-col gap-4 sm:w-1/2"
                >
                    <Input
                        placeholder="Name"
                        {...register('name')}
                    />
                    {errors.name?.message && (
                        <p className="text-sm text-red-400">{errors.name.message}</p>
                    )}

                    <Textarea
                        placeholder="Message"
                        {...register('message')}
                    />
                    {errors.message?.message && (
                        <p className="text-sm text-red-400">{errors.message.message}</p>
                    )}

                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </form>

                <div className="flex-1 rounded-lg bg-secondary p-8">
                    <pre>{JSON.stringify(addForm.data, null, 2)}</pre>
                </div>
            </section>

            <section>
                <div>Test trpc query:</div>
                <div>{JSON.stringify(getTodos.data)}</div>
            </section>
        </>
    );
};

export default TrpcTestComponent;