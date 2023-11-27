"use client"

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUsersQuery, useGetUserByIdQuery } from "@/redux/services/userApi";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ReduxQueries = () => {
    const dispatch = useAppDispatch();
    const [userId, setUserId] = useState<string>('');
    const { isLoading, isFetching, data: users, error } = useGetUsersQuery(null, {});
    const { isLoading: userLoading, data: user, error: userError } = useGetUserByIdQuery({ id: userId }, { skip: userId === '' });

    return (
        <section className="flex flex-col gap-1">
            <div className="">
                <Input onChange={(e) => setUserId(e.currentTarget.value)} placeholder="Enter User ID" />
            </div>
            <div className="rounded-lg bg-secondary p-8 text-3xl h-[65vh] overflow-y-auto">
                {(isLoading || userLoading) ? (
                    <pre>Loading...</pre>
                ) : (error || userError) ? (
                    <pre>No results</pre>
                ) : (userId !== '' && user) ? (
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                ) : (
                    <ul>
                        {users?.map((userNode) => (
                            <li className="mb-12">
                                <pre>{JSON.stringify(userNode, null, 2)}</pre>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default ReduxQueries;