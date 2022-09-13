--Criação da tabela mensagem
CREATE TABLE IF NOT EXISTS public.message
(
    id uuid NOT NULL,
    "from" character varying(50) COLLATE pg_catalog."default",
    timestamps timestamp(6) with time zone,
    "to" character varying(50) COLLATE pg_catalog."default",
    msg character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT message_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.message
    OWNER to postgres;

----------------------------------------------------------------------------------
--Criação da tabela usuário 
CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    username character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    "avatarSet" boolean,
    "avatarImage" character varying(10085761) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;