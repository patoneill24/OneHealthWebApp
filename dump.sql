--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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
-- Name: redeemed_prizes; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.redeemed_prizes (
    user_id integer NOT NULL,
    reward_id integer NOT NULL,
    redeem_date timestamp without time zone NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.redeemed_prizes OWNER TO onehealth;

--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.redeemed_prizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.redeemed_prizes_id_seq OWNER TO onehealth;

--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.redeemed_prizes_id_seq OWNED BY public.redeemed_prizes.id;


--
-- Name: rewards; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.rewards (
    id integer NOT NULL,
    name character varying(255),
    points integer
);


ALTER TABLE public.rewards OWNER TO onehealth;

--
-- Name: rewards_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rewards_id_seq OWNER TO onehealth;

--
-- Name: rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.rewards_id_seq OWNED BY public.rewards.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    location character varying(255),
    points integer
);


ALTER TABLE public.users OWNER TO onehealth;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO onehealth;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: redeemed_prizes id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes ALTER COLUMN id SET DEFAULT nextval('public.redeemed_prizes_id_seq'::regclass);


--
-- Name: rewards id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.rewards ALTER COLUMN id SET DEFAULT nextval('public.rewards_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: redeemed_prizes; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.redeemed_prizes (user_id, reward_id, redeem_date, id) FROM stdin;
2	1	2025-01-17 00:57:42.952817	1
2	2	2025-01-17 00:57:42.952817	2
3	2	2025-01-17 15:33:57.389544	3
5	1	2025-01-17 15:48:48.88569	4
5	2	2025-01-17 15:48:52.967272	5
8	1	2025-01-17 15:49:18.280437	6
2	2	2025-01-17 16:00:17.199322	7
2	1	2025-01-17 16:00:31.237877	8
2	2	2025-01-17 16:13:24.588076	9
2	2	2025-01-17 16:46:02.302081	10
2	1	2025-01-17 16:49:34.000432	11
8	1	2025-01-17 10:10:08.144254	12
26	1	2025-01-17 10:11:59.751337	13
2	2	2025-01-17 10:16:03.563057	14
2	1	2025-01-20 14:15:32.888428	15
8	2	2025-01-20 17:35:25.794906	16
4	1	2025-01-21 15:42:16.594656	17
28	1	2025-01-21 16:27:01.436059	18
28	2	2025-01-21 21:30:53.120327	19
29	1	2025-01-22 10:55:52.818188	20
29	2	2025-01-22 10:56:07.282778	21
2	1	2025-01-22 11:01:24.445546	22
2	1	2025-01-22 11:01:25.440607	23
2	2	2025-01-22 11:01:54.83321	24
2	1	2025-01-22 11:02:14.205877	25
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.rewards (id, name, points) FROM stdin;
1	Target Gift Card	20
2	Amazon Gift Card	30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.users (id, name, location, points) FROM stdin;
8	Billy	Carmel	30
4	Alex	Detroit	70
28	Larry	Georgia	50
27	Richard	Georgia	40
29	Charlie	Minnesota	30
5	Fox Pest 	New Hampshire	30
2	Lucy	Paris	0
3	charles	Boston	35
6	Rick	Henderson	25
7	Josh	Jackson Hole	30
24	Marsha	Washington	70
26	Frank	Atlanta	15
\.


--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.redeemed_prizes_id_seq', 25, true);


--
-- Name: rewards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.rewards_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.users_id_seq', 29, true);


--
-- Name: redeemed_prizes redeemed_prizes_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes
    ADD CONSTRAINT redeemed_prizes_pkey PRIMARY KEY (id);


--
-- Name: rewards rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: redeemed_prizes redeemed_prizes_reward_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes
    ADD CONSTRAINT redeemed_prizes_reward_id_fkey FOREIGN KEY (reward_id) REFERENCES public.rewards(id);


--
-- Name: redeemed_prizes redeemed_prizes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes
    ADD CONSTRAINT redeemed_prizes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

