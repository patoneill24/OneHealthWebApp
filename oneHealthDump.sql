--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Homebrew)

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

--
-- Name: status_enum; Type: TYPE; Schema: public; Owner: onehealth
--

CREATE TYPE public.status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.status_enum OWNER TO onehealth;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: redeemed_prizes; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.redeemed_prizes (
    user_id integer NOT NULL,
    reward_id integer NOT NULL,
    redeem_date timestamp without time zone NOT NULL,
    id integer NOT NULL,
    price_at_purchase integer
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
    points integer,
    status public.status_enum DEFAULT 'active'::public.status_enum
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

COPY public.redeemed_prizes (user_id, reward_id, redeem_date, id, price_at_purchase) FROM stdin;
2	1	2025-01-17 00:57:42.952817	1	20
5	1	2025-01-17 15:48:48.88569	4	20
8	1	2025-01-17 15:49:18.280437	6	20
2	1	2025-01-17 16:00:31.237877	8	20
2	1	2025-01-17 16:49:34.000432	11	20
8	1	2025-01-17 10:10:08.144254	12	20
26	1	2025-01-17 10:11:59.751337	13	20
2	1	2025-01-20 14:15:32.888428	15	20
4	1	2025-01-21 15:42:16.594656	17	20
28	1	2025-01-21 16:27:01.436059	18	20
29	1	2025-01-22 10:55:52.818188	20	20
2	1	2025-01-22 11:01:24.445546	22	20
2	1	2025-01-22 11:01:25.440607	23	20
2	1	2025-01-22 11:02:14.205877	25	20
2	1	2025-01-25 12:55:04.549338	30	20
2	1	2025-01-28 16:44:39.72405	33	20
2	1	2025-01-28 17:12:58.9982	34	20
39	1	2025-01-28 20:25:56.417434	37	20
38	1	2025-01-28 20:26:20.967318	38	20
5	1	2025-01-28 20:55:39.507637	39	20
3	1	2025-01-28 21:00:17.089591	40	20
4	1	2025-01-28 21:02:07.243502	41	20
40	1	2025-01-29 20:14:07.457853	45	20
6	1	2025-01-29 20:44:16.052028	49	20
2	2	2025-01-17 00:57:42.952817	2	30
3	2	2025-01-17 15:33:57.389544	3	30
5	2	2025-01-17 15:48:52.967272	5	30
2	2	2025-01-17 16:00:17.199322	7	30
2	2	2025-01-17 16:13:24.588076	9	30
2	2	2025-01-17 16:46:02.302081	10	30
2	2	2025-01-17 10:16:03.563057	14	30
8	2	2025-01-20 17:35:25.794906	16	30
28	2	2025-01-21 21:30:53.120327	19	30
29	2	2025-01-22 10:56:07.282778	21	30
2	2	2025-01-22 11:01:54.83321	24	30
2	2	2025-01-22 13:57:17.35884	26	30
29	2	2025-01-23 19:43:09.541298	27	30
2	2	2025-01-23 21:31:59.422708	28	30
3	2	2025-01-23 21:49:43.957184	29	30
2	2	2025-01-25 14:16:28.640997	31	30
2	2	2025-01-25 17:27:44.053137	32	30
2	2	2025-01-28 17:13:09.265317	35	30
2	2	2025-01-28 20:13:00.794922	36	30
40	2	2025-01-29 20:06:05.859747	43	30
40	2	2025-01-29 20:41:16.150736	48	30
6	2	2025-01-29 20:44:28.918642	50	30
40	3	2025-01-29 19:17:57.119956	42	100
40	3	2025-01-29 20:07:20.21409	44	100
40	3	2025-01-29 20:40:49.06299	46	100
40	3	2025-01-29 20:40:51.62659	47	100
3	5	2025-01-30 18:24:36.409831	53	10
7	5	2025-01-30 18:44:51.614599	54	10
7	7	2025-01-30 18:45:00.757298	55	15
2	7	2025-01-30 20:37:41.935069	56	15
2	7	2025-01-30 20:37:44.318209	57	15
2	7	2025-01-30 20:37:54.389118	58	15
2	7	2025-01-30 20:37:55.115387	59	15
2	1	2025-01-30 20:38:18.95047	60	20
2	7	2025-01-30 20:38:38.338354	61	15
2	7	2025-01-30 20:39:34.369614	62	15
2	1	2025-01-30 20:39:51.892923	63	20
2	7	2025-01-30 20:40:07.982798	64	15
2	7	2025-01-30 20:40:09.297139	65	15
2	7	2025-01-30 20:40:10.233687	66	15
2	7	2025-01-30 20:40:41.48839	67	15
2	7	2025-01-30 20:40:42.615245	68	15
4	7	2025-01-30 20:40:59.702457	69	15
39	7	2025-01-30 20:43:18.704737	70	15
39	7	2025-01-30 20:43:19.366836	71	15
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.rewards (id, name, points, status) FROM stdin;
1	Target Gift Card	20	active
7	Key Chain	15	active
2	Amazon Gift Card	30	inactive
5	Candy Bar	10	inactive
3	Free Coffee	100	active
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.users (id, name, location, points) FROM stdin;
8	Billy	Carmel	30
34	Elton	UK	25
35	Scott	Mesa	100
36	Gregorio	Kansas	20
28	Larry	Georgia	50
37	Andrue	Pocatello	5
27	Richard	Georgia	40
3	charles	Boston	20
7	Josh	Jackson Hole	15
38	Kyle	Rexburg	5
5	Fox Pest 	New Hampshire	10
29	Charlie	Minnesota	30
24	Marsha	Washington	70
26	Frank	Atlanta	15
30	Scott	Virgina	10
31	Bob 	Kentucky	5
32	Gary	Kimberly	15
33	Terry	San Francisco	30
2	Lucy	Wisconsin	55
40	Jerimiah	New York	20
4	Alex	Detroit	20
39	Steve	Australia	50
6	Rick	Henderson	45
\.


--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.redeemed_prizes_id_seq', 71, true);


--
-- Name: rewards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.rewards_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.users_id_seq', 40, true);


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

