import { publicProcedure, router } from "./trpc";
import { FormDataSchema } from '@/schemas/ReactHookForm.schema';

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return [10, 20, 30, 40, 50];
    }),
    addForm: publicProcedure
        .input(FormDataSchema)
        .mutation(async ({ input }) => {
            return input;
        }),
});

export type AppRouter = typeof appRouter;