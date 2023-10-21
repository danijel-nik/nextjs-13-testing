import ReactHookForm from './components/ReactHookForm';
import ReactHookFormZod from './components/ReactHookFormZod';

export default function ReactHookFormPage() {
    return (
        <>
            <h1 className="mb-16 text-2xl font-medium">React Hook Form</h1>
            <ReactHookFormZod />
        </>
    )
}