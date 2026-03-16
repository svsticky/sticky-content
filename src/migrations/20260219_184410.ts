import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`person\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`email\` text,
  	\`phone\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`person_photo_idx\` ON \`person\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`person_updated_at_idx\` ON \`person\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`person_created_at_idx\` ON \`person\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`person__status_idx\` ON \`person\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_person_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_email\` text,
  	\`version_phone\` text,
  	\`version_role\` text,
  	\`version_photo_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`person\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_person_v_parent_idx\` ON \`_person_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_version_version_photo_idx\` ON \`_person_v\` (\`version_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_version_version_updated_at_idx\` ON \`_person_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_version_version_created_at_idx\` ON \`_person_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_version_version__status_idx\` ON \`_person_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_created_at_idx\` ON \`_person_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_updated_at_idx\` ON \`_person_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_snapshot_idx\` ON \`_person_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_published_locale_idx\` ON \`_person_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_person_v_latest_idx\` ON \`_person_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`faq_question\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_question_updated_at_idx\` ON \`faq_question\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faq_question_created_at_idx\` ON \`faq_question\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`faq_question__status_idx\` ON \`faq_question\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_faq_question_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_question\` text,
  	\`version_answer\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`faq_question\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_faq_question_v_parent_idx\` ON \`_faq_question_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_version_version_updated_at_idx\` ON \`_faq_question_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_version_version_created_at_idx\` ON \`_faq_question_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_version_version__status_idx\` ON \`_faq_question_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_created_at_idx\` ON \`_faq_question_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_updated_at_idx\` ON \`_faq_question_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_snapshot_idx\` ON \`_faq_question_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_published_locale_idx\` ON \`_faq_question_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_faq_question_v_latest_idx\` ON \`_faq_question_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`supermentor\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`picture_id\` integer,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`picture_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`supermentor_picture_idx\` ON \`supermentor\` (\`picture_id\`);`)
  await db.run(sql`CREATE INDEX \`supermentor_updated_at_idx\` ON \`supermentor\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`supermentor_created_at_idx\` ON \`supermentor\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`supermentor__status_idx\` ON \`supermentor\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_supermentor_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_picture_id\` integer,
  	\`version_content\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`supermentor\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_picture_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_supermentor_v_parent_idx\` ON \`_supermentor_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_version_version_picture_idx\` ON \`_supermentor_v\` (\`version_picture_id\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_version_version_updated_at_idx\` ON \`_supermentor_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_version_version_created_at_idx\` ON \`_supermentor_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_version_version__status_idx\` ON \`_supermentor_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_created_at_idx\` ON \`_supermentor_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_updated_at_idx\` ON \`_supermentor_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_snapshot_idx\` ON \`_supermentor_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_published_locale_idx\` ON \`_supermentor_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_supermentor_v_latest_idx\` ON \`_supermentor_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`ad\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`fullscreen\` integer DEFAULT false,
  	\`poster_id\` integer,
  	\`duration\` numeric DEFAULT 8,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`ad_poster_idx\` ON \`ad\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`ad_updated_at_idx\` ON \`ad\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ad_created_at_idx\` ON \`ad\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`ad__status_idx\` ON \`ad\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_ad_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_fullscreen\` integer DEFAULT false,
  	\`version_poster_id\` integer,
  	\`version_duration\` numeric DEFAULT 8,
  	\`version_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`ad\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_ad_v_parent_idx\` ON \`_ad_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_version_version_poster_idx\` ON \`_ad_v\` (\`version_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_version_version_updated_at_idx\` ON \`_ad_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_version_version_created_at_idx\` ON \`_ad_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_version_version__status_idx\` ON \`_ad_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_created_at_idx\` ON \`_ad_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_updated_at_idx\` ON \`_ad_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_snapshot_idx\` ON \`_ad_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_published_locale_idx\` ON \`_ad_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_ad_v_latest_idx\` ON \`_ad_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`board_message\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`board_message_updated_at_idx\` ON \`board_message\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`board_message_created_at_idx\` ON \`board_message\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`board_message__status_idx\` ON \`board_message\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_board_message_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_message\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`board_message\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_board_message_v_parent_idx\` ON \`_board_message_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_version_version_updated_at_idx\` ON \`_board_message_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_version_version_created_at_idx\` ON \`_board_message_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_version_version__status_idx\` ON \`_board_message_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_created_at_idx\` ON \`_board_message_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_updated_at_idx\` ON \`_board_message_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_snapshot_idx\` ON \`_board_message_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_published_locale_idx\` ON \`_board_message_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_board_message_v_latest_idx\` ON \`_board_message_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`quote\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`person\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`quote_updated_at_idx\` ON \`quote\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`quote_created_at_idx\` ON \`quote\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`quote__status_idx\` ON \`quote\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_quote_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_text\` text,
  	\`version_person\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`quote\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_quote_v_parent_idx\` ON \`_quote_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_version_version_updated_at_idx\` ON \`_quote_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_version_version_created_at_idx\` ON \`_quote_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_version_version__status_idx\` ON \`_quote_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_created_at_idx\` ON \`_quote_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_updated_at_idx\` ON \`_quote_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_snapshot_idx\` ON \`_quote_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_published_locale_idx\` ON \`_quote_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_quote_v_latest_idx\` ON \`_quote_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`main_news_item\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`main_news_item_updated_at_idx\` ON \`main_news_item\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`main_news_item_created_at_idx\` ON \`main_news_item\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`main_news_item__status_idx\` ON \`main_news_item\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`main_news_item_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_news_item\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`main_news_item_locales_locale_parent_id_unique\` ON \`main_news_item_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_news_item_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`main_news_item\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_parent_idx\` ON \`_main_news_item_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_version_version_updated_at_idx\` ON \`_main_news_item_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_version_version_created_at_idx\` ON \`_main_news_item_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_version_version__status_idx\` ON \`_main_news_item_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_created_at_idx\` ON \`_main_news_item_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_updated_at_idx\` ON \`_main_news_item_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_snapshot_idx\` ON \`_main_news_item_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_published_locale_idx\` ON \`_main_news_item_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_main_news_item_v_latest_idx\` ON \`_main_news_item_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_main_news_item_v_locales\` (
  	\`version_title\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_news_item_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_main_news_item_v_locales_locale_parent_id_unique\` ON \`_main_news_item_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_committee\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`logo_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`main_committee_logo_idx\` ON \`main_committee\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`main_committee_updated_at_idx\` ON \`main_committee\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`main_committee_created_at_idx\` ON \`main_committee\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`main_committee__status_idx\` ON \`main_committee\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`main_committee_locales\` (
  	\`name\` text,
  	\`about\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_committee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`main_committee_locales_locale_parent_id_unique\` ON \`main_committee_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_committee_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_logo_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`main_committee\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_committee_v_parent_idx\` ON \`_main_committee_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_version_version_logo_idx\` ON \`_main_committee_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_version_version_updated_at_idx\` ON \`_main_committee_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_version_version_created_at_idx\` ON \`_main_committee_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_version_version__status_idx\` ON \`_main_committee_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_created_at_idx\` ON \`_main_committee_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_updated_at_idx\` ON \`_main_committee_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_snapshot_idx\` ON \`_main_committee_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_published_locale_idx\` ON \`_main_committee_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_main_committee_v_latest_idx\` ON \`_main_committee_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_main_committee_v_locales\` (
  	\`version_name\` text,
  	\`version_about\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_committee_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_main_committee_v_locales_locale_parent_id_unique\` ON \`_main_committee_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_board_board_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`picture_id\` integer,
  	\`description\` text,
  	FOREIGN KEY (\`picture_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_board\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_board_board_members_order_idx\` ON \`main_board_board_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_board_board_members_parent_id_idx\` ON \`main_board_board_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`main_board_board_members_picture_idx\` ON \`main_board_board_members\` (\`picture_id\`);`)
  await db.run(sql`CREATE TABLE \`main_board_board_members_locales\` (
  	\`function\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_board_board_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`main_board_board_members_locales_locale_parent_id_unique\` ON \`main_board_board_members_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_board\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`board_number\` numeric,
  	\`year\` text,
  	\`colour\` text,
  	\`zinspreuk\` text,
  	\`picture_id\` integer,
  	\`enable_personal_texts\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`picture_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`main_board_picture_idx\` ON \`main_board\` (\`picture_id\`);`)
  await db.run(sql`CREATE INDEX \`main_board_updated_at_idx\` ON \`main_board\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`main_board_created_at_idx\` ON \`main_board\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`main_board__status_idx\` ON \`main_board\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_main_board_v_version_board_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`picture_id\` integer,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`picture_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_board_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_board_members_order_idx\` ON \`_main_board_v_version_board_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_board_members_parent_id_idx\` ON \`_main_board_v_version_board_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_board_members_picture_idx\` ON \`_main_board_v_version_board_members\` (\`picture_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_board_v_version_board_members_locales\` (
  	\`function\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_board_v_version_board_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_main_board_v_version_board_members_locales_locale_parent_id\` ON \`_main_board_v_version_board_members_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_board_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_board_number\` numeric,
  	\`version_year\` text,
  	\`version_colour\` text,
  	\`version_zinspreuk\` text,
  	\`version_picture_id\` integer,
  	\`version_enable_personal_texts\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`main_board\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_picture_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_board_v_parent_idx\` ON \`_main_board_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_version_picture_idx\` ON \`_main_board_v\` (\`version_picture_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_version_updated_at_idx\` ON \`_main_board_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_version_created_at_idx\` ON \`_main_board_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_version_version__status_idx\` ON \`_main_board_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_created_at_idx\` ON \`_main_board_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_updated_at_idx\` ON \`_main_board_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_snapshot_idx\` ON \`_main_board_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_published_locale_idx\` ON \`_main_board_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_main_board_v_latest_idx\` ON \`_main_board_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`company\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`logo_id\` integer,
  	\`website\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`company_logo_idx\` ON \`company\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`company_updated_at_idx\` ON \`company\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`company_created_at_idx\` ON \`company\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`company__status_idx\` ON \`company\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`company_locales\` (
  	\`name\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`company_locales_locale_parent_id_unique\` ON \`company_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_company_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_logo_id\` integer,
  	\`version_website\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_company_v_parent_idx\` ON \`_company_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version_logo_idx\` ON \`_company_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version_updated_at_idx\` ON \`_company_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version_created_at_idx\` ON \`_company_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_version_version__status_idx\` ON \`_company_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_created_at_idx\` ON \`_company_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_updated_at_idx\` ON \`_company_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_snapshot_idx\` ON \`_company_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_published_locale_idx\` ON \`_company_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_company_v_latest_idx\` ON \`_company_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_company_v_locales\` (
  	\`version_name\` text,
  	\`version_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_company_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_company_v_locales_locale_parent_id_unique\` ON \`_company_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`company_contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`email\` text,
  	\`phone\` text,
  	\`company_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`company_contact_company_idx\` ON \`company_contact\` (\`company_id\`);`)
  await db.run(sql`CREATE INDEX \`company_contact_updated_at_idx\` ON \`company_contact\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`company_contact_created_at_idx\` ON \`company_contact\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`company_contact__status_idx\` ON \`company_contact\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_company_contact_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_email\` text,
  	\`version_phone\` text,
  	\`version_company_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_company_contact_v_parent_idx\` ON \`_company_contact_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version_company_idx\` ON \`_company_contact_v\` (\`version_company_id\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version_updated_at_idx\` ON \`_company_contact_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version_created_at_idx\` ON \`_company_contact_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_version_version__status_idx\` ON \`_company_contact_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_created_at_idx\` ON \`_company_contact_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_updated_at_idx\` ON \`_company_contact_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_snapshot_idx\` ON \`_company_contact_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_published_locale_idx\` ON \`_company_contact_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_company_contact_v_latest_idx\` ON \`_company_contact_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`vacancy_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vacancy_type_order_idx\` ON \`vacancy_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_type_parent_idx\` ON \`vacancy_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`vacancy\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`company_id\` integer,
  	\`contact_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contact_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`vacancy_company_idx\` ON \`vacancy\` (\`company_id\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_contact_idx\` ON \`vacancy\` (\`contact_id\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_updated_at_idx\` ON \`vacancy\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_created_at_idx\` ON \`vacancy\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`vacancy__status_idx\` ON \`vacancy\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`vacancy_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vacancy_locales_locale_parent_id_unique\` ON \`vacancy_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`vacancy_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`study_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`study_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vacancy_rels_order_idx\` ON \`vacancy_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_rels_parent_idx\` ON \`vacancy_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_rels_path_idx\` ON \`vacancy_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vacancy_rels_study_id_idx\` ON \`vacancy_rels\` (\`study_id\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v_version_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vacancy_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_type_order_idx\` ON \`_vacancy_v_version_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_type_parent_idx\` ON \`_vacancy_v_version_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_company_id\` integer,
  	\`version_contact_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contact_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_vacancy_v_parent_idx\` ON \`_vacancy_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_company_idx\` ON \`_vacancy_v\` (\`version_company_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_contact_idx\` ON \`_vacancy_v\` (\`version_contact_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_updated_at_idx\` ON \`_vacancy_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version_created_at_idx\` ON \`_vacancy_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_version_version__status_idx\` ON \`_vacancy_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_created_at_idx\` ON \`_vacancy_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_updated_at_idx\` ON \`_vacancy_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_snapshot_idx\` ON \`_vacancy_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_published_locale_idx\` ON \`_vacancy_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_latest_idx\` ON \`_vacancy_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vacancy_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_vacancy_v_locales_locale_parent_id_unique\` ON \`_vacancy_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_vacancy_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`study_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vacancy_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`study_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_order_idx\` ON \`_vacancy_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_parent_idx\` ON \`_vacancy_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_path_idx\` ON \`_vacancy_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_vacancy_v_rels_study_id_idx\` ON \`_vacancy_v_rels\` (\`study_id\`);`)
  await db.run(sql`CREATE TABLE \`study\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`abbreviation\` text NOT NULL,
  	\`order\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`study_updated_at_idx\` ON \`study\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`study_created_at_idx\` ON \`study\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`study_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`study_locales_locale_parent_id_unique\` ON \`study_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`person_id\` integer,
  	\`faq_question_id\` integer,
  	\`supermentor_id\` integer,
  	\`ad_id\` integer,
  	\`board_message_id\` integer,
  	\`quote_id\` integer,
  	\`main_news_item_id\` integer,
  	\`main_committee_id\` integer,
  	\`main_board_id\` integer,
  	\`company_id\` integer,
  	\`company_contact_id\` integer,
  	\`vacancy_id\` integer,
  	\`study_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_question_id\`) REFERENCES \`faq_question\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`supermentor_id\`) REFERENCES \`supermentor\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ad_id\`) REFERENCES \`ad\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`board_message_id\`) REFERENCES \`board_message\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quote_id\`) REFERENCES \`quote\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`main_news_item_id\`) REFERENCES \`main_news_item\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`main_committee_id\`) REFERENCES \`main_committee\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`main_board_id\`) REFERENCES \`main_board\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`company_contact_id\`) REFERENCES \`company_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`vacancy_id\`) REFERENCES \`vacancy\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`study_id\`) REFERENCES \`study\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_person_id_idx\` ON \`payload_locked_documents_rels\` (\`person_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_question_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_question_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_supermentor_id_idx\` ON \`payload_locked_documents_rels\` (\`supermentor_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ad_id_idx\` ON \`payload_locked_documents_rels\` (\`ad_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_board_message_id_idx\` ON \`payload_locked_documents_rels\` (\`board_message_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quote_id_idx\` ON \`payload_locked_documents_rels\` (\`quote_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_main_news_item_id_idx\` ON \`payload_locked_documents_rels\` (\`main_news_item_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_main_committee_id_idx\` ON \`payload_locked_documents_rels\` (\`main_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_main_board_id_idx\` ON \`payload_locked_documents_rels\` (\`main_board_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_company_id_idx\` ON \`payload_locked_documents_rels\` (\`company_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_company_contact_id_idx\` ON \`payload_locked_documents_rels\` (\`company_contact_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_vacancy_id_idx\` ON \`payload_locked_documents_rels\` (\`vacancy_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_study_id_idx\` ON \`payload_locked_documents_rels\` (\`study_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`association\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`association__status_idx\` ON \`association\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_association_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_association_v_version_version__status_idx\` ON \`_association_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_association_v_created_at_idx\` ON \`_association_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_association_v_updated_at_idx\` ON \`_association_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_association_v_snapshot_idx\` ON \`_association_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_association_v_published_locale_idx\` ON \`_association_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_association_v_latest_idx\` ON \`_association_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`contact_content\` text,
  	\`confidential_contact_content\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`contact__status_idx\` ON \`contact\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`contact_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`person_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_rels_order_idx\` ON \`contact_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_parent_idx\` ON \`contact_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_path_idx\` ON \`contact_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_person_id_idx\` ON \`contact_rels\` (\`person_id\`);`)
  await db.run(sql`CREATE TABLE \`_contact_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_contact_content\` text,
  	\`version_confidential_contact_content\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_v_version_version__status_idx\` ON \`_contact_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_created_at_idx\` ON \`_contact_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_updated_at_idx\` ON \`_contact_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_snapshot_idx\` ON \`_contact_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_published_locale_idx\` ON \`_contact_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_latest_idx\` ON \`_contact_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_contact_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`person_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contact_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_v_rels_order_idx\` ON \`_contact_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_rels_parent_idx\` ON \`_contact_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_rels_path_idx\` ON \`_contact_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_rels_person_id_idx\` ON \`_contact_v_rels\` (\`person_id\`);`)
  await db.run(sql`CREATE TABLE \`faq\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`faq__status_idx\` ON \`faq\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`faq_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`faq_question_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_question_id\`) REFERENCES \`faq_question\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_rels_order_idx\` ON \`faq_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`faq_rels_parent_idx\` ON \`faq_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`faq_rels_path_idx\` ON \`faq_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`faq_rels_faq_question_id_idx\` ON \`faq_rels\` (\`faq_question_id\`);`)
  await db.run(sql`CREATE TABLE \`_faq_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_faq_v_version_version__status_idx\` ON \`_faq_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_created_at_idx\` ON \`_faq_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_updated_at_idx\` ON \`_faq_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_snapshot_idx\` ON \`_faq_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_published_locale_idx\` ON \`_faq_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_latest_idx\` ON \`_faq_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_faq_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`faq_question_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_faq_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_question_id\`) REFERENCES \`faq_question\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_faq_v_rels_order_idx\` ON \`_faq_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_rels_parent_idx\` ON \`_faq_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_rels_path_idx\` ON \`_faq_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_faq_v_rels_faq_question_id_idx\` ON \`_faq_v_rels\` (\`faq_question_id\`);`)
  await db.run(sql`CREATE TABLE \`intro_hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`intro_hero__status_idx\` ON \`intro_hero\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`intro_hero_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`intro_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`intro_hero_rels_order_idx\` ON \`intro_hero_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`intro_hero_rels_parent_idx\` ON \`intro_hero_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`intro_hero_rels_path_idx\` ON \`intro_hero_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`intro_hero_rels_media_id_idx\` ON \`intro_hero_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_intro_hero_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_version_version__status_idx\` ON \`_intro_hero_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_created_at_idx\` ON \`_intro_hero_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_updated_at_idx\` ON \`_intro_hero_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_snapshot_idx\` ON \`_intro_hero_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_published_locale_idx\` ON \`_intro_hero_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_latest_idx\` ON \`_intro_hero_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_intro_hero_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_intro_hero_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_rels_order_idx\` ON \`_intro_hero_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_rels_parent_idx\` ON \`_intro_hero_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_rels_path_idx\` ON \`_intro_hero_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_intro_hero_v_rels_media_id_idx\` ON \`_intro_hero_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`information\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`information__status_idx\` ON \`information\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`information_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`information\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`information_rels_order_idx\` ON \`information_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`information_rels_parent_idx\` ON \`information_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`information_rels_path_idx\` ON \`information_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`information_rels_media_id_idx\` ON \`information_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_information_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_information_v_version_version__status_idx\` ON \`_information_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_created_at_idx\` ON \`_information_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_updated_at_idx\` ON \`_information_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_snapshot_idx\` ON \`_information_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_published_locale_idx\` ON \`_information_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_latest_idx\` ON \`_information_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_information_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_information_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_information_v_rels_order_idx\` ON \`_information_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_rels_parent_idx\` ON \`_information_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_rels_path_idx\` ON \`_information_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_information_v_rels_media_id_idx\` ON \`_information_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`signup\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`signup__status_idx\` ON \`signup\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_signup_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content\` text,
  	\`version_button_text\` text,
  	\`version_button_link\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_signup_v_version_version__status_idx\` ON \`_signup_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_signup_v_created_at_idx\` ON \`_signup_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_signup_v_updated_at_idx\` ON \`_signup_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_signup_v_snapshot_idx\` ON \`_signup_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_signup_v_published_locale_idx\` ON \`_signup_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_signup_v_latest_idx\` ON \`_signup_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`smallprint\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`smallprint__status_idx\` ON \`smallprint\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_smallprint_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_smallprint_v_version_version__status_idx\` ON \`_smallprint_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_smallprint_v_created_at_idx\` ON \`_smallprint_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_smallprint_v_updated_at_idx\` ON \`_smallprint_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_smallprint_v_snapshot_idx\` ON \`_smallprint_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_smallprint_v_published_locale_idx\` ON \`_smallprint_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_smallprint_v_latest_idx\` ON \`_smallprint_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`theme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`reveal\` text,
  	\`supermentor_text\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`theme__status_idx\` ON \`theme\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`theme_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`supermentor_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`theme\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`supermentor_id\`) REFERENCES \`supermentor\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`theme_rels_order_idx\` ON \`theme_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`theme_rels_parent_idx\` ON \`theme_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`theme_rels_path_idx\` ON \`theme_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`theme_rels_supermentor_id_idx\` ON \`theme_rels\` (\`supermentor_id\`);`)
  await db.run(sql`CREATE TABLE \`_theme_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content\` text,
  	\`version_reveal\` text,
  	\`version_supermentor_text\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version__status_idx\` ON \`_theme_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_created_at_idx\` ON \`_theme_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_updated_at_idx\` ON \`_theme_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_snapshot_idx\` ON \`_theme_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_published_locale_idx\` ON \`_theme_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_latest_idx\` ON \`_theme_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_theme_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`supermentor_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_theme_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`supermentor_id\`) REFERENCES \`supermentor\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_theme_v_rels_order_idx\` ON \`_theme_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_rels_parent_idx\` ON \`_theme_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_rels_path_idx\` ON \`_theme_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_rels_supermentor_id_idx\` ON \`_theme_v_rels\` (\`supermentor_id\`);`)
  await db.run(sql`CREATE TABLE \`main_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_hero_buttons_order_idx\` ON \`main_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_hero_buttons_parent_id_idx\` ON \`main_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_hero_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_hero_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`main_hero_buttons_locales_locale_parent_id_unique\` ON \`main_hero_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`main_hero__status_idx\` ON \`main_hero\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`main_hero_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`main_hero_locales_locale_parent_id_unique\` ON \`main_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_hero_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`main_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_hero_rels_order_idx\` ON \`main_hero_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`main_hero_rels_parent_idx\` ON \`main_hero_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`main_hero_rels_path_idx\` ON \`main_hero_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`main_hero_rels_media_id_idx\` ON \`main_hero_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_hero_v_version_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_hero_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_hero_v_version_buttons_order_idx\` ON \`_main_hero_v_version_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_version_buttons_parent_id_idx\` ON \`_main_hero_v_version_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_hero_v_version_buttons_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_hero_v_version_buttons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_main_hero_v_version_buttons_locales_locale_parent_id_unique\` ON \`_main_hero_v_version_buttons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_hero_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_hero_v_version_version__status_idx\` ON \`_main_hero_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_created_at_idx\` ON \`_main_hero_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_updated_at_idx\` ON \`_main_hero_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_snapshot_idx\` ON \`_main_hero_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_published_locale_idx\` ON \`_main_hero_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_latest_idx\` ON \`_main_hero_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_main_hero_v_locales\` (
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_main_hero_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_main_hero_v_locales_locale_parent_id_unique\` ON \`_main_hero_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_main_hero_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_main_hero_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_main_hero_v_rels_order_idx\` ON \`_main_hero_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_rels_parent_idx\` ON \`_main_hero_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_rels_path_idx\` ON \`_main_hero_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_main_hero_v_rels_media_id_idx\` ON \`_main_hero_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`main_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target\` numeric NOT NULL,
  	\`include_unit_in_animation\` integer DEFAULT true NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_stats_stats_order_idx\` ON \`main_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_stats_stats_parent_id_idx\` ON \`main_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_stats_stats_locales\` (
  	\`unit\` text,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_stats_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`main_stats_stats_locales_locale_parent_id_unique\` ON \`main_stats_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_stats\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`duration\` numeric DEFAULT 2000 NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`person\`;`)
  await db.run(sql`DROP TABLE \`_person_v\`;`)
  await db.run(sql`DROP TABLE \`faq_question\`;`)
  await db.run(sql`DROP TABLE \`_faq_question_v\`;`)
  await db.run(sql`DROP TABLE \`supermentor\`;`)
  await db.run(sql`DROP TABLE \`_supermentor_v\`;`)
  await db.run(sql`DROP TABLE \`ad\`;`)
  await db.run(sql`DROP TABLE \`_ad_v\`;`)
  await db.run(sql`DROP TABLE \`board_message\`;`)
  await db.run(sql`DROP TABLE \`_board_message_v\`;`)
  await db.run(sql`DROP TABLE \`quote\`;`)
  await db.run(sql`DROP TABLE \`_quote_v\`;`)
  await db.run(sql`DROP TABLE \`main_news_item\`;`)
  await db.run(sql`DROP TABLE \`main_news_item_locales\`;`)
  await db.run(sql`DROP TABLE \`_main_news_item_v\`;`)
  await db.run(sql`DROP TABLE \`_main_news_item_v_locales\`;`)
  await db.run(sql`DROP TABLE \`main_committee\`;`)
  await db.run(sql`DROP TABLE \`main_committee_locales\`;`)
  await db.run(sql`DROP TABLE \`_main_committee_v\`;`)
  await db.run(sql`DROP TABLE \`_main_committee_v_locales\`;`)
  await db.run(sql`DROP TABLE \`main_board_board_members\`;`)
  await db.run(sql`DROP TABLE \`main_board_board_members_locales\`;`)
  await db.run(sql`DROP TABLE \`main_board\`;`)
  await db.run(sql`DROP TABLE \`_main_board_v_version_board_members\`;`)
  await db.run(sql`DROP TABLE \`_main_board_v_version_board_members_locales\`;`)
  await db.run(sql`DROP TABLE \`_main_board_v\`;`)
  await db.run(sql`DROP TABLE \`company\`;`)
  await db.run(sql`DROP TABLE \`company_locales\`;`)
  await db.run(sql`DROP TABLE \`_company_v\`;`)
  await db.run(sql`DROP TABLE \`_company_v_locales\`;`)
  await db.run(sql`DROP TABLE \`company_contact\`;`)
  await db.run(sql`DROP TABLE \`_company_contact_v\`;`)
  await db.run(sql`DROP TABLE \`vacancy_type\`;`)
  await db.run(sql`DROP TABLE \`vacancy\`;`)
  await db.run(sql`DROP TABLE \`vacancy_locales\`;`)
  await db.run(sql`DROP TABLE \`vacancy_rels\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v_version_type\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_vacancy_v_rels\`;`)
  await db.run(sql`DROP TABLE \`study\`;`)
  await db.run(sql`DROP TABLE \`study_locales\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`association\`;`)
  await db.run(sql`DROP TABLE \`_association_v\`;`)
  await db.run(sql`DROP TABLE \`contact\`;`)
  await db.run(sql`DROP TABLE \`contact_rels\`;`)
  await db.run(sql`DROP TABLE \`_contact_v\`;`)
  await db.run(sql`DROP TABLE \`_contact_v_rels\`;`)
  await db.run(sql`DROP TABLE \`faq\`;`)
  await db.run(sql`DROP TABLE \`faq_rels\`;`)
  await db.run(sql`DROP TABLE \`_faq_v\`;`)
  await db.run(sql`DROP TABLE \`_faq_v_rels\`;`)
  await db.run(sql`DROP TABLE \`intro_hero\`;`)
  await db.run(sql`DROP TABLE \`intro_hero_rels\`;`)
  await db.run(sql`DROP TABLE \`_intro_hero_v\`;`)
  await db.run(sql`DROP TABLE \`_intro_hero_v_rels\`;`)
  await db.run(sql`DROP TABLE \`information\`;`)
  await db.run(sql`DROP TABLE \`information_rels\`;`)
  await db.run(sql`DROP TABLE \`_information_v\`;`)
  await db.run(sql`DROP TABLE \`_information_v_rels\`;`)
  await db.run(sql`DROP TABLE \`signup\`;`)
  await db.run(sql`DROP TABLE \`_signup_v\`;`)
  await db.run(sql`DROP TABLE \`smallprint\`;`)
  await db.run(sql`DROP TABLE \`_smallprint_v\`;`)
  await db.run(sql`DROP TABLE \`theme\`;`)
  await db.run(sql`DROP TABLE \`theme_rels\`;`)
  await db.run(sql`DROP TABLE \`_theme_v\`;`)
  await db.run(sql`DROP TABLE \`_theme_v_rels\`;`)
  await db.run(sql`DROP TABLE \`main_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`main_hero_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`main_hero\`;`)
  await db.run(sql`DROP TABLE \`main_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`main_hero_rels\`;`)
  await db.run(sql`DROP TABLE \`_main_hero_v_version_buttons\`;`)
  await db.run(sql`DROP TABLE \`_main_hero_v_version_buttons_locales\`;`)
  await db.run(sql`DROP TABLE \`_main_hero_v\`;`)
  await db.run(sql`DROP TABLE \`_main_hero_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_main_hero_v_rels\`;`)
  await db.run(sql`DROP TABLE \`main_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`main_stats_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`main_stats\`;`)
}
