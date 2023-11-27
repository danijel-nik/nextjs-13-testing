'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormDataSchema } from '@/schemas/ReactHookForm.schema';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useAddFormMutation } from '@/redux/services/formApi';

type Inputs = z.infer<typeof FormDataSchema>;

const ReduxMutations = () => {
	const [addForm, result] = useAddFormMutation();

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
		reset();
		await addForm(data);
	}

	return (
		<section className="flex gap-6">
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
				<pre>{result?.data && JSON.stringify(result.data, null, 2)}</pre>
			</div>
		</section>
	);
};

export default ReduxMutations;