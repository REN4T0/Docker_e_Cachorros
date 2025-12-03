--
-- PostgreSQL database dump
--

\restrict EBtHuCLBbssT8AcDVaYSVgkyuJR4ORsGVxdE6ol3C6B9gP9jhJKUpiazHDr0g9q

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dogs (
    id integer NOT NULL,
    breed character varying(50),
    surname character varying(50),
    gender character varying(1),
    CONSTRAINT chk_gender CHECK (((gender)::text = ANY ((ARRAY['M'::character varying, 'F'::character varying])::text[])))
);


ALTER TABLE public.dogs OWNER TO postgres;

--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dogs_id_seq OWNER TO postgres;

--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dogs_id_seq OWNED BY public.dogs.id;


--
-- Name: dogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dogs ALTER COLUMN id SET DEFAULT nextval('public.dogs_id_seq'::regclass);


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dogs (id, breed, surname, gender) FROM stdin;
1	Golden	Narciso	M
2	teste	teste	M
3	Bulldog	Zeus	M
\.


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dogs_id_seq', 3, true);


--
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict EBtHuCLBbssT8AcDVaYSVgkyuJR4ORsGVxdE6ol3C6B9gP9jhJKUpiazHDr0g9q

