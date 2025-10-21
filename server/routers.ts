import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscription: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSubscription(ctx.user.id);
    }),
  }),

  brandPositioning: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBrandPositionings(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getBrandPositioning(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        language: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createBrandPositioning({
          userId: ctx.user.id,
          name: input.name,
          language: input.language ?? 'ja',
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional(),
          status: z.enum(['draft', 'in_progress', 'completed']).optional(),
          currentStep: z.number().optional(),
          brandName: z.string().optional(),
          brandingType: z.string().optional(),
          inspirationData: z.string().optional(),
          icpData: z.string().optional(),
          competitorsData: z.string().optional(),
          brandValuesData: z.string().optional(),
          selectedArchetype: z.string().optional(),
          reportData: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updateBrandPositioning(input.id, input.data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await db.deleteBrandPositioning(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

