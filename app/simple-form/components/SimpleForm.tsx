'use client'
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';

const SimpleForm = () => {
	const [data, setData] = useState();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const formDataObject = Object.fromEntries(formData);

		const data = await fetch('/api/form', {
			method: 'POST',
			body: JSON.stringify(formDataObject)
		}).then(res => res.json());

		setData(data);
		form.reset();
	};

	return (
		<section className="flex gap-6">
			<form
				onSubmit={handleSubmit}
				className="flex flex-1 flex-col gap-4 sm:w-1/2"
			>
				<Input
					name="name"
					placeholder="Name"
					required
				/>

				<Textarea
					name="message"
					placeholder="Message"
					required
				/>

				<Button variant="secondary" type="submit">
					Submit
				</Button>
			</form>

			<div className="flex-1 rounded-lg bg-secondary p-8">
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</section>
	);
};

export default SimpleForm;