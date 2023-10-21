import Image from 'next/image';
import SimpleForm from '@/app/simple-form/components/SimpleForm';

export default function SimpleFormPage() {
    return (
        <>
            <h1 className="mb-16 text-2xl font-medium">Simple Form</h1>
            <SimpleForm />
        </>
    )
}