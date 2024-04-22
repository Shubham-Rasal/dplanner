import { pgTable, pgEnum, uuid, text, jsonb, timestamp, foreignKey, boolean, bigint, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const pricingPlanInterval = pgEnum("pricing_plan_interval", ['year', 'month', 'week', 'day'])
export const pricingType = pgEnum("pricing_type", ['recurring', 'one_time'])
export const subscriptionStatus = pgEnum("subscription_status", ['unpaid', 'past_due', 'incomplete_expired', 'incomplete', 'canceled', 'active', 'trialing'])
export const equalityOp = pgEnum("equality_op", ['in', 'gte', 'gt', 'lte', 'lt', 'neq', 'eq'])
export const action = pgEnum("action", ['ERROR', 'TRUNCATE', 'DELETE', 'UPDATE', 'INSERT'])


export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	billingAddress: jsonb("billing_address"),
	paymentMethod: jsonb("payment_method"),
	email: text("email"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
});

export const folders = pgTable("folders", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	workspaceOwner: uuid("workspace_owner").notNull(),
	title: text("title").notNull(),
	iconId: uuid("icon_id").notNull(),
	data: text("data"),
	inTrash: text("in_trash"),
	logo: text("logo"),
	bannerUrl: text("banner_url"),
	workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" } ),
});

export const prices = pgTable("prices", {
	id: text("id").primaryKey().notNull(),
	productId: text("product_id").references(() => products.id),
	active: boolean("active"),
	description: text("description"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	unitAmount: bigint("unit_amount", { mode: "number" }),
	currency: text("currency"),
	type: pricingType("type"),
	interval: pricingPlanInterval("interval"),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	metadata: jsonb("metadata"),
});

export const subscriptions = pgTable("subscriptions", {
	id: text("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: subscriptionStatus("status"),
	metadata: jsonb("metadata"),
	priceId: text("price_id").references(() => prices.id),
	quantity: integer("quantity"),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp("created", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).defaultNow(),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const todos = pgTable("todos", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: text("title"),
	isComplete: boolean("is_complete").default(false),
	userId: uuid("user_id").default(sql`auth.uid()`),
});

export const customers = pgTable("customers", {
	id: uuid("id").primaryKey().notNull(),
	stripeCustomerId: text("stripe_customer_id"),
});

export const products = pgTable("products", {
	id: text("id").primaryKey().notNull(),
	active: boolean("active"),
	name: text("name"),
	description: text("description"),
	image: text("image"),
	metadata: jsonb("metadata"),
});

export const workspaces = pgTable("workspaces", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	workspaceOwner: uuid("workspace_owner").notNull(),
	title: text("title").notNull(),
	iconId: uuid("icon_id").notNull(),
	data: text("data"),
	inTrash: text("in_trash"),
	logo: text("logo"),
	bannerUrl: text("banner_url"),
});