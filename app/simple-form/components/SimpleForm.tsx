'use client'
import { FormEvent, useState } from 'react';

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
				<input
					className="rounded-lg text-black py-1 px-2"
					name="name"
					placeholder="Name"
					required
				/>

				<textarea
					className="rounded-lg text-black py-1 px-2"
					name="message"
					placeholder="Message"
					required
				/>

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

export default SimpleForm;