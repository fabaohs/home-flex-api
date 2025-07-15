CREATE TABLE IF NOT EXISTS "users" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"enterprise_id" integer NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
