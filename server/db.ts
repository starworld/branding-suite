import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  brandPositionings,
  BrandPositioning,
  InsertBrandPositioning,
  subscriptions,
  Subscription,
  InsertSubscription,
  generatedReports,
  GeneratedReport,
  InsertGeneratedReport,
  aiGenerations,
  AiGeneration,
  InsertAiGeneration,
  creditTransactions,
  CreditTransaction,
  InsertCreditTransaction
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Brand Positioning helpers
export async function createBrandPositioning(data: Omit<InsertBrandPositioning, 'id'>): Promise<BrandPositioning> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `bp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(brandPositionings).values({ ...data, id });
  
  const result = await db.select().from(brandPositionings).where(eq(brandPositionings.id, id)).limit(1);
  return result[0];
}

export async function getBrandPositioning(id: string): Promise<BrandPositioning | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(brandPositionings).where(eq(brandPositionings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserBrandPositionings(userId: string): Promise<BrandPositioning[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(brandPositionings).where(eq(brandPositionings.userId, userId));
}

export async function updateBrandPositioning(id: string, data: Partial<BrandPositioning>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(brandPositionings).set(data).where(eq(brandPositionings.id, id));
}

export async function deleteBrandPositioning(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(brandPositionings).where(eq(brandPositionings.id, id));
}

// Subscription helpers
export async function getUserSubscription(userId: string): Promise<Subscription | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdateSubscription(data: InsertSubscription): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserSubscription(data.userId);
  
  if (existing) {
    await db.update(subscriptions).set(data).where(eq(subscriptions.userId, data.userId));
  } else {
    const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(subscriptions).values({ ...data, id });
  }
}

// Generated Report helpers
export async function createGeneratedReport(data: InsertGeneratedReport): Promise<GeneratedReport> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const shareToken = `share_${Math.random().toString(36).substr(2, 16)}`;
  
  await db.insert(generatedReports).values({ ...data, id, shareToken });
  
  const result = await db.select().from(generatedReports).where(eq(generatedReports.id, id)).limit(1);
  return result[0];
}

export async function getGeneratedReport(id: string): Promise<GeneratedReport | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(generatedReports).where(eq(generatedReports.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getReportByShareToken(token: string): Promise<GeneratedReport | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(generatedReports).where(eq(generatedReports.shareToken, token)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateGeneratedReport(id: string, data: Partial<GeneratedReport>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(generatedReports).set(data).where(eq(generatedReports.id, id));
}

// AI Generation tracking helpers
export async function trackAiGeneration(data: InsertAiGeneration): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const id = `aig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(aiGenerations).values({ ...data, id });
}

export async function getAiGenerations(brandPositioningId: string): Promise<AiGeneration[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(aiGenerations).where(eq(aiGenerations.brandPositioningId, brandPositioningId));
}

// Credit Transaction helpers
export async function createCreditTransaction(data: InsertCreditTransaction): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `crt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(creditTransactions).values({ ...data, id });
  
  // Update subscription credits
  const subscription = await getUserSubscription(data.userId);
  if (subscription) {
    const newCredits = subscription.creditsRemaining + data.amount;
    await db.update(subscriptions)
      .set({ creditsRemaining: newCredits })
      .where(eq(subscriptions.userId, data.userId));
  }
}

export async function getUserCreditTransactions(userId: string): Promise<CreditTransaction[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(creditTransactions).where(eq(creditTransactions.userId, userId));
}

export async function getUserCredits(userId: string): Promise<number> {
  const subscription = await getUserSubscription(userId);
  return subscription?.creditsRemaining ?? 0;
}

