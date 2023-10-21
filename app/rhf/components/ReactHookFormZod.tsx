'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormDataSchema } from '@/schemas/ReactHookForm.schema';

type Inputs = z.infer<typeof FormDataSchema>;

const ReactHookFormZod = () => {
	const [data, setData] = useState<Inputs>();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors }
	} = useForm<Inputs>({
		resolver: zodResolver(FormDataSchema)
	});

	const processForm: SubmitHandler<Inputs> = (data) => {
		reset();
		setData(data);
	}

	return (
		<section className="flex gap-6">
			<form
				onSubmit={handleSubmit(processForm)}
				className="flex flex-1 flex-col gap-4 sm:w-1/2"
			>
				<input
					className="rounded-lg text-black py-1 px-2"
					placeholder="Name"
					{...register('name')}
				/>
				{errors.name?.message && (
					<p className="text-sm text-red-400">{errors.name.message}</p>
				)}

				<textarea
					className="rounded-lg text-black py-1 px-2"
					placeholder="Message"
					{...register('message')}
				/>
				{errors.message?.message && (
					<p className="text-sm text-red-400">{errors.message.message}</p>
				)}

				<button
					type="submit"
					className="rounded-lg bg-cyan-600 hover:bg-cyan-700 py-2 text-white transition-all"
				>
					Submit
				</button>
			</form>

			<div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</section>
	);
};

export default ReactHookFormZod;