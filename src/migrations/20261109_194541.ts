import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('nl', 'en');
  CREATE TYPE "public"."enum_users_permissions" AS ENUM('Introcommissie', 'Bestuur', 'XCom');
  CREATE TYPE "public"."enum__users_v_version_permissions" AS ENUM('Introcommissie', 'Bestuur', 'XCom');
  CREATE TYPE "public"."enum_person_role" AS ENUM('Secretaris', 'Voorzitter', 'Vertrouwenscontactpersoon');
  CREATE TYPE "public"."enum__person_v_version_role" AS ENUM('Secretaris', 'Voorzitter', 'Vertrouwenscontactpersoon');
  CREATE TYPE "public"."enum_pages_blocks_title_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_type" AS ENUM('none', 'subtitle');
  CREATE TYPE "public"."enum_pages_blocks_committee_overview_type" AS ENUM('com', 'wer');
  CREATE TYPE "public"."enum_pages_blocks_links_page_links_url_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_button_icon_location" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_featured_partner_banner_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_title_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_type" AS ENUM('none', 'subtitle');
  CREATE TYPE "public"."enum__pages_v_blocks_committee_overview_type" AS ENUM('com', 'wer');
  CREATE TYPE "public"."enum__pages_v_blocks_links_page_links_url_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_button_icon_location" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_partner_banner_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_partners_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_partners_blocks_button_icon_location" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__partners_v_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__partners_v_blocks_button_icon_location" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_committees_type" AS ENUM('com', 'wer');
  CREATE TYPE "public"."enum__committees_v_version_type" AS ENUM('com', 'wer');
  CREATE TYPE "public"."enum_boards_members_linkedin_url_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__boards_v_version_members_linkedin_url_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vacancies_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_vacancies_blocks_button_icon_location" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__vacancies_v_blocks_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__vacancies_v_blocks_button_icon_location" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_programmes_type" AS ENUM('Bachelor', 'Master');
  CREATE TYPE "public"."enum__programmes_v_version_type" AS ENUM('Bachelor', 'Master');
  CREATE TYPE "public"."enum_payload_llm_instructions_entity_type" AS ENUM('collection', 'global');
  CREATE TYPE "public"."enum_navigation_blocks_nav_menu_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_navigation_blocks_nav_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_navigation_buttons_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__navigation_v_blocks_nav_menu_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__navigation_v_blocks_nav_button_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__navigation_v_version_buttons_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"refresh_count" numeric,
  	"refreshed_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"permissions" "enum_users_permissions" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"api_key" varchar,
  	"api_key_last4" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_users_v_version_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"refresh_count" numeric,
  	"refreshed_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_users_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_permissions" "enum__users_v_version_permissions" NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_api_key" varchar,
  	"version_api_key_last4" varchar,
  	"version_api_key_index" varchar,
  	"version_email" varchar NOT NULL,
  	"version_reset_password_token" varchar,
  	"version_reset_password_expiration" timestamp(3) with time zone,
  	"version_salt" varchar,
  	"version_hash" varchar,
  	"version_reset_password_requested_at" timestamp(3) with time zone,
  	"version_login_attempts" numeric DEFAULT 0,
  	"version_lock_until" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_users_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"original_filename" varchar,
  	"original_url" varchar,
  	"original_mime_type" varchar,
  	"original_filesize" numeric,
  	"original_width" numeric,
  	"original_height" numeric,
  	"original_prefix" varchar,
  	"original__objectkey" varchar,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_original_filename" varchar,
  	"version_original_url" varchar,
  	"version_original_mime_type" varchar,
  	"version_original_filesize" numeric,
  	"version_original_width" numeric,
  	"version_original_height" numeric,
  	"version_original_prefix" varchar,
  	"version_original__objectkey" varchar,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_media_v_locales" (
  	"version_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_media_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "person_role" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_person_role",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "person" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "person_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_person_v_version_role" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__person_v_version_role",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_person_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_email" varchar,
  	"version_phone" varchar NOT NULL,
  	"version_photo_id" integer NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_person_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "supermentor" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"picture_id" integer NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "supermentor_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_supermentor_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_picture_id" integer NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_supermentor_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "faq_question" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_question_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_faq_question_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar NOT NULL,
  	"version_answer" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_faq_question_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "pages_blocks_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"level" "enum_pages_blocks_title_level" DEFAULT '1',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_title_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_rich_text_type" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_separator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_committee_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_committee_overview_type" NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partner_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vacancy_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_society_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_current_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_old_boards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_links_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url_type" "enum_pages_blocks_links_page_links_url_type" DEFAULT 'external',
  	"url_page_id" integer,
  	"url_url" varchar,
  	"category" varchar,
  	"icon" varchar,
  	"icon_colour" varchar
  );
  
  CREATE TABLE "pages_blocks_links_page_links_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_links_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"photo_id" integer,
  	"is_lustrum" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_timeline_items_locales" (
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lvv_page_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"since" numeric
  );
  
  CREATE TABLE "pages_blocks_lvv_page_people_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lvv_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_grid_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_contact_grid_people_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_grid_locales" (
  	"data" jsonb,
  	"visit_address" jsonb,
  	"postal_address" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_branding_colour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"colour" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_branding_logos_logo_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"black_link" varchar,
  	"white_link" varchar,
  	"colour_link" varchar
  );
  
  CREATE TABLE "pages_blocks_branding_logos_logo_types_locales" (
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_branding_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_branding_poster_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_branding_poster_specs_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_branding_poster" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partnering_reasons_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_partnering_reasons_reasons_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partnering_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_collaboration_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_collaboration_form_locales" (
  	"header" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_branding_twocol" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promotion_possibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_promotion_possibilities_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_promotion_sponsored_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_promotion_sponsored_activities_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_promotion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promotion_locales" (
  	"sponsor_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"icon" varchar,
  	"icon_location" "enum_pages_blocks_button_icon_location",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_featured_partner_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"partner_name" varchar,
  	"link_type" "enum_pages_blocks_featured_partner_banner_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"target" numeric NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_item_locales" (
  	"unit" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_info_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_info_columns_locales" (
  	"drinks_day" varchar,
  	"drinks_time" varchar,
  	"drinks_location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partner_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_activities_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vcp_page_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_vcp_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vcp_page_locales" (
  	"body" jsonb,
  	"poster_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"level" "enum__pages_v_blocks_title_level" DEFAULT '1',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_title_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_rich_text_type" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_separator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_committee_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_committee_overview_type" NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partner_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vacancy_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_society_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_current_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_old_boards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_links_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url_type" "enum__pages_v_blocks_links_page_links_url_type" DEFAULT 'external',
  	"url_page_id" integer,
  	"url_url" varchar,
  	"category" varchar,
  	"icon" varchar,
  	"icon_colour" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_links_page_links_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_links_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"photo_id" integer,
  	"is_lustrum" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items_locales" (
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lvv_page_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"since" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lvv_page_people_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lvv_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_grid_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_grid_people_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_grid_locales" (
  	"data" jsonb,
  	"visit_address" jsonb,
  	"postal_address" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_branding_colour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"colour" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branding_logos_logo_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"black_link" varchar,
  	"white_link" varchar,
  	"colour_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branding_logos_logo_types_locales" (
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_branding_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branding_poster_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branding_poster_specs_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_branding_poster" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partnering_reasons_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partnering_reasons_reasons_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_partnering_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_collaboration_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_collaboration_form_locales" (
  	"header" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_branding_twocol" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promotion_possibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promotion_possibilities_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_promotion_sponsored_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promotion_sponsored_activities_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_promotion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promotion_locales" (
  	"sponsor_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"icon" varchar,
  	"icon_location" "enum__pages_v_blocks_button_icon_location",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_featured_partner_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"partner_name" varchar,
  	"link_type" "enum__pages_v_blocks_featured_partner_banner_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"target" numeric NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_item_locales" (
  	"unit" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"duration" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_columns_locales" (
  	"drinks_day" varchar,
  	"drinks_time" varchar,
  	"drinks_location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_partner_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_activities_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vcp_page_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vcp_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vcp_page_locales" (
  	"body" jsonb,
  	"poster_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar NOT NULL,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "partners_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_partners_blocks_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"icon" varchar,
  	"icon_location" "enum_partners_blocks_button_icon_location",
  	"block_name" varchar
  );
  
  CREATE TABLE "partners_blocks_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"is_main" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_locales" (
  	"name" varchar NOT NULL,
  	"main_text" jsonb,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_partners_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__partners_v_blocks_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"icon" varchar,
  	"icon_location" "enum__partners_v_blocks_button_icon_location",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_partners_v_blocks_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_logo_id" integer,
  	"version_is_main" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_partners_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_main_text" jsonb,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "committees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_committees_type" NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "committees_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "committees_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_committees_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_type" "enum__committees_v_version_type" NOT NULL,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_committees_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_description" varchar,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_committees_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "boards_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"linkedin_url_type" "enum_boards_members_linkedin_url_type" DEFAULT 'external',
  	"linkedin_url_page_id" integer,
  	"linkedin_url_url" varchar
  );
  
  CREATE TABLE "boards_members_locales" (
  	"function" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "boards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"board_number" numeric NOT NULL,
  	"year" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"is_current" boolean DEFAULT false,
  	"zinspreuk" varchar,
  	"colour" varchar,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "boards_locales" (
  	"board_members" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "boards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_boards_v_version_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"linkedin_url_type" "enum__boards_v_version_members_linkedin_url_type" DEFAULT 'external',
  	"linkedin_url_page_id" integer,
  	"linkedin_url_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_boards_v_version_members_locales" (
  	"function" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_boards_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_board_number" numeric NOT NULL,
  	"version_year" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_is_current" boolean DEFAULT false,
  	"version_zinspreuk" varchar,
  	"version_colour" varchar,
  	"version_photo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_boards_v_locales" (
  	"version_board_members" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_boards_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "vacancies_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_vacancies_blocks_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"icon" varchar,
  	"icon_location" "enum_vacancies_blocks_button_icon_location",
  	"block_name" varchar
  );
  
  CREATE TABLE "vacancies_blocks_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "vacancies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancies_locales" (
  	"name" varchar NOT NULL,
  	"short_text" varchar,
  	"long_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vacancies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer,
  	"job_types_id" integer,
  	"programmes_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_vacancies_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__vacancies_v_blocks_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"icon" varchar,
  	"icon_location" "enum__vacancies_v_blocks_button_icon_location",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_vacancies_v_blocks_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_vacancies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_is_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_vacancies_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_short_text" varchar,
  	"version_long_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_vacancies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer,
  	"job_types_id" integer,
  	"programmes_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "news_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"keywords" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_news_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_date" timestamp(3) with time zone NOT NULL,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_news_items_v_locales" (
  	"version_title" varchar NOT NULL,
  	"version_description" varchar,
  	"version_keywords" varchar,
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_items_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "societies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"colour" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "societies_locales" (
  	"short_text" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "societies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_societies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_colour" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_societies_v_locales" (
  	"version_short_text" varchar,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_societies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_programmes_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programmes_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_programmes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_type" "enum__programmes_v_version_type" NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_programmes_v_locales" (
  	"version_name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_programmes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "job_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_types_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "job_types_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_job_types_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_job_types_v_locales" (
  	"version_name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_job_types_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "quotes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"person" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quotes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_quotes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_text" varchar NOT NULL,
  	"version_person" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_quotes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "board_message" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "board_message_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_board_message_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_message" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_board_message_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "ads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"poster_id" integer NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"fullscreen" boolean DEFAULT false NOT NULL,
  	"duration_sec" numeric DEFAULT 8,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_ads_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_poster_id" integer NOT NULL,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_fullscreen" boolean DEFAULT false NOT NULL,
  	"version_duration_sec" numeric DEFAULT 8,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_ads_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"person_id" integer,
  	"supermentor_id" integer,
  	"faq_question_id" integer,
  	"pages_id" integer,
  	"partners_id" integer,
  	"committees_id" integer,
  	"boards_id" integer,
  	"vacancies_id" integer,
  	"news_items_id" integer,
  	"societies_id" integer,
  	"programmes_id" integer,
  	"job_types_id" integer,
  	"quotes_id" integer,
  	"board_message_id" integer,
  	"ads_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entity_slug" varchar NOT NULL,
  	"entity_type" "enum_payload_llm_instructions_entity_type" NOT NULL,
  	"additional_instructions" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hero_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_hero_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_hero_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "association" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "association_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_association_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_association_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_content" jsonb NOT NULL,
  	"confidential_content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"person_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_contact_content" jsonb NOT NULL,
  	"version_confidential_content" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_contact_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"person_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "signup" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"button_content" varchar NOT NULL,
  	"button_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "signup_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_signup_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_button_content" varchar NOT NULL,
  	"version_button_link" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_signup_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"reveal" jsonb NOT NULL,
  	"supermentor_text" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "theme_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"supermentor_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_theme_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_reveal" jsonb NOT NULL,
  	"version_supermentor_text" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_theme_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"supermentor_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_question_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_faq_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_faq_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_question_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "small_print" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "small_print_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_small_print_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_small_print_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "information" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "information_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_information_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_information_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "navigation_blocks_nav_menu_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_blocks_nav_menu_links_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar
  );
  
  CREATE TABLE "navigation_blocks_nav_menu_links_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_blocks_nav_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "navigation_blocks_nav_menu_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_blocks_nav_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_blocks_nav_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "navigation_blocks_nav_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_buttons_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar
  );
  
  CREATE TABLE "navigation_buttons_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "_navigation_v_blocks_nav_menu_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__navigation_v_blocks_nav_menu_links_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_blocks_nav_menu_links_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v_blocks_nav_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_navigation_v_blocks_nav_menu_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v_blocks_nav_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__navigation_v_blocks_nav_button_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_navigation_v_blocks_nav_button_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v_version_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__navigation_v_version_buttons_link_type" DEFAULT 'external',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_buttons_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_navigation_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_users_v_version_sessions" ADD CONSTRAINT "_users_v_version_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_users_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_users_v" ADD CONSTRAINT "_users_v_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_users_v_rels" ADD CONSTRAINT "_users_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_users_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_users_v_rels" ADD CONSTRAINT "_users_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v_locales" ADD CONSTRAINT "_media_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person_role" ADD CONSTRAINT "person_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person" ADD CONSTRAINT "person_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "person_rels" ADD CONSTRAINT "person_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person_rels" ADD CONSTRAINT "person_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_person_v_version_role" ADD CONSTRAINT "_person_v_version_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_person_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_person_v" ADD CONSTRAINT "_person_v_parent_id_person_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."person"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_person_v" ADD CONSTRAINT "_person_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_person_v_rels" ADD CONSTRAINT "_person_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_person_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_person_v_rels" ADD CONSTRAINT "_person_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "supermentor" ADD CONSTRAINT "supermentor_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "supermentor_rels" ADD CONSTRAINT "supermentor_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."supermentor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "supermentor_rels" ADD CONSTRAINT "supermentor_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_supermentor_v" ADD CONSTRAINT "_supermentor_v_parent_id_supermentor_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."supermentor"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_supermentor_v" ADD CONSTRAINT "_supermentor_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_supermentor_v_rels" ADD CONSTRAINT "_supermentor_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_supermentor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_supermentor_v_rels" ADD CONSTRAINT "_supermentor_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_question_rels" ADD CONSTRAINT "faq_question_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq_question"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_question_rels" ADD CONSTRAINT "faq_question_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_question_v" ADD CONSTRAINT "_faq_question_v_parent_id_faq_question_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq_question"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faq_question_v_rels" ADD CONSTRAINT "_faq_question_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faq_question_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_question_v_rels" ADD CONSTRAINT "_faq_question_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_title" ADD CONSTRAINT "pages_blocks_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_title_locales" ADD CONSTRAINT "pages_blocks_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_separator" ADD CONSTRAINT "pages_blocks_separator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_committee_overview" ADD CONSTRAINT "pages_blocks_committee_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_overview" ADD CONSTRAINT "pages_blocks_partner_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vacancy_overview" ADD CONSTRAINT "pages_blocks_vacancy_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_overview" ADD CONSTRAINT "pages_blocks_news_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_society_overview" ADD CONSTRAINT "pages_blocks_society_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_current_board" ADD CONSTRAINT "pages_blocks_current_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_old_boards" ADD CONSTRAINT "pages_blocks_old_boards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities" ADD CONSTRAINT "pages_blocks_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_links_page_links" ADD CONSTRAINT "pages_blocks_links_page_links_url_page_id_pages_id_fk" FOREIGN KEY ("url_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_links_page_links" ADD CONSTRAINT "pages_blocks_links_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_links_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_links_page_links_locales" ADD CONSTRAINT "pages_blocks_links_page_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_links_page_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_links_page" ADD CONSTRAINT "pages_blocks_links_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items_locales" ADD CONSTRAINT "pages_blocks_timeline_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lvv_page_people" ADD CONSTRAINT "pages_blocks_lvv_page_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lvv_page_people" ADD CONSTRAINT "pages_blocks_lvv_page_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lvv_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lvv_page_people_locales" ADD CONSTRAINT "pages_blocks_lvv_page_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lvv_page_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lvv_page" ADD CONSTRAINT "pages_blocks_lvv_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_grid_people" ADD CONSTRAINT "pages_blocks_contact_grid_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_grid_people" ADD CONSTRAINT "pages_blocks_contact_grid_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_grid_people_locales" ADD CONSTRAINT "pages_blocks_contact_grid_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_grid_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_grid" ADD CONSTRAINT "pages_blocks_contact_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_grid_locales" ADD CONSTRAINT "pages_blocks_contact_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_colour" ADD CONSTRAINT "pages_blocks_branding_colour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_logos_logo_types" ADD CONSTRAINT "pages_blocks_branding_logos_logo_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branding_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_logos_logo_types_locales" ADD CONSTRAINT "pages_blocks_branding_logos_logo_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branding_logos_logo_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_logos" ADD CONSTRAINT "pages_blocks_branding_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_poster_specs" ADD CONSTRAINT "pages_blocks_branding_poster_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branding_poster"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_poster_specs_locales" ADD CONSTRAINT "pages_blocks_branding_poster_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branding_poster_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_poster" ADD CONSTRAINT "pages_blocks_branding_poster_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partnering_reasons_reasons" ADD CONSTRAINT "pages_blocks_partnering_reasons_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partnering_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partnering_reasons_reasons_locales" ADD CONSTRAINT "pages_blocks_partnering_reasons_reasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partnering_reasons_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partnering_reasons" ADD CONSTRAINT "pages_blocks_partnering_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_collaboration_form" ADD CONSTRAINT "pages_blocks_collaboration_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_collaboration_form_locales" ADD CONSTRAINT "pages_blocks_collaboration_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_collaboration_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branding_twocol" ADD CONSTRAINT "pages_blocks_branding_twocol_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion_possibilities" ADD CONSTRAINT "pages_blocks_promotion_possibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion_possibilities_locales" ADD CONSTRAINT "pages_blocks_promotion_possibilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promotion_possibilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion_sponsored_activities" ADD CONSTRAINT "pages_blocks_promotion_sponsored_activities_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion_sponsored_activities" ADD CONSTRAINT "pages_blocks_promotion_sponsored_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion_sponsored_activities_locales" ADD CONSTRAINT "pages_blocks_promotion_sponsored_activities_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promotion_sponsored_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion" ADD CONSTRAINT "pages_blocks_promotion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion_locales" ADD CONSTRAINT "pages_blocks_promotion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_locales" ADD CONSTRAINT "pages_blocks_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_partner_banner" ADD CONSTRAINT "pages_blocks_featured_partner_banner_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_partner_banner" ADD CONSTRAINT "pages_blocks_featured_partner_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_item" ADD CONSTRAINT "pages_blocks_stat_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_item_locales" ADD CONSTRAINT "pages_blocks_stat_item_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_section" ADD CONSTRAINT "pages_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_columns" ADD CONSTRAINT "pages_blocks_info_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_columns_locales" ADD CONSTRAINT "pages_blocks_info_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_carousel" ADD CONSTRAINT "pages_blocks_partner_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_carousel" ADD CONSTRAINT "pages_blocks_news_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_activities_carousel" ADD CONSTRAINT "pages_blocks_activities_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vcp_page_people" ADD CONSTRAINT "pages_blocks_vcp_page_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_vcp_page_people" ADD CONSTRAINT "pages_blocks_vcp_page_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vcp_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vcp_page" ADD CONSTRAINT "pages_blocks_vcp_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vcp_page_locales" ADD CONSTRAINT "pages_blocks_vcp_page_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_vcp_page_locales" ADD CONSTRAINT "pages_blocks_vcp_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vcp_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_title" ADD CONSTRAINT "_pages_v_blocks_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_title_locales" ADD CONSTRAINT "_pages_v_blocks_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_separator" ADD CONSTRAINT "_pages_v_blocks_separator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_committee_overview" ADD CONSTRAINT "_pages_v_blocks_committee_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_overview" ADD CONSTRAINT "_pages_v_blocks_partner_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vacancy_overview" ADD CONSTRAINT "_pages_v_blocks_vacancy_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_overview" ADD CONSTRAINT "_pages_v_blocks_news_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_society_overview" ADD CONSTRAINT "_pages_v_blocks_society_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_current_board" ADD CONSTRAINT "_pages_v_blocks_current_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_old_boards" ADD CONSTRAINT "_pages_v_blocks_old_boards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities" ADD CONSTRAINT "_pages_v_blocks_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_links_page_links" ADD CONSTRAINT "_pages_v_blocks_links_page_links_url_page_id_pages_id_fk" FOREIGN KEY ("url_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_links_page_links" ADD CONSTRAINT "_pages_v_blocks_links_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_links_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_links_page_links_locales" ADD CONSTRAINT "_pages_v_blocks_links_page_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_links_page_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_links_page" ADD CONSTRAINT "_pages_v_blocks_links_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items_locales" ADD CONSTRAINT "_pages_v_blocks_timeline_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lvv_page_people" ADD CONSTRAINT "_pages_v_blocks_lvv_page_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lvv_page_people" ADD CONSTRAINT "_pages_v_blocks_lvv_page_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lvv_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lvv_page_people_locales" ADD CONSTRAINT "_pages_v_blocks_lvv_page_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lvv_page_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lvv_page" ADD CONSTRAINT "_pages_v_blocks_lvv_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_grid_people" ADD CONSTRAINT "_pages_v_blocks_contact_grid_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_grid_people" ADD CONSTRAINT "_pages_v_blocks_contact_grid_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_grid_people_locales" ADD CONSTRAINT "_pages_v_blocks_contact_grid_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_grid_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_grid" ADD CONSTRAINT "_pages_v_blocks_contact_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_grid_locales" ADD CONSTRAINT "_pages_v_blocks_contact_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_colour" ADD CONSTRAINT "_pages_v_blocks_branding_colour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_logos_logo_types" ADD CONSTRAINT "_pages_v_blocks_branding_logos_logo_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branding_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_logos_logo_types_locales" ADD CONSTRAINT "_pages_v_blocks_branding_logos_logo_types_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branding_logos_logo_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_logos" ADD CONSTRAINT "_pages_v_blocks_branding_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_poster_specs" ADD CONSTRAINT "_pages_v_blocks_branding_poster_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branding_poster"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_poster_specs_locales" ADD CONSTRAINT "_pages_v_blocks_branding_poster_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branding_poster_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_poster" ADD CONSTRAINT "_pages_v_blocks_branding_poster_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partnering_reasons_reasons" ADD CONSTRAINT "_pages_v_blocks_partnering_reasons_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partnering_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partnering_reasons_reasons_locales" ADD CONSTRAINT "_pages_v_blocks_partnering_reasons_reasons_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partnering_reasons_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partnering_reasons" ADD CONSTRAINT "_pages_v_blocks_partnering_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_collaboration_form" ADD CONSTRAINT "_pages_v_blocks_collaboration_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_collaboration_form_locales" ADD CONSTRAINT "_pages_v_blocks_collaboration_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_collaboration_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branding_twocol" ADD CONSTRAINT "_pages_v_blocks_branding_twocol_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_possibilities" ADD CONSTRAINT "_pages_v_blocks_promotion_possibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_possibilities_locales" ADD CONSTRAINT "_pages_v_blocks_promotion_possibilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promotion_possibilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_sponsored_activities" ADD CONSTRAINT "_pages_v_blocks_promotion_sponsored_activities_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_sponsored_activities" ADD CONSTRAINT "_pages_v_blocks_promotion_sponsored_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_sponsored_activities_locales" ADD CONSTRAINT "_pages_v_blocks_promotion_sponsored_activities_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promotion_sponsored_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion" ADD CONSTRAINT "_pages_v_blocks_promotion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_locales" ADD CONSTRAINT "_pages_v_blocks_promotion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_locales" ADD CONSTRAINT "_pages_v_blocks_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_partner_banner" ADD CONSTRAINT "_pages_v_blocks_featured_partner_banner_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_partner_banner" ADD CONSTRAINT "_pages_v_blocks_featured_partner_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_item" ADD CONSTRAINT "_pages_v_blocks_stat_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_item_locales" ADD CONSTRAINT "_pages_v_blocks_stat_item_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_section" ADD CONSTRAINT "_pages_v_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_columns" ADD CONSTRAINT "_pages_v_blocks_info_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_columns_locales" ADD CONSTRAINT "_pages_v_blocks_info_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_carousel" ADD CONSTRAINT "_pages_v_blocks_partner_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_carousel" ADD CONSTRAINT "_pages_v_blocks_news_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_carousel" ADD CONSTRAINT "_pages_v_blocks_activities_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vcp_page_people" ADD CONSTRAINT "_pages_v_blocks_vcp_page_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vcp_page_people" ADD CONSTRAINT "_pages_v_blocks_vcp_page_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vcp_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vcp_page" ADD CONSTRAINT "_pages_v_blocks_vcp_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vcp_page_locales" ADD CONSTRAINT "_pages_v_blocks_vcp_page_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vcp_page_locales" ADD CONSTRAINT "_pages_v_blocks_vcp_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vcp_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_blocks_button" ADD CONSTRAINT "partners_blocks_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_blocks_button" ADD CONSTRAINT "partners_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_blocks_button_locales" ADD CONSTRAINT "partners_blocks_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_rels" ADD CONSTRAINT "partners_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_rels" ADD CONSTRAINT "partners_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v_blocks_button" ADD CONSTRAINT "_partners_v_blocks_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v_blocks_button" ADD CONSTRAINT "_partners_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v_blocks_button_locales" ADD CONSTRAINT "_partners_v_blocks_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_parent_id_partners_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v_locales" ADD CONSTRAINT "_partners_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v_rels" ADD CONSTRAINT "_partners_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v_rels" ADD CONSTRAINT "_partners_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees" ADD CONSTRAINT "committees_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "committees_locales" ADD CONSTRAINT "committees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_rels" ADD CONSTRAINT "committees_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_rels" ADD CONSTRAINT "committees_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_parent_id_committees_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."committees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v_locales" ADD CONSTRAINT "_committees_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_rels" ADD CONSTRAINT "_committees_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_rels" ADD CONSTRAINT "_committees_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "boards_members" ADD CONSTRAINT "boards_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "boards_members" ADD CONSTRAINT "boards_members_linkedin_url_page_id_pages_id_fk" FOREIGN KEY ("linkedin_url_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "boards_members" ADD CONSTRAINT "boards_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "boards_members_locales" ADD CONSTRAINT "boards_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."boards_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "boards" ADD CONSTRAINT "boards_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "boards_locales" ADD CONSTRAINT "boards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "boards_rels" ADD CONSTRAINT "boards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "boards_rels" ADD CONSTRAINT "boards_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_boards_v_version_members" ADD CONSTRAINT "_boards_v_version_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_boards_v_version_members" ADD CONSTRAINT "_boards_v_version_members_linkedin_url_page_id_pages_id_fk" FOREIGN KEY ("linkedin_url_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_boards_v_version_members" ADD CONSTRAINT "_boards_v_version_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_boards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_boards_v_version_members_locales" ADD CONSTRAINT "_boards_v_version_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_boards_v_version_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_boards_v" ADD CONSTRAINT "_boards_v_parent_id_boards_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."boards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_boards_v" ADD CONSTRAINT "_boards_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_boards_v_locales" ADD CONSTRAINT "_boards_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_boards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_boards_v_rels" ADD CONSTRAINT "_boards_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_boards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_boards_v_rels" ADD CONSTRAINT "_boards_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_blocks_button" ADD CONSTRAINT "vacancies_blocks_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies_blocks_button" ADD CONSTRAINT "vacancies_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_blocks_button_locales" ADD CONSTRAINT "vacancies_blocks_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_locales" ADD CONSTRAINT "vacancies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_job_types_fk" FOREIGN KEY ("job_types_id") REFERENCES "public"."job_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_blocks_button" ADD CONSTRAINT "_vacancies_v_blocks_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vacancies_v_blocks_button" ADD CONSTRAINT "_vacancies_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacancies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_blocks_button_locales" ADD CONSTRAINT "_vacancies_v_blocks_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacancies_v_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v" ADD CONSTRAINT "_vacancies_v_parent_id_vacancies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vacancies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vacancies_v_locales" ADD CONSTRAINT "_vacancies_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vacancies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_rels" ADD CONSTRAINT "_vacancies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_vacancies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_rels" ADD CONSTRAINT "_vacancies_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_rels" ADD CONSTRAINT "_vacancies_v_rels_job_types_fk" FOREIGN KEY ("job_types_id") REFERENCES "public"."job_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_rels" ADD CONSTRAINT "_vacancies_v_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vacancies_v_rels" ADD CONSTRAINT "_vacancies_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items" ADD CONSTRAINT "news_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items_locales" ADD CONSTRAINT "news_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items_rels" ADD CONSTRAINT "news_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items_rels" ADD CONSTRAINT "news_items_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_items_v" ADD CONSTRAINT "_news_items_v_parent_id_news_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_items_v" ADD CONSTRAINT "_news_items_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_items_v_locales" ADD CONSTRAINT "_news_items_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_items_v_rels" ADD CONSTRAINT "_news_items_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_items_v_rels" ADD CONSTRAINT "_news_items_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies" ADD CONSTRAINT "societies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "societies_locales" ADD CONSTRAINT "societies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_rels" ADD CONSTRAINT "societies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_rels" ADD CONSTRAINT "societies_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_rels" ADD CONSTRAINT "societies_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v" ADD CONSTRAINT "_societies_v_parent_id_societies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."societies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v" ADD CONSTRAINT "_societies_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_locales" ADD CONSTRAINT "_societies_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_rels" ADD CONSTRAINT "_societies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_rels" ADD CONSTRAINT "_societies_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_rels" ADD CONSTRAINT "_societies_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_locales" ADD CONSTRAINT "programmes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_parent_id_programmes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v_locales" ADD CONSTRAINT "_programmes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_types_locales" ADD CONSTRAINT "job_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_types_rels" ADD CONSTRAINT "job_types_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."job_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_types_rels" ADD CONSTRAINT "job_types_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_job_types_v" ADD CONSTRAINT "_job_types_v_parent_id_job_types_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."job_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_job_types_v_locales" ADD CONSTRAINT "_job_types_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_job_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_job_types_v_rels" ADD CONSTRAINT "_job_types_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_job_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_job_types_v_rels" ADD CONSTRAINT "_job_types_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quotes_rels" ADD CONSTRAINT "quotes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quotes_rels" ADD CONSTRAINT "quotes_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quotes_v" ADD CONSTRAINT "_quotes_v_parent_id_quotes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quotes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_quotes_v_rels" ADD CONSTRAINT "_quotes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_quotes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quotes_v_rels" ADD CONSTRAINT "_quotes_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "board_message_rels" ADD CONSTRAINT "board_message_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."board_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "board_message_rels" ADD CONSTRAINT "board_message_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_board_message_v" ADD CONSTRAINT "_board_message_v_parent_id_board_message_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."board_message"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_message_v_rels" ADD CONSTRAINT "_board_message_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_board_message_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_board_message_v_rels" ADD CONSTRAINT "_board_message_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ads" ADD CONSTRAINT "ads_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads_rels" ADD CONSTRAINT "ads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ads_rels" ADD CONSTRAINT "ads_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_parent_id_ads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v" ADD CONSTRAINT "_ads_v_version_poster_id_media_id_fk" FOREIGN KEY ("version_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ads_v_rels" ADD CONSTRAINT "_ads_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ads_v_rels" ADD CONSTRAINT "_ads_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_person_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_supermentor_fk" FOREIGN KEY ("supermentor_id") REFERENCES "public"."supermentor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_question_fk" FOREIGN KEY ("faq_question_id") REFERENCES "public"."faq_question"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_committees_fk" FOREIGN KEY ("committees_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_boards_fk" FOREIGN KEY ("boards_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_items_fk" FOREIGN KEY ("news_items_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_societies_fk" FOREIGN KEY ("societies_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_types_fk" FOREIGN KEY ("job_types_id") REFERENCES "public"."job_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quotes_fk" FOREIGN KEY ("quotes_id") REFERENCES "public"."quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_message_fk" FOREIGN KEY ("board_message_id") REFERENCES "public"."board_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ads_fk" FOREIGN KEY ("ads_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_llm_instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_rels" ADD CONSTRAINT "hero_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_rels" ADD CONSTRAINT "hero_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_rels" ADD CONSTRAINT "hero_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hero_v_rels" ADD CONSTRAINT "_hero_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hero_v_rels" ADD CONSTRAINT "_hero_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hero_v_rels" ADD CONSTRAINT "_hero_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "association_rels" ADD CONSTRAINT "association_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."association"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "association_rels" ADD CONSTRAINT "association_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_association_v_rels" ADD CONSTRAINT "_association_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_association_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_association_v_rels" ADD CONSTRAINT "_association_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_rels" ADD CONSTRAINT "contact_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_rels" ADD CONSTRAINT "contact_rels_person_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_rels" ADD CONSTRAINT "contact_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_rels" ADD CONSTRAINT "_contact_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_rels" ADD CONSTRAINT "_contact_v_rels_person_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_rels" ADD CONSTRAINT "_contact_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "signup_rels" ADD CONSTRAINT "signup_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."signup"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "signup_rels" ADD CONSTRAINT "signup_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_signup_v_rels" ADD CONSTRAINT "_signup_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_signup_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_signup_v_rels" ADD CONSTRAINT "_signup_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theme_rels" ADD CONSTRAINT "theme_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."theme"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theme_rels" ADD CONSTRAINT "theme_rels_supermentor_fk" FOREIGN KEY ("supermentor_id") REFERENCES "public"."supermentor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theme_rels" ADD CONSTRAINT "theme_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theme_v_rels" ADD CONSTRAINT "_theme_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_theme_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theme_v_rels" ADD CONSTRAINT "_theme_v_rels_supermentor_fk" FOREIGN KEY ("supermentor_id") REFERENCES "public"."supermentor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theme_v_rels" ADD CONSTRAINT "_theme_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_faq_question_fk" FOREIGN KEY ("faq_question_id") REFERENCES "public"."faq_question"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_v_rels" ADD CONSTRAINT "_faq_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_v_rels" ADD CONSTRAINT "_faq_v_rels_faq_question_fk" FOREIGN KEY ("faq_question_id") REFERENCES "public"."faq_question"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_v_rels" ADD CONSTRAINT "_faq_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "small_print_rels" ADD CONSTRAINT "small_print_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."small_print"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "small_print_rels" ADD CONSTRAINT "small_print_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_small_print_v_rels" ADD CONSTRAINT "_small_print_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_small_print_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_small_print_v_rels" ADD CONSTRAINT "_small_print_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "information_rels" ADD CONSTRAINT "information_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."information"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "information_rels" ADD CONSTRAINT "information_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "information_rels" ADD CONSTRAINT "information_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_information_v_rels" ADD CONSTRAINT "_information_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_information_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_information_v_rels" ADD CONSTRAINT "_information_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_information_v_rels" ADD CONSTRAINT "_information_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_menu_links" ADD CONSTRAINT "navigation_blocks_nav_menu_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_menu_links" ADD CONSTRAINT "navigation_blocks_nav_menu_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_blocks_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_menu_links_locales" ADD CONSTRAINT "navigation_blocks_nav_menu_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_blocks_nav_menu_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_menu" ADD CONSTRAINT "navigation_blocks_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_menu_locales" ADD CONSTRAINT "navigation_blocks_nav_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_blocks_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_button" ADD CONSTRAINT "navigation_blocks_nav_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_button" ADD CONSTRAINT "navigation_blocks_nav_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_blocks_nav_button_locales" ADD CONSTRAINT "navigation_blocks_nav_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_blocks_nav_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_buttons" ADD CONSTRAINT "navigation_buttons_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_buttons" ADD CONSTRAINT "navigation_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_buttons_locales" ADD CONSTRAINT "navigation_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_menu_links" ADD CONSTRAINT "_navigation_v_blocks_nav_menu_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_menu_links" ADD CONSTRAINT "_navigation_v_blocks_nav_menu_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_blocks_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_menu_links_locales" ADD CONSTRAINT "_navigation_v_blocks_nav_menu_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_blocks_nav_menu_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_menu" ADD CONSTRAINT "_navigation_v_blocks_nav_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_menu_locales" ADD CONSTRAINT "_navigation_v_blocks_nav_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_blocks_nav_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_button" ADD CONSTRAINT "_navigation_v_blocks_nav_button_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_button" ADD CONSTRAINT "_navigation_v_blocks_nav_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_blocks_nav_button_locales" ADD CONSTRAINT "_navigation_v_blocks_nav_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_blocks_nav_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_buttons" ADD CONSTRAINT "_navigation_v_version_buttons_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_buttons" ADD CONSTRAINT "_navigation_v_version_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_buttons_locales" ADD CONSTRAINT "_navigation_v_version_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_rels" ADD CONSTRAINT "_navigation_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_rels" ADD CONSTRAINT "_navigation_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_users_id_idx" ON "users_rels" USING btree ("users_id");
  CREATE INDEX "_users_v_version_sessions_order_idx" ON "_users_v_version_sessions" USING btree ("_order");
  CREATE INDEX "_users_v_version_sessions_parent_id_idx" ON "_users_v_version_sessions" USING btree ("_parent_id");
  CREATE INDEX "_users_v_parent_idx" ON "_users_v" USING btree ("parent_id");
  CREATE INDEX "_users_v_version_version_updated_at_idx" ON "_users_v" USING btree ("version_updated_at");
  CREATE INDEX "_users_v_version_version_created_at_idx" ON "_users_v" USING btree ("version_created_at");
  CREATE INDEX "_users_v_version_version_email_idx" ON "_users_v" USING btree ("version_email");
  CREATE INDEX "_users_v_created_at_idx" ON "_users_v" USING btree ("created_at");
  CREATE INDEX "_users_v_updated_at_idx" ON "_users_v" USING btree ("updated_at");
  CREATE INDEX "_users_v_rels_order_idx" ON "_users_v_rels" USING btree ("order");
  CREATE INDEX "_users_v_rels_parent_idx" ON "_users_v_rels" USING btree ("parent_id");
  CREATE INDEX "_users_v_rels_path_idx" ON "_users_v_rels" USING btree ("path");
  CREATE INDEX "_users_v_rels_users_id_idx" ON "_users_v_rels" USING btree ("users_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_original_original_filename_idx" ON "media" USING btree ("original_filename");
  CREATE UNIQUE INDEX "media_locales_parent_id_locale_unique" ON "media_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_users_id_idx" ON "media_rels" USING btree ("users_id");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_original_version_original_filename_idx" ON "_media_v" USING btree ("version_original_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_media_v_locales_parent_id_locale_unique" ON "_media_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_media_v_rels_order_idx" ON "_media_v_rels" USING btree ("order");
  CREATE INDEX "_media_v_rels_parent_idx" ON "_media_v_rels" USING btree ("parent_id");
  CREATE INDEX "_media_v_rels_path_idx" ON "_media_v_rels" USING btree ("path");
  CREATE INDEX "_media_v_rels_users_id_idx" ON "_media_v_rels" USING btree ("users_id");
  CREATE INDEX "person_role_order_idx" ON "person_role" USING btree ("order");
  CREATE INDEX "person_role_parent_idx" ON "person_role" USING btree ("parent_id");
  CREATE INDEX "person_photo_idx" ON "person" USING btree ("photo_id");
  CREATE INDEX "person_updated_at_idx" ON "person" USING btree ("updated_at");
  CREATE INDEX "person_created_at_idx" ON "person" USING btree ("created_at");
  CREATE INDEX "person_rels_order_idx" ON "person_rels" USING btree ("order");
  CREATE INDEX "person_rels_parent_idx" ON "person_rels" USING btree ("parent_id");
  CREATE INDEX "person_rels_path_idx" ON "person_rels" USING btree ("path");
  CREATE INDEX "person_rels_users_id_idx" ON "person_rels" USING btree ("users_id");
  CREATE INDEX "_person_v_version_role_order_idx" ON "_person_v_version_role" USING btree ("order");
  CREATE INDEX "_person_v_version_role_parent_idx" ON "_person_v_version_role" USING btree ("parent_id");
  CREATE INDEX "_person_v_parent_idx" ON "_person_v" USING btree ("parent_id");
  CREATE INDEX "_person_v_version_version_photo_idx" ON "_person_v" USING btree ("version_photo_id");
  CREATE INDEX "_person_v_version_version_updated_at_idx" ON "_person_v" USING btree ("version_updated_at");
  CREATE INDEX "_person_v_version_version_created_at_idx" ON "_person_v" USING btree ("version_created_at");
  CREATE INDEX "_person_v_created_at_idx" ON "_person_v" USING btree ("created_at");
  CREATE INDEX "_person_v_updated_at_idx" ON "_person_v" USING btree ("updated_at");
  CREATE INDEX "_person_v_rels_order_idx" ON "_person_v_rels" USING btree ("order");
  CREATE INDEX "_person_v_rels_parent_idx" ON "_person_v_rels" USING btree ("parent_id");
  CREATE INDEX "_person_v_rels_path_idx" ON "_person_v_rels" USING btree ("path");
  CREATE INDEX "_person_v_rels_users_id_idx" ON "_person_v_rels" USING btree ("users_id");
  CREATE INDEX "supermentor_picture_idx" ON "supermentor" USING btree ("picture_id");
  CREATE INDEX "supermentor_updated_at_idx" ON "supermentor" USING btree ("updated_at");
  CREATE INDEX "supermentor_created_at_idx" ON "supermentor" USING btree ("created_at");
  CREATE INDEX "supermentor_rels_order_idx" ON "supermentor_rels" USING btree ("order");
  CREATE INDEX "supermentor_rels_parent_idx" ON "supermentor_rels" USING btree ("parent_id");
  CREATE INDEX "supermentor_rels_path_idx" ON "supermentor_rels" USING btree ("path");
  CREATE INDEX "supermentor_rels_users_id_idx" ON "supermentor_rels" USING btree ("users_id");
  CREATE INDEX "_supermentor_v_parent_idx" ON "_supermentor_v" USING btree ("parent_id");
  CREATE INDEX "_supermentor_v_version_version_picture_idx" ON "_supermentor_v" USING btree ("version_picture_id");
  CREATE INDEX "_supermentor_v_version_version_updated_at_idx" ON "_supermentor_v" USING btree ("version_updated_at");
  CREATE INDEX "_supermentor_v_version_version_created_at_idx" ON "_supermentor_v" USING btree ("version_created_at");
  CREATE INDEX "_supermentor_v_created_at_idx" ON "_supermentor_v" USING btree ("created_at");
  CREATE INDEX "_supermentor_v_updated_at_idx" ON "_supermentor_v" USING btree ("updated_at");
  CREATE INDEX "_supermentor_v_rels_order_idx" ON "_supermentor_v_rels" USING btree ("order");
  CREATE INDEX "_supermentor_v_rels_parent_idx" ON "_supermentor_v_rels" USING btree ("parent_id");
  CREATE INDEX "_supermentor_v_rels_path_idx" ON "_supermentor_v_rels" USING btree ("path");
  CREATE INDEX "_supermentor_v_rels_users_id_idx" ON "_supermentor_v_rels" USING btree ("users_id");
  CREATE INDEX "faq_question_updated_at_idx" ON "faq_question" USING btree ("updated_at");
  CREATE INDEX "faq_question_created_at_idx" ON "faq_question" USING btree ("created_at");
  CREATE INDEX "faq_question_rels_order_idx" ON "faq_question_rels" USING btree ("order");
  CREATE INDEX "faq_question_rels_parent_idx" ON "faq_question_rels" USING btree ("parent_id");
  CREATE INDEX "faq_question_rels_path_idx" ON "faq_question_rels" USING btree ("path");
  CREATE INDEX "faq_question_rels_users_id_idx" ON "faq_question_rels" USING btree ("users_id");
  CREATE INDEX "_faq_question_v_parent_idx" ON "_faq_question_v" USING btree ("parent_id");
  CREATE INDEX "_faq_question_v_version_version_updated_at_idx" ON "_faq_question_v" USING btree ("version_updated_at");
  CREATE INDEX "_faq_question_v_version_version_created_at_idx" ON "_faq_question_v" USING btree ("version_created_at");
  CREATE INDEX "_faq_question_v_created_at_idx" ON "_faq_question_v" USING btree ("created_at");
  CREATE INDEX "_faq_question_v_updated_at_idx" ON "_faq_question_v" USING btree ("updated_at");
  CREATE INDEX "_faq_question_v_rels_order_idx" ON "_faq_question_v_rels" USING btree ("order");
  CREATE INDEX "_faq_question_v_rels_parent_idx" ON "_faq_question_v_rels" USING btree ("parent_id");
  CREATE INDEX "_faq_question_v_rels_path_idx" ON "_faq_question_v_rels" USING btree ("path");
  CREATE INDEX "_faq_question_v_rels_users_id_idx" ON "_faq_question_v_rels" USING btree ("users_id");
  CREATE INDEX "pages_blocks_title_order_idx" ON "pages_blocks_title" USING btree ("_order");
  CREATE INDEX "pages_blocks_title_parent_id_idx" ON "pages_blocks_title" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_title_path_idx" ON "pages_blocks_title" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_title_locales_parent_id_locale_unique" ON "pages_blocks_title_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_parent_id_locale_unique" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_separator_order_idx" ON "pages_blocks_separator" USING btree ("_order");
  CREATE INDEX "pages_blocks_separator_parent_id_idx" ON "pages_blocks_separator" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_separator_path_idx" ON "pages_blocks_separator" USING btree ("_path");
  CREATE INDEX "pages_blocks_committee_overview_order_idx" ON "pages_blocks_committee_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_committee_overview_parent_id_idx" ON "pages_blocks_committee_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_committee_overview_path_idx" ON "pages_blocks_committee_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_partner_overview_order_idx" ON "pages_blocks_partner_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_partner_overview_parent_id_idx" ON "pages_blocks_partner_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_overview_path_idx" ON "pages_blocks_partner_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_vacancy_overview_order_idx" ON "pages_blocks_vacancy_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_vacancy_overview_parent_id_idx" ON "pages_blocks_vacancy_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vacancy_overview_path_idx" ON "pages_blocks_vacancy_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_overview_order_idx" ON "pages_blocks_news_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_overview_parent_id_idx" ON "pages_blocks_news_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_overview_path_idx" ON "pages_blocks_news_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_society_overview_order_idx" ON "pages_blocks_society_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_society_overview_parent_id_idx" ON "pages_blocks_society_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_society_overview_path_idx" ON "pages_blocks_society_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_current_board_order_idx" ON "pages_blocks_current_board" USING btree ("_order");
  CREATE INDEX "pages_blocks_current_board_parent_id_idx" ON "pages_blocks_current_board" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_current_board_path_idx" ON "pages_blocks_current_board" USING btree ("_path");
  CREATE INDEX "pages_blocks_old_boards_order_idx" ON "pages_blocks_old_boards" USING btree ("_order");
  CREATE INDEX "pages_blocks_old_boards_parent_id_idx" ON "pages_blocks_old_boards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_old_boards_path_idx" ON "pages_blocks_old_boards" USING btree ("_path");
  CREATE INDEX "pages_blocks_activities_order_idx" ON "pages_blocks_activities" USING btree ("_order");
  CREATE INDEX "pages_blocks_activities_parent_id_idx" ON "pages_blocks_activities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_activities_path_idx" ON "pages_blocks_activities" USING btree ("_path");
  CREATE INDEX "pages_blocks_links_page_links_order_idx" ON "pages_blocks_links_page_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_links_page_links_parent_id_idx" ON "pages_blocks_links_page_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_links_page_links_url_url_page_idx" ON "pages_blocks_links_page_links" USING btree ("url_page_id");
  CREATE UNIQUE INDEX "pages_blocks_links_page_links_locales_parent_id_locale_uniqu" ON "pages_blocks_links_page_links_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_links_page_order_idx" ON "pages_blocks_links_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_links_page_parent_id_idx" ON "pages_blocks_links_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_links_page_path_idx" ON "pages_blocks_links_page" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_items_photo_idx" ON "pages_blocks_timeline_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_timeline_items_locales_parent_id_locale_unique" ON "pages_blocks_timeline_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_lvv_page_people_order_idx" ON "pages_blocks_lvv_page_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_lvv_page_people_parent_id_idx" ON "pages_blocks_lvv_page_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lvv_page_people_photo_idx" ON "pages_blocks_lvv_page_people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_lvv_page_people_locales_parent_id_locale_unique" ON "pages_blocks_lvv_page_people_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_lvv_page_order_idx" ON "pages_blocks_lvv_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_lvv_page_parent_id_idx" ON "pages_blocks_lvv_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lvv_page_path_idx" ON "pages_blocks_lvv_page" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_grid_people_order_idx" ON "pages_blocks_contact_grid_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_grid_people_parent_id_idx" ON "pages_blocks_contact_grid_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_grid_people_photo_idx" ON "pages_blocks_contact_grid_people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_grid_people_locales_parent_id_locale_un" ON "pages_blocks_contact_grid_people_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_contact_grid_order_idx" ON "pages_blocks_contact_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_grid_parent_id_idx" ON "pages_blocks_contact_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_grid_path_idx" ON "pages_blocks_contact_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_grid_locales_parent_id_locale_unique" ON "pages_blocks_contact_grid_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_branding_colour_order_idx" ON "pages_blocks_branding_colour" USING btree ("_order");
  CREATE INDEX "pages_blocks_branding_colour_parent_id_idx" ON "pages_blocks_branding_colour" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branding_colour_path_idx" ON "pages_blocks_branding_colour" USING btree ("_path");
  CREATE INDEX "pages_blocks_branding_logos_logo_types_order_idx" ON "pages_blocks_branding_logos_logo_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_branding_logos_logo_types_parent_id_idx" ON "pages_blocks_branding_logos_logo_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_branding_logos_logo_types_locales_parent_id_loc" ON "pages_blocks_branding_logos_logo_types_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_branding_logos_order_idx" ON "pages_blocks_branding_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_branding_logos_parent_id_idx" ON "pages_blocks_branding_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branding_logos_path_idx" ON "pages_blocks_branding_logos" USING btree ("_path");
  CREATE INDEX "pages_blocks_branding_poster_specs_order_idx" ON "pages_blocks_branding_poster_specs" USING btree ("_order");
  CREATE INDEX "pages_blocks_branding_poster_specs_parent_id_idx" ON "pages_blocks_branding_poster_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_branding_poster_specs_locales_parent_id_locale_" ON "pages_blocks_branding_poster_specs_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_branding_poster_order_idx" ON "pages_blocks_branding_poster" USING btree ("_order");
  CREATE INDEX "pages_blocks_branding_poster_parent_id_idx" ON "pages_blocks_branding_poster" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branding_poster_path_idx" ON "pages_blocks_branding_poster" USING btree ("_path");
  CREATE INDEX "pages_blocks_partnering_reasons_reasons_order_idx" ON "pages_blocks_partnering_reasons_reasons" USING btree ("_order");
  CREATE INDEX "pages_blocks_partnering_reasons_reasons_parent_id_idx" ON "pages_blocks_partnering_reasons_reasons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_partnering_reasons_reasons_locales_parent_id_lo" ON "pages_blocks_partnering_reasons_reasons_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_partnering_reasons_order_idx" ON "pages_blocks_partnering_reasons" USING btree ("_order");
  CREATE INDEX "pages_blocks_partnering_reasons_parent_id_idx" ON "pages_blocks_partnering_reasons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partnering_reasons_path_idx" ON "pages_blocks_partnering_reasons" USING btree ("_path");
  CREATE INDEX "pages_blocks_collaboration_form_order_idx" ON "pages_blocks_collaboration_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_collaboration_form_parent_id_idx" ON "pages_blocks_collaboration_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_collaboration_form_path_idx" ON "pages_blocks_collaboration_form" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_collaboration_form_locales_parent_id_locale_uni" ON "pages_blocks_collaboration_form_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_branding_twocol_order_idx" ON "pages_blocks_branding_twocol" USING btree ("_order");
  CREATE INDEX "pages_blocks_branding_twocol_parent_id_idx" ON "pages_blocks_branding_twocol" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branding_twocol_path_idx" ON "pages_blocks_branding_twocol" USING btree ("_path");
  CREATE INDEX "pages_blocks_promotion_possibilities_order_idx" ON "pages_blocks_promotion_possibilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_promotion_possibilities_parent_id_idx" ON "pages_blocks_promotion_possibilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_promotion_possibilities_locales_parent_id_local" ON "pages_blocks_promotion_possibilities_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_promotion_sponsored_activities_order_idx" ON "pages_blocks_promotion_sponsored_activities" USING btree ("_order");
  CREATE INDEX "pages_blocks_promotion_sponsored_activities_parent_id_idx" ON "pages_blocks_promotion_sponsored_activities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promotion_sponsored_activities_photo_idx" ON "pages_blocks_promotion_sponsored_activities" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_promotion_sponsored_activities_locales_parent_i" ON "pages_blocks_promotion_sponsored_activities_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_promotion_order_idx" ON "pages_blocks_promotion" USING btree ("_order");
  CREATE INDEX "pages_blocks_promotion_parent_id_idx" ON "pages_blocks_promotion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promotion_path_idx" ON "pages_blocks_promotion" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_promotion_locales_parent_id_locale_unique" ON "pages_blocks_promotion_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_button_link_link_page_idx" ON "pages_blocks_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "pages_blocks_button_locales_parent_id_locale_unique" ON "pages_blocks_button_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_parent_id_locale_unique" ON "pages_blocks_hero_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_featured_partner_banner_order_idx" ON "pages_blocks_featured_partner_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_partner_banner_parent_id_idx" ON "pages_blocks_featured_partner_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_partner_banner_path_idx" ON "pages_blocks_featured_partner_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_partner_banner_link_link_page_idx" ON "pages_blocks_featured_partner_banner" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_stat_item_order_idx" ON "pages_blocks_stat_item" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_item_parent_id_idx" ON "pages_blocks_stat_item" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_item_path_idx" ON "pages_blocks_stat_item" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stat_item_locales_parent_id_locale_unique" ON "pages_blocks_stat_item_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_stats_section_order_idx" ON "pages_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_section_parent_id_idx" ON "pages_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_section_path_idx" ON "pages_blocks_stats_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_info_columns_order_idx" ON "pages_blocks_info_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_columns_parent_id_idx" ON "pages_blocks_info_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_columns_path_idx" ON "pages_blocks_info_columns" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_info_columns_locales_parent_id_locale_unique" ON "pages_blocks_info_columns_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_blocks_partner_carousel_order_idx" ON "pages_blocks_partner_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_partner_carousel_parent_id_idx" ON "pages_blocks_partner_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_carousel_path_idx" ON "pages_blocks_partner_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_carousel_order_idx" ON "pages_blocks_news_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_carousel_parent_id_idx" ON "pages_blocks_news_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_carousel_path_idx" ON "pages_blocks_news_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_activities_carousel_order_idx" ON "pages_blocks_activities_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_activities_carousel_parent_id_idx" ON "pages_blocks_activities_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_activities_carousel_path_idx" ON "pages_blocks_activities_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_vcp_page_people_order_idx" ON "pages_blocks_vcp_page_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_vcp_page_people_parent_id_idx" ON "pages_blocks_vcp_page_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vcp_page_people_photo_idx" ON "pages_blocks_vcp_page_people" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_vcp_page_order_idx" ON "pages_blocks_vcp_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_vcp_page_parent_id_idx" ON "pages_blocks_vcp_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vcp_page_path_idx" ON "pages_blocks_vcp_page" USING btree ("_path");
  CREATE INDEX "pages_blocks_vcp_page_poster_idx" ON "pages_blocks_vcp_page_locales" USING btree ("poster_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_vcp_page_locales_parent_id_locale_unique" ON "pages_blocks_vcp_page_locales" USING btree ("_parent_id","_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_parent_id_locale_unique" ON "pages_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "pages_rels_users_id_idx" ON "pages_rels" USING btree ("users_id");
  CREATE INDEX "_pages_v_blocks_title_order_idx" ON "_pages_v_blocks_title" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_title_parent_id_idx" ON "_pages_v_blocks_title" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_title_path_idx" ON "_pages_v_blocks_title" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_title_locales_parent_id_locale_unique" ON "_pages_v_blocks_title_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_parent_id_locale_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_separator_order_idx" ON "_pages_v_blocks_separator" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_separator_parent_id_idx" ON "_pages_v_blocks_separator" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_separator_path_idx" ON "_pages_v_blocks_separator" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_committee_overview_order_idx" ON "_pages_v_blocks_committee_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_committee_overview_parent_id_idx" ON "_pages_v_blocks_committee_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_committee_overview_path_idx" ON "_pages_v_blocks_committee_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partner_overview_order_idx" ON "_pages_v_blocks_partner_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partner_overview_parent_id_idx" ON "_pages_v_blocks_partner_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_overview_path_idx" ON "_pages_v_blocks_partner_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vacancy_overview_order_idx" ON "_pages_v_blocks_vacancy_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vacancy_overview_parent_id_idx" ON "_pages_v_blocks_vacancy_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vacancy_overview_path_idx" ON "_pages_v_blocks_vacancy_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_overview_order_idx" ON "_pages_v_blocks_news_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_overview_parent_id_idx" ON "_pages_v_blocks_news_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_overview_path_idx" ON "_pages_v_blocks_news_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_society_overview_order_idx" ON "_pages_v_blocks_society_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_society_overview_parent_id_idx" ON "_pages_v_blocks_society_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_society_overview_path_idx" ON "_pages_v_blocks_society_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_current_board_order_idx" ON "_pages_v_blocks_current_board" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_current_board_parent_id_idx" ON "_pages_v_blocks_current_board" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_current_board_path_idx" ON "_pages_v_blocks_current_board" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_old_boards_order_idx" ON "_pages_v_blocks_old_boards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_old_boards_parent_id_idx" ON "_pages_v_blocks_old_boards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_old_boards_path_idx" ON "_pages_v_blocks_old_boards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_activities_order_idx" ON "_pages_v_blocks_activities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_activities_parent_id_idx" ON "_pages_v_blocks_activities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_path_idx" ON "_pages_v_blocks_activities" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_links_page_links_order_idx" ON "_pages_v_blocks_links_page_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_links_page_links_parent_id_idx" ON "_pages_v_blocks_links_page_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_links_page_links_url_url_page_idx" ON "_pages_v_blocks_links_page_links" USING btree ("url_page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_links_page_links_locales_parent_id_locale_un" ON "_pages_v_blocks_links_page_links_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_links_page_order_idx" ON "_pages_v_blocks_links_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_links_page_parent_id_idx" ON "_pages_v_blocks_links_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_links_page_path_idx" ON "_pages_v_blocks_links_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_items_photo_idx" ON "_pages_v_blocks_timeline_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_timeline_items_locales_parent_id_locale_uniq" ON "_pages_v_blocks_timeline_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lvv_page_people_order_idx" ON "_pages_v_blocks_lvv_page_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lvv_page_people_parent_id_idx" ON "_pages_v_blocks_lvv_page_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lvv_page_people_photo_idx" ON "_pages_v_blocks_lvv_page_people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lvv_page_people_locales_parent_id_locale_uni" ON "_pages_v_blocks_lvv_page_people_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_lvv_page_order_idx" ON "_pages_v_blocks_lvv_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lvv_page_parent_id_idx" ON "_pages_v_blocks_lvv_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lvv_page_path_idx" ON "_pages_v_blocks_lvv_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_grid_people_order_idx" ON "_pages_v_blocks_contact_grid_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_grid_people_parent_id_idx" ON "_pages_v_blocks_contact_grid_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_grid_people_photo_idx" ON "_pages_v_blocks_contact_grid_people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_grid_people_locales_parent_id_locale" ON "_pages_v_blocks_contact_grid_people_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_contact_grid_order_idx" ON "_pages_v_blocks_contact_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_grid_parent_id_idx" ON "_pages_v_blocks_contact_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_grid_path_idx" ON "_pages_v_blocks_contact_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_grid_locales_parent_id_locale_unique" ON "_pages_v_blocks_contact_grid_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_branding_colour_order_idx" ON "_pages_v_blocks_branding_colour" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branding_colour_parent_id_idx" ON "_pages_v_blocks_branding_colour" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branding_colour_path_idx" ON "_pages_v_blocks_branding_colour" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_branding_logos_logo_types_order_idx" ON "_pages_v_blocks_branding_logos_logo_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branding_logos_logo_types_parent_id_idx" ON "_pages_v_blocks_branding_logos_logo_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_branding_logos_logo_types_locales_parent_id_" ON "_pages_v_blocks_branding_logos_logo_types_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_branding_logos_order_idx" ON "_pages_v_blocks_branding_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branding_logos_parent_id_idx" ON "_pages_v_blocks_branding_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branding_logos_path_idx" ON "_pages_v_blocks_branding_logos" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_branding_poster_specs_order_idx" ON "_pages_v_blocks_branding_poster_specs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branding_poster_specs_parent_id_idx" ON "_pages_v_blocks_branding_poster_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_branding_poster_specs_locales_parent_id_loca" ON "_pages_v_blocks_branding_poster_specs_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_branding_poster_order_idx" ON "_pages_v_blocks_branding_poster" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branding_poster_parent_id_idx" ON "_pages_v_blocks_branding_poster" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branding_poster_path_idx" ON "_pages_v_blocks_branding_poster" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partnering_reasons_reasons_order_idx" ON "_pages_v_blocks_partnering_reasons_reasons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partnering_reasons_reasons_parent_id_idx" ON "_pages_v_blocks_partnering_reasons_reasons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_partnering_reasons_reasons_locales_parent_id" ON "_pages_v_blocks_partnering_reasons_reasons_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_partnering_reasons_order_idx" ON "_pages_v_blocks_partnering_reasons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partnering_reasons_parent_id_idx" ON "_pages_v_blocks_partnering_reasons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partnering_reasons_path_idx" ON "_pages_v_blocks_partnering_reasons" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_collaboration_form_order_idx" ON "_pages_v_blocks_collaboration_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_collaboration_form_parent_id_idx" ON "_pages_v_blocks_collaboration_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_collaboration_form_path_idx" ON "_pages_v_blocks_collaboration_form" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_collaboration_form_locales_parent_id_locale_" ON "_pages_v_blocks_collaboration_form_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_branding_twocol_order_idx" ON "_pages_v_blocks_branding_twocol" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branding_twocol_parent_id_idx" ON "_pages_v_blocks_branding_twocol" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branding_twocol_path_idx" ON "_pages_v_blocks_branding_twocol" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_promotion_possibilities_order_idx" ON "_pages_v_blocks_promotion_possibilities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promotion_possibilities_parent_id_idx" ON "_pages_v_blocks_promotion_possibilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_promotion_possibilities_locales_parent_id_lo" ON "_pages_v_blocks_promotion_possibilities_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_promotion_sponsored_activities_order_idx" ON "_pages_v_blocks_promotion_sponsored_activities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promotion_sponsored_activities_parent_id_idx" ON "_pages_v_blocks_promotion_sponsored_activities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promotion_sponsored_activities_photo_idx" ON "_pages_v_blocks_promotion_sponsored_activities" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_promotion_sponsored_activities_locales_paren" ON "_pages_v_blocks_promotion_sponsored_activities_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_promotion_order_idx" ON "_pages_v_blocks_promotion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promotion_parent_id_idx" ON "_pages_v_blocks_promotion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promotion_path_idx" ON "_pages_v_blocks_promotion" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_promotion_locales_parent_id_locale_unique" ON "_pages_v_blocks_promotion_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_button_order_idx" ON "_pages_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_parent_id_idx" ON "_pages_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_path_idx" ON "_pages_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_link_link_page_idx" ON "_pages_v_blocks_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_button_locales_parent_id_locale_unique" ON "_pages_v_blocks_button_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_parent_id_locale_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_featured_partner_banner_order_idx" ON "_pages_v_blocks_featured_partner_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_partner_banner_parent_id_idx" ON "_pages_v_blocks_featured_partner_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_partner_banner_path_idx" ON "_pages_v_blocks_featured_partner_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_partner_banner_link_link_page_idx" ON "_pages_v_blocks_featured_partner_banner" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_stat_item_order_idx" ON "_pages_v_blocks_stat_item" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_item_parent_id_idx" ON "_pages_v_blocks_stat_item" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_item_path_idx" ON "_pages_v_blocks_stat_item" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stat_item_locales_parent_id_locale_unique" ON "_pages_v_blocks_stat_item_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_stats_section_order_idx" ON "_pages_v_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_section_parent_id_idx" ON "_pages_v_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_section_path_idx" ON "_pages_v_blocks_stats_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_info_columns_order_idx" ON "_pages_v_blocks_info_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_columns_parent_id_idx" ON "_pages_v_blocks_info_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_columns_path_idx" ON "_pages_v_blocks_info_columns" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_info_columns_locales_parent_id_locale_unique" ON "_pages_v_blocks_info_columns_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_blocks_partner_carousel_order_idx" ON "_pages_v_blocks_partner_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partner_carousel_parent_id_idx" ON "_pages_v_blocks_partner_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_carousel_path_idx" ON "_pages_v_blocks_partner_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_carousel_order_idx" ON "_pages_v_blocks_news_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_carousel_parent_id_idx" ON "_pages_v_blocks_news_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_carousel_path_idx" ON "_pages_v_blocks_news_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_activities_carousel_order_idx" ON "_pages_v_blocks_activities_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_activities_carousel_parent_id_idx" ON "_pages_v_blocks_activities_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_carousel_path_idx" ON "_pages_v_blocks_activities_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vcp_page_people_order_idx" ON "_pages_v_blocks_vcp_page_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vcp_page_people_parent_id_idx" ON "_pages_v_blocks_vcp_page_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vcp_page_people_photo_idx" ON "_pages_v_blocks_vcp_page_people" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_vcp_page_order_idx" ON "_pages_v_blocks_vcp_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vcp_page_parent_id_idx" ON "_pages_v_blocks_vcp_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vcp_page_path_idx" ON "_pages_v_blocks_vcp_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vcp_page_poster_idx" ON "_pages_v_blocks_vcp_page_locales" USING btree ("poster_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_vcp_page_locales_parent_id_locale_unique" ON "_pages_v_blocks_vcp_page_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_pages_v_locales_parent_id_locale_unique" ON "_pages_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_rels_users_id_idx" ON "_pages_v_rels" USING btree ("users_id");
  CREATE INDEX "partners_blocks_button_order_idx" ON "partners_blocks_button" USING btree ("_order");
  CREATE INDEX "partners_blocks_button_parent_id_idx" ON "partners_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "partners_blocks_button_path_idx" ON "partners_blocks_button" USING btree ("_path");
  CREATE INDEX "partners_blocks_button_link_link_page_idx" ON "partners_blocks_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "partners_blocks_button_locales_parent_id_locale_unique" ON "partners_blocks_button_locales" USING btree ("_parent_id","_locale");
  CREATE UNIQUE INDEX "partners_slug_idx" ON "partners" USING btree ("slug");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "partners_locales_parent_id_locale_unique" ON "partners_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "partners_rels_order_idx" ON "partners_rels" USING btree ("order");
  CREATE INDEX "partners_rels_parent_idx" ON "partners_rels" USING btree ("parent_id");
  CREATE INDEX "partners_rels_path_idx" ON "partners_rels" USING btree ("path");
  CREATE INDEX "partners_rels_users_id_idx" ON "partners_rels" USING btree ("users_id");
  CREATE INDEX "_partners_v_blocks_button_order_idx" ON "_partners_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_partners_v_blocks_button_parent_id_idx" ON "_partners_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_partners_v_blocks_button_path_idx" ON "_partners_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_partners_v_blocks_button_link_link_page_idx" ON "_partners_v_blocks_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_partners_v_blocks_button_locales_parent_id_locale_unique" ON "_partners_v_blocks_button_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_partners_v_parent_idx" ON "_partners_v" USING btree ("parent_id");
  CREATE INDEX "_partners_v_version_version_slug_idx" ON "_partners_v" USING btree ("version_slug");
  CREATE INDEX "_partners_v_version_version_logo_idx" ON "_partners_v" USING btree ("version_logo_id");
  CREATE INDEX "_partners_v_version_version_updated_at_idx" ON "_partners_v" USING btree ("version_updated_at");
  CREATE INDEX "_partners_v_version_version_created_at_idx" ON "_partners_v" USING btree ("version_created_at");
  CREATE INDEX "_partners_v_created_at_idx" ON "_partners_v" USING btree ("created_at");
  CREATE INDEX "_partners_v_updated_at_idx" ON "_partners_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_partners_v_locales_parent_id_locale_unique" ON "_partners_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_partners_v_rels_order_idx" ON "_partners_v_rels" USING btree ("order");
  CREATE INDEX "_partners_v_rels_parent_idx" ON "_partners_v_rels" USING btree ("parent_id");
  CREATE INDEX "_partners_v_rels_path_idx" ON "_partners_v_rels" USING btree ("path");
  CREATE INDEX "_partners_v_rels_users_id_idx" ON "_partners_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "committees_slug_idx" ON "committees" USING btree ("slug");
  CREATE INDEX "committees_logo_idx" ON "committees" USING btree ("logo_id");
  CREATE INDEX "committees_updated_at_idx" ON "committees" USING btree ("updated_at");
  CREATE INDEX "committees_created_at_idx" ON "committees" USING btree ("created_at");
  CREATE UNIQUE INDEX "committees_locales_parent_id_locale_unique" ON "committees_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "committees_rels_order_idx" ON "committees_rels" USING btree ("order");
  CREATE INDEX "committees_rels_parent_idx" ON "committees_rels" USING btree ("parent_id");
  CREATE INDEX "committees_rels_path_idx" ON "committees_rels" USING btree ("path");
  CREATE INDEX "committees_rels_users_id_idx" ON "committees_rels" USING btree ("users_id");
  CREATE INDEX "_committees_v_parent_idx" ON "_committees_v" USING btree ("parent_id");
  CREATE INDEX "_committees_v_version_version_slug_idx" ON "_committees_v" USING btree ("version_slug");
  CREATE INDEX "_committees_v_version_version_logo_idx" ON "_committees_v" USING btree ("version_logo_id");
  CREATE INDEX "_committees_v_version_version_updated_at_idx" ON "_committees_v" USING btree ("version_updated_at");
  CREATE INDEX "_committees_v_version_version_created_at_idx" ON "_committees_v" USING btree ("version_created_at");
  CREATE INDEX "_committees_v_created_at_idx" ON "_committees_v" USING btree ("created_at");
  CREATE INDEX "_committees_v_updated_at_idx" ON "_committees_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_committees_v_locales_parent_id_locale_unique" ON "_committees_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_committees_v_rels_order_idx" ON "_committees_v_rels" USING btree ("order");
  CREATE INDEX "_committees_v_rels_parent_idx" ON "_committees_v_rels" USING btree ("parent_id");
  CREATE INDEX "_committees_v_rels_path_idx" ON "_committees_v_rels" USING btree ("path");
  CREATE INDEX "_committees_v_rels_users_id_idx" ON "_committees_v_rels" USING btree ("users_id");
  CREATE INDEX "boards_members_order_idx" ON "boards_members" USING btree ("_order");
  CREATE INDEX "boards_members_parent_id_idx" ON "boards_members" USING btree ("_parent_id");
  CREATE INDEX "boards_members_photo_idx" ON "boards_members" USING btree ("photo_id");
  CREATE INDEX "boards_members_linkedin_url_linkedin_url_page_idx" ON "boards_members" USING btree ("linkedin_url_page_id");
  CREATE UNIQUE INDEX "boards_members_locales_parent_id_locale_unique" ON "boards_members_locales" USING btree ("_parent_id","_locale");
  CREATE UNIQUE INDEX "boards_slug_idx" ON "boards" USING btree ("slug");
  CREATE INDEX "boards_photo_idx" ON "boards" USING btree ("photo_id");
  CREATE INDEX "boards_updated_at_idx" ON "boards" USING btree ("updated_at");
  CREATE INDEX "boards_created_at_idx" ON "boards" USING btree ("created_at");
  CREATE UNIQUE INDEX "boards_locales_parent_id_locale_unique" ON "boards_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "boards_rels_order_idx" ON "boards_rels" USING btree ("order");
  CREATE INDEX "boards_rels_parent_idx" ON "boards_rels" USING btree ("parent_id");
  CREATE INDEX "boards_rels_path_idx" ON "boards_rels" USING btree ("path");
  CREATE INDEX "boards_rels_users_id_idx" ON "boards_rels" USING btree ("users_id");
  CREATE INDEX "_boards_v_version_members_order_idx" ON "_boards_v_version_members" USING btree ("_order");
  CREATE INDEX "_boards_v_version_members_parent_id_idx" ON "_boards_v_version_members" USING btree ("_parent_id");
  CREATE INDEX "_boards_v_version_members_photo_idx" ON "_boards_v_version_members" USING btree ("photo_id");
  CREATE INDEX "_boards_v_version_members_linkedin_url_linkedin_url_page_idx" ON "_boards_v_version_members" USING btree ("linkedin_url_page_id");
  CREATE UNIQUE INDEX "_boards_v_version_members_locales_parent_id_locale_unique" ON "_boards_v_version_members_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_boards_v_parent_idx" ON "_boards_v" USING btree ("parent_id");
  CREATE INDEX "_boards_v_version_version_slug_idx" ON "_boards_v" USING btree ("version_slug");
  CREATE INDEX "_boards_v_version_version_photo_idx" ON "_boards_v" USING btree ("version_photo_id");
  CREATE INDEX "_boards_v_version_version_updated_at_idx" ON "_boards_v" USING btree ("version_updated_at");
  CREATE INDEX "_boards_v_version_version_created_at_idx" ON "_boards_v" USING btree ("version_created_at");
  CREATE INDEX "_boards_v_created_at_idx" ON "_boards_v" USING btree ("created_at");
  CREATE INDEX "_boards_v_updated_at_idx" ON "_boards_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_boards_v_locales_parent_id_locale_unique" ON "_boards_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_boards_v_rels_order_idx" ON "_boards_v_rels" USING btree ("order");
  CREATE INDEX "_boards_v_rels_parent_idx" ON "_boards_v_rels" USING btree ("parent_id");
  CREATE INDEX "_boards_v_rels_path_idx" ON "_boards_v_rels" USING btree ("path");
  CREATE INDEX "_boards_v_rels_users_id_idx" ON "_boards_v_rels" USING btree ("users_id");
  CREATE INDEX "vacancies_blocks_button_order_idx" ON "vacancies_blocks_button" USING btree ("_order");
  CREATE INDEX "vacancies_blocks_button_parent_id_idx" ON "vacancies_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "vacancies_blocks_button_path_idx" ON "vacancies_blocks_button" USING btree ("_path");
  CREATE INDEX "vacancies_blocks_button_link_link_page_idx" ON "vacancies_blocks_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "vacancies_blocks_button_locales_parent_id_locale_unique" ON "vacancies_blocks_button_locales" USING btree ("_parent_id","_locale");
  CREATE UNIQUE INDEX "vacancies_slug_idx" ON "vacancies" USING btree ("slug");
  CREATE INDEX "vacancies_updated_at_idx" ON "vacancies" USING btree ("updated_at");
  CREATE INDEX "vacancies_created_at_idx" ON "vacancies" USING btree ("created_at");
  CREATE UNIQUE INDEX "vacancies_locales_parent_id_locale_unique" ON "vacancies_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "vacancies_rels_order_idx" ON "vacancies_rels" USING btree ("order");
  CREATE INDEX "vacancies_rels_parent_idx" ON "vacancies_rels" USING btree ("parent_id");
  CREATE INDEX "vacancies_rels_path_idx" ON "vacancies_rels" USING btree ("path");
  CREATE INDEX "vacancies_rels_partners_id_idx" ON "vacancies_rels" USING btree ("partners_id");
  CREATE INDEX "vacancies_rels_job_types_id_idx" ON "vacancies_rels" USING btree ("job_types_id");
  CREATE INDEX "vacancies_rels_programmes_id_idx" ON "vacancies_rels" USING btree ("programmes_id");
  CREATE INDEX "vacancies_rels_users_id_idx" ON "vacancies_rels" USING btree ("users_id");
  CREATE INDEX "_vacancies_v_blocks_button_order_idx" ON "_vacancies_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_vacancies_v_blocks_button_parent_id_idx" ON "_vacancies_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_vacancies_v_blocks_button_path_idx" ON "_vacancies_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_vacancies_v_blocks_button_link_link_page_idx" ON "_vacancies_v_blocks_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_vacancies_v_blocks_button_locales_parent_id_locale_unique" ON "_vacancies_v_blocks_button_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_vacancies_v_parent_idx" ON "_vacancies_v" USING btree ("parent_id");
  CREATE INDEX "_vacancies_v_version_version_slug_idx" ON "_vacancies_v" USING btree ("version_slug");
  CREATE INDEX "_vacancies_v_version_version_updated_at_idx" ON "_vacancies_v" USING btree ("version_updated_at");
  CREATE INDEX "_vacancies_v_version_version_created_at_idx" ON "_vacancies_v" USING btree ("version_created_at");
  CREATE INDEX "_vacancies_v_created_at_idx" ON "_vacancies_v" USING btree ("created_at");
  CREATE INDEX "_vacancies_v_updated_at_idx" ON "_vacancies_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_vacancies_v_locales_parent_id_locale_unique" ON "_vacancies_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_vacancies_v_rels_order_idx" ON "_vacancies_v_rels" USING btree ("order");
  CREATE INDEX "_vacancies_v_rels_parent_idx" ON "_vacancies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_vacancies_v_rels_path_idx" ON "_vacancies_v_rels" USING btree ("path");
  CREATE INDEX "_vacancies_v_rels_partners_id_idx" ON "_vacancies_v_rels" USING btree ("partners_id");
  CREATE INDEX "_vacancies_v_rels_job_types_id_idx" ON "_vacancies_v_rels" USING btree ("job_types_id");
  CREATE INDEX "_vacancies_v_rels_programmes_id_idx" ON "_vacancies_v_rels" USING btree ("programmes_id");
  CREATE INDEX "_vacancies_v_rels_users_id_idx" ON "_vacancies_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "news_items_slug_idx" ON "news_items" USING btree ("slug");
  CREATE INDEX "news_items_image_idx" ON "news_items" USING btree ("image_id");
  CREATE INDEX "news_items_updated_at_idx" ON "news_items" USING btree ("updated_at");
  CREATE INDEX "news_items_created_at_idx" ON "news_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_items_locales_parent_id_locale_unique" ON "news_items_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "news_items_rels_order_idx" ON "news_items_rels" USING btree ("order");
  CREATE INDEX "news_items_rels_parent_idx" ON "news_items_rels" USING btree ("parent_id");
  CREATE INDEX "news_items_rels_path_idx" ON "news_items_rels" USING btree ("path");
  CREATE INDEX "news_items_rels_users_id_idx" ON "news_items_rels" USING btree ("users_id");
  CREATE INDEX "_news_items_v_parent_idx" ON "_news_items_v" USING btree ("parent_id");
  CREATE INDEX "_news_items_v_version_version_slug_idx" ON "_news_items_v" USING btree ("version_slug");
  CREATE INDEX "_news_items_v_version_version_image_idx" ON "_news_items_v" USING btree ("version_image_id");
  CREATE INDEX "_news_items_v_version_version_updated_at_idx" ON "_news_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_items_v_version_version_created_at_idx" ON "_news_items_v" USING btree ("version_created_at");
  CREATE INDEX "_news_items_v_created_at_idx" ON "_news_items_v" USING btree ("created_at");
  CREATE INDEX "_news_items_v_updated_at_idx" ON "_news_items_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_news_items_v_locales_parent_id_locale_unique" ON "_news_items_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_news_items_v_rels_order_idx" ON "_news_items_v_rels" USING btree ("order");
  CREATE INDEX "_news_items_v_rels_parent_idx" ON "_news_items_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_items_v_rels_path_idx" ON "_news_items_v_rels" USING btree ("path");
  CREATE INDEX "_news_items_v_rels_users_id_idx" ON "_news_items_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "societies_slug_idx" ON "societies" USING btree ("slug");
  CREATE INDEX "societies_logo_idx" ON "societies" USING btree ("logo_id");
  CREATE INDEX "societies_updated_at_idx" ON "societies" USING btree ("updated_at");
  CREATE INDEX "societies_created_at_idx" ON "societies" USING btree ("created_at");
  CREATE UNIQUE INDEX "societies_locales_parent_id_locale_unique" ON "societies_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "societies_rels_order_idx" ON "societies_rels" USING btree ("order");
  CREATE INDEX "societies_rels_parent_idx" ON "societies_rels" USING btree ("parent_id");
  CREATE INDEX "societies_rels_path_idx" ON "societies_rels" USING btree ("path");
  CREATE INDEX "societies_rels_media_id_idx" ON "societies_rels" USING btree ("media_id");
  CREATE INDEX "societies_rels_users_id_idx" ON "societies_rels" USING btree ("users_id");
  CREATE INDEX "_societies_v_parent_idx" ON "_societies_v" USING btree ("parent_id");
  CREATE INDEX "_societies_v_version_version_slug_idx" ON "_societies_v" USING btree ("version_slug");
  CREATE INDEX "_societies_v_version_version_logo_idx" ON "_societies_v" USING btree ("version_logo_id");
  CREATE INDEX "_societies_v_version_version_updated_at_idx" ON "_societies_v" USING btree ("version_updated_at");
  CREATE INDEX "_societies_v_version_version_created_at_idx" ON "_societies_v" USING btree ("version_created_at");
  CREATE INDEX "_societies_v_created_at_idx" ON "_societies_v" USING btree ("created_at");
  CREATE INDEX "_societies_v_updated_at_idx" ON "_societies_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_societies_v_locales_parent_id_locale_unique" ON "_societies_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_societies_v_rels_order_idx" ON "_societies_v_rels" USING btree ("order");
  CREATE INDEX "_societies_v_rels_parent_idx" ON "_societies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_societies_v_rels_path_idx" ON "_societies_v_rels" USING btree ("path");
  CREATE INDEX "_societies_v_rels_media_id_idx" ON "_societies_v_rels" USING btree ("media_id");
  CREATE INDEX "_societies_v_rels_users_id_idx" ON "_societies_v_rels" USING btree ("users_id");
  CREATE INDEX "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  CREATE UNIQUE INDEX "programmes_locales_parent_id_locale_unique" ON "programmes_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "programmes_rels_order_idx" ON "programmes_rels" USING btree ("order");
  CREATE INDEX "programmes_rels_parent_idx" ON "programmes_rels" USING btree ("parent_id");
  CREATE INDEX "programmes_rels_path_idx" ON "programmes_rels" USING btree ("path");
  CREATE INDEX "programmes_rels_users_id_idx" ON "programmes_rels" USING btree ("users_id");
  CREATE INDEX "_programmes_v_parent_idx" ON "_programmes_v" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_version_version_updated_at_idx" ON "_programmes_v" USING btree ("version_updated_at");
  CREATE INDEX "_programmes_v_version_version_created_at_idx" ON "_programmes_v" USING btree ("version_created_at");
  CREATE INDEX "_programmes_v_created_at_idx" ON "_programmes_v" USING btree ("created_at");
  CREATE INDEX "_programmes_v_updated_at_idx" ON "_programmes_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_programmes_v_locales_parent_id_locale_unique" ON "_programmes_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_programmes_v_rels_order_idx" ON "_programmes_v_rels" USING btree ("order");
  CREATE INDEX "_programmes_v_rels_parent_idx" ON "_programmes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_rels_path_idx" ON "_programmes_v_rels" USING btree ("path");
  CREATE INDEX "_programmes_v_rels_users_id_idx" ON "_programmes_v_rels" USING btree ("users_id");
  CREATE INDEX "job_types_updated_at_idx" ON "job_types" USING btree ("updated_at");
  CREATE INDEX "job_types_created_at_idx" ON "job_types" USING btree ("created_at");
  CREATE UNIQUE INDEX "job_types_locales_parent_id_locale_unique" ON "job_types_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "job_types_rels_order_idx" ON "job_types_rels" USING btree ("order");
  CREATE INDEX "job_types_rels_parent_idx" ON "job_types_rels" USING btree ("parent_id");
  CREATE INDEX "job_types_rels_path_idx" ON "job_types_rels" USING btree ("path");
  CREATE INDEX "job_types_rels_users_id_idx" ON "job_types_rels" USING btree ("users_id");
  CREATE INDEX "_job_types_v_parent_idx" ON "_job_types_v" USING btree ("parent_id");
  CREATE INDEX "_job_types_v_version_version_updated_at_idx" ON "_job_types_v" USING btree ("version_updated_at");
  CREATE INDEX "_job_types_v_version_version_created_at_idx" ON "_job_types_v" USING btree ("version_created_at");
  CREATE INDEX "_job_types_v_created_at_idx" ON "_job_types_v" USING btree ("created_at");
  CREATE INDEX "_job_types_v_updated_at_idx" ON "_job_types_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_job_types_v_locales_parent_id_locale_unique" ON "_job_types_v_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_job_types_v_rels_order_idx" ON "_job_types_v_rels" USING btree ("order");
  CREATE INDEX "_job_types_v_rels_parent_idx" ON "_job_types_v_rels" USING btree ("parent_id");
  CREATE INDEX "_job_types_v_rels_path_idx" ON "_job_types_v_rels" USING btree ("path");
  CREATE INDEX "_job_types_v_rels_users_id_idx" ON "_job_types_v_rels" USING btree ("users_id");
  CREATE INDEX "quotes_updated_at_idx" ON "quotes" USING btree ("updated_at");
  CREATE INDEX "quotes_created_at_idx" ON "quotes" USING btree ("created_at");
  CREATE INDEX "quotes_rels_order_idx" ON "quotes_rels" USING btree ("order");
  CREATE INDEX "quotes_rels_parent_idx" ON "quotes_rels" USING btree ("parent_id");
  CREATE INDEX "quotes_rels_path_idx" ON "quotes_rels" USING btree ("path");
  CREATE INDEX "quotes_rels_users_id_idx" ON "quotes_rels" USING btree ("users_id");
  CREATE INDEX "_quotes_v_parent_idx" ON "_quotes_v" USING btree ("parent_id");
  CREATE INDEX "_quotes_v_version_version_updated_at_idx" ON "_quotes_v" USING btree ("version_updated_at");
  CREATE INDEX "_quotes_v_version_version_created_at_idx" ON "_quotes_v" USING btree ("version_created_at");
  CREATE INDEX "_quotes_v_created_at_idx" ON "_quotes_v" USING btree ("created_at");
  CREATE INDEX "_quotes_v_updated_at_idx" ON "_quotes_v" USING btree ("updated_at");
  CREATE INDEX "_quotes_v_rels_order_idx" ON "_quotes_v_rels" USING btree ("order");
  CREATE INDEX "_quotes_v_rels_parent_idx" ON "_quotes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_quotes_v_rels_path_idx" ON "_quotes_v_rels" USING btree ("path");
  CREATE INDEX "_quotes_v_rels_users_id_idx" ON "_quotes_v_rels" USING btree ("users_id");
  CREATE INDEX "board_message_updated_at_idx" ON "board_message" USING btree ("updated_at");
  CREATE INDEX "board_message_created_at_idx" ON "board_message" USING btree ("created_at");
  CREATE INDEX "board_message_rels_order_idx" ON "board_message_rels" USING btree ("order");
  CREATE INDEX "board_message_rels_parent_idx" ON "board_message_rels" USING btree ("parent_id");
  CREATE INDEX "board_message_rels_path_idx" ON "board_message_rels" USING btree ("path");
  CREATE INDEX "board_message_rels_users_id_idx" ON "board_message_rels" USING btree ("users_id");
  CREATE INDEX "_board_message_v_parent_idx" ON "_board_message_v" USING btree ("parent_id");
  CREATE INDEX "_board_message_v_version_version_updated_at_idx" ON "_board_message_v" USING btree ("version_updated_at");
  CREATE INDEX "_board_message_v_version_version_created_at_idx" ON "_board_message_v" USING btree ("version_created_at");
  CREATE INDEX "_board_message_v_created_at_idx" ON "_board_message_v" USING btree ("created_at");
  CREATE INDEX "_board_message_v_updated_at_idx" ON "_board_message_v" USING btree ("updated_at");
  CREATE INDEX "_board_message_v_rels_order_idx" ON "_board_message_v_rels" USING btree ("order");
  CREATE INDEX "_board_message_v_rels_parent_idx" ON "_board_message_v_rels" USING btree ("parent_id");
  CREATE INDEX "_board_message_v_rels_path_idx" ON "_board_message_v_rels" USING btree ("path");
  CREATE INDEX "_board_message_v_rels_users_id_idx" ON "_board_message_v_rels" USING btree ("users_id");
  CREATE INDEX "ads_poster_idx" ON "ads" USING btree ("poster_id");
  CREATE INDEX "ads_updated_at_idx" ON "ads" USING btree ("updated_at");
  CREATE INDEX "ads_created_at_idx" ON "ads" USING btree ("created_at");
  CREATE INDEX "ads_rels_order_idx" ON "ads_rels" USING btree ("order");
  CREATE INDEX "ads_rels_parent_idx" ON "ads_rels" USING btree ("parent_id");
  CREATE INDEX "ads_rels_path_idx" ON "ads_rels" USING btree ("path");
  CREATE INDEX "ads_rels_users_id_idx" ON "ads_rels" USING btree ("users_id");
  CREATE INDEX "_ads_v_parent_idx" ON "_ads_v" USING btree ("parent_id");
  CREATE INDEX "_ads_v_version_version_poster_idx" ON "_ads_v" USING btree ("version_poster_id");
  CREATE INDEX "_ads_v_version_version_updated_at_idx" ON "_ads_v" USING btree ("version_updated_at");
  CREATE INDEX "_ads_v_version_version_created_at_idx" ON "_ads_v" USING btree ("version_created_at");
  CREATE INDEX "_ads_v_created_at_idx" ON "_ads_v" USING btree ("created_at");
  CREATE INDEX "_ads_v_updated_at_idx" ON "_ads_v" USING btree ("updated_at");
  CREATE INDEX "_ads_v_rels_order_idx" ON "_ads_v_rels" USING btree ("order");
  CREATE INDEX "_ads_v_rels_parent_idx" ON "_ads_v_rels" USING btree ("parent_id");
  CREATE INDEX "_ads_v_rels_path_idx" ON "_ads_v_rels" USING btree ("path");
  CREATE INDEX "_ads_v_rels_users_id_idx" ON "_ads_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_person_id_idx" ON "payload_locked_documents_rels" USING btree ("person_id");
  CREATE INDEX "payload_locked_documents_rels_supermentor_id_idx" ON "payload_locked_documents_rels" USING btree ("supermentor_id");
  CREATE INDEX "payload_locked_documents_rels_faq_question_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_question_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_committees_id_idx" ON "payload_locked_documents_rels" USING btree ("committees_id");
  CREATE INDEX "payload_locked_documents_rels_boards_id_idx" ON "payload_locked_documents_rels" USING btree ("boards_id");
  CREATE INDEX "payload_locked_documents_rels_vacancies_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancies_id");
  CREATE INDEX "payload_locked_documents_rels_news_items_id_idx" ON "payload_locked_documents_rels" USING btree ("news_items_id");
  CREATE INDEX "payload_locked_documents_rels_societies_id_idx" ON "payload_locked_documents_rels" USING btree ("societies_id");
  CREATE INDEX "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");
  CREATE INDEX "payload_locked_documents_rels_job_types_id_idx" ON "payload_locked_documents_rels" USING btree ("job_types_id");
  CREATE INDEX "payload_locked_documents_rels_quotes_id_idx" ON "payload_locked_documents_rels" USING btree ("quotes_id");
  CREATE INDEX "payload_locked_documents_rels_board_message_id_idx" ON "payload_locked_documents_rels" USING btree ("board_message_id");
  CREATE INDEX "payload_locked_documents_rels_ads_id_idx" ON "payload_locked_documents_rels" USING btree ("ads_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_entity_slug_idx" ON "payload_llm_instructions" USING btree ("entity_slug");
  CREATE INDEX "payload_llm_instructions_updated_at_idx" ON "payload_llm_instructions" USING btree ("updated_at");
  CREATE INDEX "payload_llm_instructions_created_at_idx" ON "payload_llm_instructions" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_rels_order_idx" ON "payload_llm_instructions_rels" USING btree ("order");
  CREATE INDEX "payload_llm_instructions_rels_parent_idx" ON "payload_llm_instructions_rels" USING btree ("parent_id");
  CREATE INDEX "payload_llm_instructions_rels_path_idx" ON "payload_llm_instructions_rels" USING btree ("path");
  CREATE INDEX "payload_llm_instructions_rels_users_id_idx" ON "payload_llm_instructions_rels" USING btree ("users_id");
  CREATE INDEX "hero_rels_order_idx" ON "hero_rels" USING btree ("order");
  CREATE INDEX "hero_rels_parent_idx" ON "hero_rels" USING btree ("parent_id");
  CREATE INDEX "hero_rels_path_idx" ON "hero_rels" USING btree ("path");
  CREATE INDEX "hero_rels_media_id_idx" ON "hero_rels" USING btree ("media_id");
  CREATE INDEX "hero_rels_users_id_idx" ON "hero_rels" USING btree ("users_id");
  CREATE INDEX "_hero_v_created_at_idx" ON "_hero_v" USING btree ("created_at");
  CREATE INDEX "_hero_v_updated_at_idx" ON "_hero_v" USING btree ("updated_at");
  CREATE INDEX "_hero_v_rels_order_idx" ON "_hero_v_rels" USING btree ("order");
  CREATE INDEX "_hero_v_rels_parent_idx" ON "_hero_v_rels" USING btree ("parent_id");
  CREATE INDEX "_hero_v_rels_path_idx" ON "_hero_v_rels" USING btree ("path");
  CREATE INDEX "_hero_v_rels_media_id_idx" ON "_hero_v_rels" USING btree ("media_id");
  CREATE INDEX "_hero_v_rels_users_id_idx" ON "_hero_v_rels" USING btree ("users_id");
  CREATE INDEX "association_rels_order_idx" ON "association_rels" USING btree ("order");
  CREATE INDEX "association_rels_parent_idx" ON "association_rels" USING btree ("parent_id");
  CREATE INDEX "association_rels_path_idx" ON "association_rels" USING btree ("path");
  CREATE INDEX "association_rels_users_id_idx" ON "association_rels" USING btree ("users_id");
  CREATE INDEX "_association_v_created_at_idx" ON "_association_v" USING btree ("created_at");
  CREATE INDEX "_association_v_updated_at_idx" ON "_association_v" USING btree ("updated_at");
  CREATE INDEX "_association_v_rels_order_idx" ON "_association_v_rels" USING btree ("order");
  CREATE INDEX "_association_v_rels_parent_idx" ON "_association_v_rels" USING btree ("parent_id");
  CREATE INDEX "_association_v_rels_path_idx" ON "_association_v_rels" USING btree ("path");
  CREATE INDEX "_association_v_rels_users_id_idx" ON "_association_v_rels" USING btree ("users_id");
  CREATE INDEX "contact_rels_order_idx" ON "contact_rels" USING btree ("order");
  CREATE INDEX "contact_rels_parent_idx" ON "contact_rels" USING btree ("parent_id");
  CREATE INDEX "contact_rels_path_idx" ON "contact_rels" USING btree ("path");
  CREATE INDEX "contact_rels_person_id_idx" ON "contact_rels" USING btree ("person_id");
  CREATE INDEX "contact_rels_users_id_idx" ON "contact_rels" USING btree ("users_id");
  CREATE INDEX "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE INDEX "_contact_v_rels_order_idx" ON "_contact_v_rels" USING btree ("order");
  CREATE INDEX "_contact_v_rels_parent_idx" ON "_contact_v_rels" USING btree ("parent_id");
  CREATE INDEX "_contact_v_rels_path_idx" ON "_contact_v_rels" USING btree ("path");
  CREATE INDEX "_contact_v_rels_person_id_idx" ON "_contact_v_rels" USING btree ("person_id");
  CREATE INDEX "_contact_v_rels_users_id_idx" ON "_contact_v_rels" USING btree ("users_id");
  CREATE INDEX "signup_rels_order_idx" ON "signup_rels" USING btree ("order");
  CREATE INDEX "signup_rels_parent_idx" ON "signup_rels" USING btree ("parent_id");
  CREATE INDEX "signup_rels_path_idx" ON "signup_rels" USING btree ("path");
  CREATE INDEX "signup_rels_users_id_idx" ON "signup_rels" USING btree ("users_id");
  CREATE INDEX "_signup_v_created_at_idx" ON "_signup_v" USING btree ("created_at");
  CREATE INDEX "_signup_v_updated_at_idx" ON "_signup_v" USING btree ("updated_at");
  CREATE INDEX "_signup_v_rels_order_idx" ON "_signup_v_rels" USING btree ("order");
  CREATE INDEX "_signup_v_rels_parent_idx" ON "_signup_v_rels" USING btree ("parent_id");
  CREATE INDEX "_signup_v_rels_path_idx" ON "_signup_v_rels" USING btree ("path");
  CREATE INDEX "_signup_v_rels_users_id_idx" ON "_signup_v_rels" USING btree ("users_id");
  CREATE INDEX "theme_rels_order_idx" ON "theme_rels" USING btree ("order");
  CREATE INDEX "theme_rels_parent_idx" ON "theme_rels" USING btree ("parent_id");
  CREATE INDEX "theme_rels_path_idx" ON "theme_rels" USING btree ("path");
  CREATE INDEX "theme_rels_supermentor_id_idx" ON "theme_rels" USING btree ("supermentor_id");
  CREATE INDEX "theme_rels_users_id_idx" ON "theme_rels" USING btree ("users_id");
  CREATE INDEX "_theme_v_created_at_idx" ON "_theme_v" USING btree ("created_at");
  CREATE INDEX "_theme_v_updated_at_idx" ON "_theme_v" USING btree ("updated_at");
  CREATE INDEX "_theme_v_rels_order_idx" ON "_theme_v_rels" USING btree ("order");
  CREATE INDEX "_theme_v_rels_parent_idx" ON "_theme_v_rels" USING btree ("parent_id");
  CREATE INDEX "_theme_v_rels_path_idx" ON "_theme_v_rels" USING btree ("path");
  CREATE INDEX "_theme_v_rels_supermentor_id_idx" ON "_theme_v_rels" USING btree ("supermentor_id");
  CREATE INDEX "_theme_v_rels_users_id_idx" ON "_theme_v_rels" USING btree ("users_id");
  CREATE INDEX "faq_rels_order_idx" ON "faq_rels" USING btree ("order");
  CREATE INDEX "faq_rels_parent_idx" ON "faq_rels" USING btree ("parent_id");
  CREATE INDEX "faq_rels_path_idx" ON "faq_rels" USING btree ("path");
  CREATE INDEX "faq_rels_faq_question_id_idx" ON "faq_rels" USING btree ("faq_question_id");
  CREATE INDEX "faq_rels_users_id_idx" ON "faq_rels" USING btree ("users_id");
  CREATE INDEX "_faq_v_created_at_idx" ON "_faq_v" USING btree ("created_at");
  CREATE INDEX "_faq_v_updated_at_idx" ON "_faq_v" USING btree ("updated_at");
  CREATE INDEX "_faq_v_rels_order_idx" ON "_faq_v_rels" USING btree ("order");
  CREATE INDEX "_faq_v_rels_parent_idx" ON "_faq_v_rels" USING btree ("parent_id");
  CREATE INDEX "_faq_v_rels_path_idx" ON "_faq_v_rels" USING btree ("path");
  CREATE INDEX "_faq_v_rels_faq_question_id_idx" ON "_faq_v_rels" USING btree ("faq_question_id");
  CREATE INDEX "_faq_v_rels_users_id_idx" ON "_faq_v_rels" USING btree ("users_id");
  CREATE INDEX "small_print_rels_order_idx" ON "small_print_rels" USING btree ("order");
  CREATE INDEX "small_print_rels_parent_idx" ON "small_print_rels" USING btree ("parent_id");
  CREATE INDEX "small_print_rels_path_idx" ON "small_print_rels" USING btree ("path");
  CREATE INDEX "small_print_rels_users_id_idx" ON "small_print_rels" USING btree ("users_id");
  CREATE INDEX "_small_print_v_created_at_idx" ON "_small_print_v" USING btree ("created_at");
  CREATE INDEX "_small_print_v_updated_at_idx" ON "_small_print_v" USING btree ("updated_at");
  CREATE INDEX "_small_print_v_rels_order_idx" ON "_small_print_v_rels" USING btree ("order");
  CREATE INDEX "_small_print_v_rels_parent_idx" ON "_small_print_v_rels" USING btree ("parent_id");
  CREATE INDEX "_small_print_v_rels_path_idx" ON "_small_print_v_rels" USING btree ("path");
  CREATE INDEX "_small_print_v_rels_users_id_idx" ON "_small_print_v_rels" USING btree ("users_id");
  CREATE INDEX "information_rels_order_idx" ON "information_rels" USING btree ("order");
  CREATE INDEX "information_rels_parent_idx" ON "information_rels" USING btree ("parent_id");
  CREATE INDEX "information_rels_path_idx" ON "information_rels" USING btree ("path");
  CREATE INDEX "information_rels_media_id_idx" ON "information_rels" USING btree ("media_id");
  CREATE INDEX "information_rels_users_id_idx" ON "information_rels" USING btree ("users_id");
  CREATE INDEX "_information_v_created_at_idx" ON "_information_v" USING btree ("created_at");
  CREATE INDEX "_information_v_updated_at_idx" ON "_information_v" USING btree ("updated_at");
  CREATE INDEX "_information_v_rels_order_idx" ON "_information_v_rels" USING btree ("order");
  CREATE INDEX "_information_v_rels_parent_idx" ON "_information_v_rels" USING btree ("parent_id");
  CREATE INDEX "_information_v_rels_path_idx" ON "_information_v_rels" USING btree ("path");
  CREATE INDEX "_information_v_rels_media_id_idx" ON "_information_v_rels" USING btree ("media_id");
  CREATE INDEX "_information_v_rels_users_id_idx" ON "_information_v_rels" USING btree ("users_id");
  CREATE INDEX "navigation_blocks_nav_menu_links_order_idx" ON "navigation_blocks_nav_menu_links" USING btree ("_order");
  CREATE INDEX "navigation_blocks_nav_menu_links_parent_id_idx" ON "navigation_blocks_nav_menu_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_blocks_nav_menu_links_link_link_page_idx" ON "navigation_blocks_nav_menu_links" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "navigation_blocks_nav_menu_links_locales_parent_id_locale_un" ON "navigation_blocks_nav_menu_links_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "navigation_blocks_nav_menu_order_idx" ON "navigation_blocks_nav_menu" USING btree ("_order");
  CREATE INDEX "navigation_blocks_nav_menu_parent_id_idx" ON "navigation_blocks_nav_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_blocks_nav_menu_path_idx" ON "navigation_blocks_nav_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "navigation_blocks_nav_menu_locales_parent_id_locale_unique" ON "navigation_blocks_nav_menu_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "navigation_blocks_nav_button_order_idx" ON "navigation_blocks_nav_button" USING btree ("_order");
  CREATE INDEX "navigation_blocks_nav_button_parent_id_idx" ON "navigation_blocks_nav_button" USING btree ("_parent_id");
  CREATE INDEX "navigation_blocks_nav_button_path_idx" ON "navigation_blocks_nav_button" USING btree ("_path");
  CREATE INDEX "navigation_blocks_nav_button_link_link_page_idx" ON "navigation_blocks_nav_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "navigation_blocks_nav_button_locales_parent_id_locale_unique" ON "navigation_blocks_nav_button_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "navigation_buttons_order_idx" ON "navigation_buttons" USING btree ("_order");
  CREATE INDEX "navigation_buttons_parent_id_idx" ON "navigation_buttons" USING btree ("_parent_id");
  CREATE INDEX "navigation_buttons_link_link_page_idx" ON "navigation_buttons" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "navigation_buttons_locales_parent_id_locale_unique" ON "navigation_buttons_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "navigation_rels_order_idx" ON "navigation_rels" USING btree ("order");
  CREATE INDEX "navigation_rels_parent_idx" ON "navigation_rels" USING btree ("parent_id");
  CREATE INDEX "navigation_rels_path_idx" ON "navigation_rels" USING btree ("path");
  CREATE INDEX "navigation_rels_users_id_idx" ON "navigation_rels" USING btree ("users_id");
  CREATE INDEX "_navigation_v_blocks_nav_menu_links_order_idx" ON "_navigation_v_blocks_nav_menu_links" USING btree ("_order");
  CREATE INDEX "_navigation_v_blocks_nav_menu_links_parent_id_idx" ON "_navigation_v_blocks_nav_menu_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_blocks_nav_menu_links_link_link_page_idx" ON "_navigation_v_blocks_nav_menu_links" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_navigation_v_blocks_nav_menu_links_locales_parent_id_locale" ON "_navigation_v_blocks_nav_menu_links_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_navigation_v_blocks_nav_menu_order_idx" ON "_navigation_v_blocks_nav_menu" USING btree ("_order");
  CREATE INDEX "_navigation_v_blocks_nav_menu_parent_id_idx" ON "_navigation_v_blocks_nav_menu" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_blocks_nav_menu_path_idx" ON "_navigation_v_blocks_nav_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "_navigation_v_blocks_nav_menu_locales_parent_id_locale_uniqu" ON "_navigation_v_blocks_nav_menu_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_navigation_v_blocks_nav_button_order_idx" ON "_navigation_v_blocks_nav_button" USING btree ("_order");
  CREATE INDEX "_navigation_v_blocks_nav_button_parent_id_idx" ON "_navigation_v_blocks_nav_button" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_blocks_nav_button_path_idx" ON "_navigation_v_blocks_nav_button" USING btree ("_path");
  CREATE INDEX "_navigation_v_blocks_nav_button_link_link_page_idx" ON "_navigation_v_blocks_nav_button" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_navigation_v_blocks_nav_button_locales_parent_id_locale_uni" ON "_navigation_v_blocks_nav_button_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_navigation_v_version_buttons_order_idx" ON "_navigation_v_version_buttons" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_buttons_parent_id_idx" ON "_navigation_v_version_buttons" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_buttons_link_link_page_idx" ON "_navigation_v_version_buttons" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_navigation_v_version_buttons_locales_parent_id_locale_uniqu" ON "_navigation_v_version_buttons_locales" USING btree ("_parent_id","_locale");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_navigation_v_rels_order_idx" ON "_navigation_v_rels" USING btree ("order");
  CREATE INDEX "_navigation_v_rels_parent_idx" ON "_navigation_v_rels" USING btree ("parent_id");
  CREATE INDEX "_navigation_v_rels_path_idx" ON "_navigation_v_rels" USING btree ("path");
  CREATE INDEX "_navigation_v_rels_users_id_idx" ON "_navigation_v_rels" USING btree ("users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "_users_v_version_sessions" CASCADE;
  DROP TABLE "_users_v" CASCADE;
  DROP TABLE "_users_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "_media_v_locales" CASCADE;
  DROP TABLE "_media_v_rels" CASCADE;
  DROP TABLE "person_role" CASCADE;
  DROP TABLE "person" CASCADE;
  DROP TABLE "person_rels" CASCADE;
  DROP TABLE "_person_v_version_role" CASCADE;
  DROP TABLE "_person_v" CASCADE;
  DROP TABLE "_person_v_rels" CASCADE;
  DROP TABLE "supermentor" CASCADE;
  DROP TABLE "supermentor_rels" CASCADE;
  DROP TABLE "_supermentor_v" CASCADE;
  DROP TABLE "_supermentor_v_rels" CASCADE;
  DROP TABLE "faq_question" CASCADE;
  DROP TABLE "faq_question_rels" CASCADE;
  DROP TABLE "_faq_question_v" CASCADE;
  DROP TABLE "_faq_question_v_rels" CASCADE;
  DROP TABLE "pages_blocks_title" CASCADE;
  DROP TABLE "pages_blocks_title_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_separator" CASCADE;
  DROP TABLE "pages_blocks_committee_overview" CASCADE;
  DROP TABLE "pages_blocks_partner_overview" CASCADE;
  DROP TABLE "pages_blocks_vacancy_overview" CASCADE;
  DROP TABLE "pages_blocks_news_overview" CASCADE;
  DROP TABLE "pages_blocks_society_overview" CASCADE;
  DROP TABLE "pages_blocks_current_board" CASCADE;
  DROP TABLE "pages_blocks_old_boards" CASCADE;
  DROP TABLE "pages_blocks_activities" CASCADE;
  DROP TABLE "pages_blocks_links_page_links" CASCADE;
  DROP TABLE "pages_blocks_links_page_links_locales" CASCADE;
  DROP TABLE "pages_blocks_links_page" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline_items_locales" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_lvv_page_people" CASCADE;
  DROP TABLE "pages_blocks_lvv_page_people_locales" CASCADE;
  DROP TABLE "pages_blocks_lvv_page" CASCADE;
  DROP TABLE "pages_blocks_contact_grid_people" CASCADE;
  DROP TABLE "pages_blocks_contact_grid_people_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_grid" CASCADE;
  DROP TABLE "pages_blocks_contact_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_branding_colour" CASCADE;
  DROP TABLE "pages_blocks_branding_logos_logo_types" CASCADE;
  DROP TABLE "pages_blocks_branding_logos_logo_types_locales" CASCADE;
  DROP TABLE "pages_blocks_branding_logos" CASCADE;
  DROP TABLE "pages_blocks_branding_poster_specs" CASCADE;
  DROP TABLE "pages_blocks_branding_poster_specs_locales" CASCADE;
  DROP TABLE "pages_blocks_branding_poster" CASCADE;
  DROP TABLE "pages_blocks_partnering_reasons_reasons" CASCADE;
  DROP TABLE "pages_blocks_partnering_reasons_reasons_locales" CASCADE;
  DROP TABLE "pages_blocks_partnering_reasons" CASCADE;
  DROP TABLE "pages_blocks_collaboration_form" CASCADE;
  DROP TABLE "pages_blocks_collaboration_form_locales" CASCADE;
  DROP TABLE "pages_blocks_branding_twocol" CASCADE;
  DROP TABLE "pages_blocks_promotion_possibilities" CASCADE;
  DROP TABLE "pages_blocks_promotion_possibilities_locales" CASCADE;
  DROP TABLE "pages_blocks_promotion_sponsored_activities" CASCADE;
  DROP TABLE "pages_blocks_promotion_sponsored_activities_locales" CASCADE;
  DROP TABLE "pages_blocks_promotion" CASCADE;
  DROP TABLE "pages_blocks_promotion_locales" CASCADE;
  DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "pages_blocks_button_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_featured_partner_banner" CASCADE;
  DROP TABLE "pages_blocks_stat_item" CASCADE;
  DROP TABLE "pages_blocks_stat_item_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_section" CASCADE;
  DROP TABLE "pages_blocks_info_columns" CASCADE;
  DROP TABLE "pages_blocks_info_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_partner_carousel" CASCADE;
  DROP TABLE "pages_blocks_news_carousel" CASCADE;
  DROP TABLE "pages_blocks_activities_carousel" CASCADE;
  DROP TABLE "pages_blocks_vcp_page_people" CASCADE;
  DROP TABLE "pages_blocks_vcp_page" CASCADE;
  DROP TABLE "pages_blocks_vcp_page_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_title" CASCADE;
  DROP TABLE "_pages_v_blocks_title_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_separator" CASCADE;
  DROP TABLE "_pages_v_blocks_committee_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_vacancy_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_news_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_society_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_current_board" CASCADE;
  DROP TABLE "_pages_v_blocks_old_boards" CASCADE;
  DROP TABLE "_pages_v_blocks_activities" CASCADE;
  DROP TABLE "_pages_v_blocks_links_page_links" CASCADE;
  DROP TABLE "_pages_v_blocks_links_page_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_links_page" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_lvv_page_people" CASCADE;
  DROP TABLE "_pages_v_blocks_lvv_page_people_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lvv_page" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_grid_people" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_grid_people_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_colour" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_logos_logo_types" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_logos_logo_types_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_poster_specs" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_poster_specs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_poster" CASCADE;
  DROP TABLE "_pages_v_blocks_partnering_reasons_reasons" CASCADE;
  DROP TABLE "_pages_v_blocks_partnering_reasons_reasons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_partnering_reasons" CASCADE;
  DROP TABLE "_pages_v_blocks_collaboration_form" CASCADE;
  DROP TABLE "_pages_v_blocks_collaboration_form_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_branding_twocol" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion_possibilities" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion_possibilities_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion_sponsored_activities" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion_sponsored_activities_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_button" CASCADE;
  DROP TABLE "_pages_v_blocks_button_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_partner_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_item" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_item_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_section" CASCADE;
  DROP TABLE "_pages_v_blocks_info_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_info_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_news_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_activities_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_vcp_page_people" CASCADE;
  DROP TABLE "_pages_v_blocks_vcp_page" CASCADE;
  DROP TABLE "_pages_v_blocks_vcp_page_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "partners_blocks_button" CASCADE;
  DROP TABLE "partners_blocks_button_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "partners_rels" CASCADE;
  DROP TABLE "_partners_v_blocks_button" CASCADE;
  DROP TABLE "_partners_v_blocks_button_locales" CASCADE;
  DROP TABLE "_partners_v" CASCADE;
  DROP TABLE "_partners_v_locales" CASCADE;
  DROP TABLE "_partners_v_rels" CASCADE;
  DROP TABLE "committees" CASCADE;
  DROP TABLE "committees_locales" CASCADE;
  DROP TABLE "committees_rels" CASCADE;
  DROP TABLE "_committees_v" CASCADE;
  DROP TABLE "_committees_v_locales" CASCADE;
  DROP TABLE "_committees_v_rels" CASCADE;
  DROP TABLE "boards_members" CASCADE;
  DROP TABLE "boards_members_locales" CASCADE;
  DROP TABLE "boards" CASCADE;
  DROP TABLE "boards_locales" CASCADE;
  DROP TABLE "boards_rels" CASCADE;
  DROP TABLE "_boards_v_version_members" CASCADE;
  DROP TABLE "_boards_v_version_members_locales" CASCADE;
  DROP TABLE "_boards_v" CASCADE;
  DROP TABLE "_boards_v_locales" CASCADE;
  DROP TABLE "_boards_v_rels" CASCADE;
  DROP TABLE "vacancies_blocks_button" CASCADE;
  DROP TABLE "vacancies_blocks_button_locales" CASCADE;
  DROP TABLE "vacancies" CASCADE;
  DROP TABLE "vacancies_locales" CASCADE;
  DROP TABLE "vacancies_rels" CASCADE;
  DROP TABLE "_vacancies_v_blocks_button" CASCADE;
  DROP TABLE "_vacancies_v_blocks_button_locales" CASCADE;
  DROP TABLE "_vacancies_v" CASCADE;
  DROP TABLE "_vacancies_v_locales" CASCADE;
  DROP TABLE "_vacancies_v_rels" CASCADE;
  DROP TABLE "news_items" CASCADE;
  DROP TABLE "news_items_locales" CASCADE;
  DROP TABLE "news_items_rels" CASCADE;
  DROP TABLE "_news_items_v" CASCADE;
  DROP TABLE "_news_items_v_locales" CASCADE;
  DROP TABLE "_news_items_v_rels" CASCADE;
  DROP TABLE "societies" CASCADE;
  DROP TABLE "societies_locales" CASCADE;
  DROP TABLE "societies_rels" CASCADE;
  DROP TABLE "_societies_v" CASCADE;
  DROP TABLE "_societies_v_locales" CASCADE;
  DROP TABLE "_societies_v_rels" CASCADE;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "programmes_locales" CASCADE;
  DROP TABLE "programmes_rels" CASCADE;
  DROP TABLE "_programmes_v" CASCADE;
  DROP TABLE "_programmes_v_locales" CASCADE;
  DROP TABLE "_programmes_v_rels" CASCADE;
  DROP TABLE "job_types" CASCADE;
  DROP TABLE "job_types_locales" CASCADE;
  DROP TABLE "job_types_rels" CASCADE;
  DROP TABLE "_job_types_v" CASCADE;
  DROP TABLE "_job_types_v_locales" CASCADE;
  DROP TABLE "_job_types_v_rels" CASCADE;
  DROP TABLE "quotes" CASCADE;
  DROP TABLE "quotes_rels" CASCADE;
  DROP TABLE "_quotes_v" CASCADE;
  DROP TABLE "_quotes_v_rels" CASCADE;
  DROP TABLE "board_message" CASCADE;
  DROP TABLE "board_message_rels" CASCADE;
  DROP TABLE "_board_message_v" CASCADE;
  DROP TABLE "_board_message_v_rels" CASCADE;
  DROP TABLE "ads" CASCADE;
  DROP TABLE "ads_rels" CASCADE;
  DROP TABLE "_ads_v" CASCADE;
  DROP TABLE "_ads_v_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_llm_instructions" CASCADE;
  DROP TABLE "payload_llm_instructions_rels" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "hero_rels" CASCADE;
  DROP TABLE "_hero_v" CASCADE;
  DROP TABLE "_hero_v_rels" CASCADE;
  DROP TABLE "association" CASCADE;
  DROP TABLE "association_rels" CASCADE;
  DROP TABLE "_association_v" CASCADE;
  DROP TABLE "_association_v_rels" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_rels" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "_contact_v_rels" CASCADE;
  DROP TABLE "signup" CASCADE;
  DROP TABLE "signup_rels" CASCADE;
  DROP TABLE "_signup_v" CASCADE;
  DROP TABLE "_signup_v_rels" CASCADE;
  DROP TABLE "theme" CASCADE;
  DROP TABLE "theme_rels" CASCADE;
  DROP TABLE "_theme_v" CASCADE;
  DROP TABLE "_theme_v_rels" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "faq_rels" CASCADE;
  DROP TABLE "_faq_v" CASCADE;
  DROP TABLE "_faq_v_rels" CASCADE;
  DROP TABLE "small_print" CASCADE;
  DROP TABLE "small_print_rels" CASCADE;
  DROP TABLE "_small_print_v" CASCADE;
  DROP TABLE "_small_print_v_rels" CASCADE;
  DROP TABLE "information" CASCADE;
  DROP TABLE "information_rels" CASCADE;
  DROP TABLE "_information_v" CASCADE;
  DROP TABLE "_information_v_rels" CASCADE;
  DROP TABLE "navigation_blocks_nav_menu_links" CASCADE;
  DROP TABLE "navigation_blocks_nav_menu_links_locales" CASCADE;
  DROP TABLE "navigation_blocks_nav_menu" CASCADE;
  DROP TABLE "navigation_blocks_nav_menu_locales" CASCADE;
  DROP TABLE "navigation_blocks_nav_button" CASCADE;
  DROP TABLE "navigation_blocks_nav_button_locales" CASCADE;
  DROP TABLE "navigation_buttons" CASCADE;
  DROP TABLE "navigation_buttons_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_rels" CASCADE;
  DROP TABLE "_navigation_v_blocks_nav_menu_links" CASCADE;
  DROP TABLE "_navigation_v_blocks_nav_menu_links_locales" CASCADE;
  DROP TABLE "_navigation_v_blocks_nav_menu" CASCADE;
  DROP TABLE "_navigation_v_blocks_nav_menu_locales" CASCADE;
  DROP TABLE "_navigation_v_blocks_nav_button" CASCADE;
  DROP TABLE "_navigation_v_blocks_nav_button_locales" CASCADE;
  DROP TABLE "_navigation_v_version_buttons" CASCADE;
  DROP TABLE "_navigation_v_version_buttons_locales" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "_navigation_v_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_permissions";
  DROP TYPE "public"."enum__users_v_version_permissions";
  DROP TYPE "public"."enum_person_role";
  DROP TYPE "public"."enum__person_v_version_role";
  DROP TYPE "public"."enum_pages_blocks_title_level";
  DROP TYPE "public"."enum_pages_blocks_rich_text_type";
  DROP TYPE "public"."enum_pages_blocks_committee_overview_type";
  DROP TYPE "public"."enum_pages_blocks_links_page_links_url_type";
  DROP TYPE "public"."enum_pages_blocks_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_icon_location";
  DROP TYPE "public"."enum_pages_blocks_featured_partner_banner_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_title_level";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_type";
  DROP TYPE "public"."enum__pages_v_blocks_committee_overview_type";
  DROP TYPE "public"."enum__pages_v_blocks_links_page_links_url_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_icon_location";
  DROP TYPE "public"."enum__pages_v_blocks_featured_partner_banner_link_type";
  DROP TYPE "public"."enum_partners_blocks_button_link_type";
  DROP TYPE "public"."enum_partners_blocks_button_icon_location";
  DROP TYPE "public"."enum__partners_v_blocks_button_link_type";
  DROP TYPE "public"."enum__partners_v_blocks_button_icon_location";
  DROP TYPE "public"."enum_committees_type";
  DROP TYPE "public"."enum__committees_v_version_type";
  DROP TYPE "public"."enum_boards_members_linkedin_url_type";
  DROP TYPE "public"."enum__boards_v_version_members_linkedin_url_type";
  DROP TYPE "public"."enum_vacancies_blocks_button_link_type";
  DROP TYPE "public"."enum_vacancies_blocks_button_icon_location";
  DROP TYPE "public"."enum__vacancies_v_blocks_button_link_type";
  DROP TYPE "public"."enum__vacancies_v_blocks_button_icon_location";
  DROP TYPE "public"."enum_programmes_type";
  DROP TYPE "public"."enum__programmes_v_version_type";
  DROP TYPE "public"."enum_payload_llm_instructions_entity_type";
  DROP TYPE "public"."enum_navigation_blocks_nav_menu_links_link_type";
  DROP TYPE "public"."enum_navigation_blocks_nav_button_link_type";
  DROP TYPE "public"."enum_navigation_buttons_link_type";
  DROP TYPE "public"."enum__navigation_v_blocks_nav_menu_links_link_type";
  DROP TYPE "public"."enum__navigation_v_blocks_nav_button_link_type";
  DROP TYPE "public"."enum__navigation_v_version_buttons_link_type";`)
}
