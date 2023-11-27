'use client'

import { trpc } from "@/lib-client/trpc-client";

const TrpcTestComponent = () => {
    const getTodos = trpc.getTodos.useQuery();
    return (
        <div>{JSON.stringify(getTodos.data)}</div>
    );
};

export default TrpcTestComponent;