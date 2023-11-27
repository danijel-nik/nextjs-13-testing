import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormDataSchema } from '@/schemas/ReactHookForm.schema';
import { z } from 'zod';

type Form = z.infer<typeof FormDataSchema>;
type FormWithId = {
    id: string
    name: string
    message: string
};

export const formApi = createApi({
    reducerPath: "formApi",
    refetchOnFocus: false,
    baseQuery: fetchBaseQuery({
        baseUrl: "/api"
    }),
    tagTypes: ['Forms'],
    endpoints: (builder) => ({
        getForms: builder.query<Form[], void>({
            query: () => "/forms"
        }),
        getForm: builder.query<Form, string>({
            query: (id) => `/forms/${id}`
        }),
        addForm: builder.mutation<Form, Form>({  // response: Form; accepts as parameter: Form
            query: (data) => ({
                url: '/form',
                method: 'POST',
                body: data,
            })
        }),
        updateForm: builder.mutation<Form, FormWithId>({  // response: Form; accepts as parameter: Form
            query: ({ id, ...rest }) => ({
                url: '/form',
                method: 'PUT',
                body: rest,
            })
        }),
        deleteForm: builder.mutation<void, string>({  // response: void; accepts as parameter: string
            query: (id) => ({
                url: `/form/${id}`,
                method: 'DELETE'
            })
        })
    }),
});

export const {
    useGetFormsQuery,
    useGetFormQuery,
    useAddFormMutation,
    useUpdateFormMutation,
    useDeleteFormMutation
} = formApi;