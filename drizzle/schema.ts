import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "agency", "enterprise", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Subscriptions table
export const subscriptions = mysqlTable("subscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  planType: mysqlEnum("planType", ["starter", "agency", "enterprise"]).default("starter").notNull(),
  status: mysqlEnum("status", ["active", "canceled", "past_due", "trialing"]).default("active").notNull(),
  creditsRemaining: int("creditsRemaining").default(0).notNull(),
  creditsTotal: int("creditsTotal").default(0).notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// Brand Positionings table
export const brandPositionings = mysqlTable("brandPositionings", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["draft", "in_progress", "completed"]).default("draft").notNull(),
  currentStep: int("currentStep").default(1).notNull(),
  language: varchar("language", { length: 10 }).default("ja").notNull(),
  
  // Step 1: Input
  brandName: varchar("brandName", { length: 255 }),
  brandingType: varchar("brandingType", { length: 50 }),
  
  // Step 2-6: Stored as JSON
  inspirationData: text("inspirationData"),
  icpData: text("icpData"),
  competitorsData: text("competitorsData"),
  brandValuesData: text("brandValuesData"),
  selectedArchetype: varchar("selectedArchetype", { length: 50 }),
  
  // Generated Report (JSON)
  reportData: text("reportData"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type BrandPositioning = typeof brandPositionings.$inferSelect;
export type InsertBrandPositioning = typeof brandPositionings.$inferInsert;

// Generated Reports table
export const generatedReports = mysqlTable("generatedReports", {
  id: varchar("id", { length: 64 }).primaryKey(),
  brandPositioningId: varchar("brandPositioningId", { length: 64 }).notNull().references(() => brandPositionings.id, { onDelete: "cascade" }),
  
  // Brand Positioning Section (JSON)
  brandIdentity: text("brandIdentity"),
  brandArchetype: text("brandArchetype"),
  brandNarrative: text("brandNarrative"),
  visualIdentity: text("visualIdentity"),
  
  // Your Brand Now Section (JSON)
  swotAnalysis: text("swotAnalysis"),
  competitorAnalysis: text("competitorAnalysis"),
  landingPageAnalysis: text("landingPageAnalysis"),
  seoAnalysis: text("seoAnalysis"),
  lighthouseAnalysis: text("lighthouseAnalysis"),
  
  // Marketing Strategy Section (JSON)
  idealCustomerProfiles: text("idealCustomerProfiles"),
  marketingCopy: text("marketingCopy"),
  contentStrategy: text("contentStrategy"),
  marketingCampaignIdeas: text("marketingCampaignIdeas"),
  
  // Export URLs
  pdfUrl: text("pdfUrl"),
  docxUrl: text("docxUrl"),
  pptxUrl: text("pptxUrl"),
  
  // Sharing
  shareToken: varchar("shareToken", { length: 255 }),
  isPublic: boolean("isPublic").default(false).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type GeneratedReport = typeof generatedReports.$inferSelect;
export type InsertGeneratedReport = typeof generatedReports.$inferInsert;

// AI Generations tracking table
export const aiGenerations = mysqlTable("aiGenerations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  brandPositioningId: varchar("brandPositioningId", { length: 64 }).notNull().references(() => brandPositionings.id, { onDelete: "cascade" }),
  sectionName: varchar("sectionName", { length: 100 }).notNull(),
  modelUsed: varchar("modelUsed", { length: 100 }).notNull(),
  promptTemplate: text("promptTemplate"),
  inputData: text("inputData"),
  outputData: text("outputData"),
  tokensUsed: int("tokensUsed"),
  costUsd: int("costUsd"), // Store as cents to avoid decimal
  generationTimeMs: int("generationTimeMs"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type AiGeneration = typeof aiGenerations.$inferSelect;
export type InsertAiGeneration = typeof aiGenerations.$inferInsert;

// Credit Transactions table
export const creditTransactions = mysqlTable("creditTransactions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: int("amount").notNull(), // positive for addition, negative for deduction
  transactionType: mysqlEnum("transactionType", ["purchase", "usage", "refund", "bonus"]).notNull(),
  description: text("description"),
  brandPositioningId: varchar("brandPositioningId", { length: 64 }).references(() => brandPositionings.id),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = typeof creditTransactions.$inferInsert;
