CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"summary" text,
	"image_url" text,
	"author_id" uuid,
	"category" text,
	"tags" text[],
	"is_featured" boolean DEFAULT false,
	"status" text DEFAULT 'draft',
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
