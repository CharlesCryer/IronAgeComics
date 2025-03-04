ALTER TABLE "ironaget3v2_Comic" RENAME TO "Comic";--> statement-breakpoint
ALTER TABLE "Comic" DROP CONSTRAINT "ironaget3v2_Comic_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;