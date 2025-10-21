CREATE TABLE `aiGenerations` (
	`id` varchar(64) NOT NULL,
	`brandPositioningId` varchar(64) NOT NULL,
	`sectionName` varchar(100) NOT NULL,
	`modelUsed` varchar(100) NOT NULL,
	`promptTemplate` text,
	`inputData` text,
	`outputData` text,
	`tokensUsed` int,
	`costUsd` int,
	`generationTimeMs` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `aiGenerations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brandPositionings` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`status` enum('draft','in_progress','completed') NOT NULL DEFAULT 'draft',
	`currentStep` int NOT NULL DEFAULT 1,
	`language` varchar(10) NOT NULL DEFAULT 'ja',
	`brandName` varchar(255),
	`brandingType` varchar(50),
	`inspirationData` text,
	`icpData` text,
	`competitorsData` text,
	`brandValuesData` text,
	`selectedArchetype` varchar(50),
	`reportData` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `brandPositionings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creditTransactions` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`amount` int NOT NULL,
	`transactionType` enum('purchase','usage','refund','bonus') NOT NULL,
	`description` text,
	`brandPositioningId` varchar(64),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `creditTransactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generatedReports` (
	`id` varchar(64) NOT NULL,
	`brandPositioningId` varchar(64) NOT NULL,
	`brandIdentity` text,
	`brandArchetype` text,
	`brandNarrative` text,
	`visualIdentity` text,
	`swotAnalysis` text,
	`competitorAnalysis` text,
	`landingPageAnalysis` text,
	`seoAnalysis` text,
	`lighthouseAnalysis` text,
	`idealCustomerProfiles` text,
	`marketingCopy` text,
	`contentStrategy` text,
	`marketingCampaignIdeas` text,
	`pdfUrl` text,
	`docxUrl` text,
	`pptxUrl` text,
	`shareToken` varchar(255),
	`isPublic` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generatedReports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`planType` enum('starter','agency','enterprise') NOT NULL DEFAULT 'starter',
	`status` enum('active','canceled','past_due','trialing') NOT NULL DEFAULT 'active',
	`creditsRemaining` int NOT NULL DEFAULT 0,
	`creditsTotal` int NOT NULL DEFAULT 0,
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','agency','enterprise','admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `aiGenerations` ADD CONSTRAINT `aiGenerations_brandPositioningId_brandPositionings_id_fk` FOREIGN KEY (`brandPositioningId`) REFERENCES `brandPositionings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `brandPositionings` ADD CONSTRAINT `brandPositionings_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creditTransactions` ADD CONSTRAINT `creditTransactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creditTransactions` ADD CONSTRAINT `creditTransactions_brandPositioningId_brandPositionings_id_fk` FOREIGN KEY (`brandPositioningId`) REFERENCES `brandPositionings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `generatedReports` ADD CONSTRAINT `generatedReports_brandPositioningId_brandPositionings_id_fk` FOREIGN KEY (`brandPositioningId`) REFERENCES `brandPositionings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;