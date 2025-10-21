import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import * as aiGenerator from "./ai/generator";

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
      const subscription = await db.getUserSubscription(ctx.user.id);
      // Return default subscription if none exists
      if (!subscription) {
        return {
          id: '',
          userId: ctx.user.id,
          planType: 'free' as const,
          creditsRemaining: 0,
          creditsTotal: 0,
          status: 'active' as const,
          createdAt: new Date(),
          expiresAt: null,
        };
      }
      return subscription;
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

    generate: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const bp = await db.getBrandPositioning(input.id);
        if (!bp) throw new Error("Brand positioning not found");

        const context = {
          brandPositioningId: bp.id,
          brandName: bp.brandName ?? "",
          brandingType: bp.brandingType ?? "",
          inspiration: bp.inspirationData ?? undefined,
          icp: bp.icpData ?? undefined,
          competitors: bp.competitorsData ?? undefined,
          brandValues: bp.brandValuesData ?? undefined,
          selectedArchetype: bp.selectedArchetype ?? undefined,
          language: bp.language ?? "ja",
        };

        // Update status to in_progress immediately
        await db.updateBrandPositioning(input.id, {
          status: "in_progress",
          currentStep: 7,
        });

        // Start generation in background (don't await)
        console.log("[Generate] Starting background generation for:", input.id);
        aiGenerator.generateCompleteReport(context).then(() => {
          console.log("[Generate] Background generation completed for:", input.id);
        }).catch((error) => {
          console.error("[Generate] Background generation failed:", error);
          // Update status to draft on error
          db.updateBrandPositioning(input.id, {
            status: "draft",
            currentStep: 6,
          });
        });

        // Return immediately
        return { success: true, message: "Generation started" };
      }),
  }),

  report: router({
    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getGeneratedReport(input.id);
      }),

    getByBrandPositioning: protectedProcedure
      .input(z.object({ brandPositioningId: z.string() }))
      .query(async ({ input }) => {
        return await db.getReportByBrandPositioningId(input.brandPositioningId);
      }),

    // Public endpoint for shared reports (no authentication required)
    getPublic: publicProcedure
      .input(z.object({ brandPositioningId: z.string() }))
      .query(async ({ input }) => {
        return await db.getReportByBrandPositioningId(input.brandPositioningId);
      }),
  }),
});

export type AppRouter = typeof appRouter;

