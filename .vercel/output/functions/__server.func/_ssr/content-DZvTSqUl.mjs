import { Bt as string, It as number, Lt as object, Mt as boolean, Vt as tuple, jt as array, kt as _enum, zt as record } from "../_libs/@better-auth/core+[...].mjs";
import { n as number$1 } from "../_libs/zod.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as adminMiddleware } from "./admin-middleware-DdzUoy8A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-DZvTSqUl.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var projectSchema = object({
	id: string().min(1),
	title: string().min(1),
	category: string().min(1),
	description: string().default(""),
	longDescription: string().default(""),
	problem: string().default(""),
	approach: string().default(""),
	architecture: string().default(""),
	results: string().default(""),
	lessons: string().default(""),
	technologies: array(string()).default([]),
	year: number$1().int(),
	status: string().default("Active"),
	github: string().optional().default(""),
	demo: string().optional().default(""),
	country: string().default("Remote"),
	countryId: string().default("remote"),
	countryLngLat: tuple([number(), number()]).optional(),
	visual: string().default("grid"),
	featured: boolean().default(false),
	related: array(string()).default([]),
	metrics: record(string(), number()).default({}),
	is_published: boolean().default(true)
});
var blogSchema = object({
	slug: string().min(1),
	title: string().min(1),
	date: string().min(1),
	excerpt: string().default(""),
	tags: array(string()).default([]),
	body: array(string()).default([]),
	figures: array(object({
		id: string(),
		kind: _enum([
			"line",
			"pipeline",
			"bars"
		]),
		title: string(),
		caption: string(),
		series: array(object({
			label: string(),
			points: array(tuple([number(), number()]))
		})).optional(),
		stages: array(string()).optional(),
		bars: array(object({
			label: string(),
			value: number()
		})).optional()
	})).optional(),
	is_published: boolean().default(true)
});
var siteSettingsSchema = object({
	name: string().min(1),
	title: string().default(""),
	description: string().default(""),
	tagline: string().default(""),
	bio: string().default(""),
	shortBio: string().default(""),
	footer: string().default(""),
	email: string().default(""),
	formspreeId: string().default(""),
	social: object({
		github: string().default(""),
		linkedin: string().default(""),
		instagram: string().default(""),
		youtube: string().default(""),
		x: string().default("")
	}),
	home: object({
		heroEyebrow: string().default(""),
		heroHeadline: string().default(""),
		heroCtaPrimaryLabel: string().default(""),
		heroCtaPrimaryHref: string().default(""),
		heroCtaSecondaryLabel: string().default(""),
		heroCtaSecondaryHref: string().default(""),
		availability: string().default(""),
		availabilityDomains: string().default(""),
		aboutStatement: string().default(""),
		aboutBody: string().default(""),
		ctaEyebrow: string().default(""),
		ctaTitle: string().default(""),
		ctaBody: string().default(""),
		ctaPrimaryLabel: string().default(""),
		ctaPrimaryHref: string().default(""),
		ctaSecondaryLabel: string().default(""),
		ctaSecondaryHref: string().default(""),
		skillsTitle: string().default(""),
		skillsSubtitle: string().default(""),
		contactTitle: string().default(""),
		contactSubtitle: string().default(""),
		navCtaLabel: string().default(""),
		navCtaHref: string().default(""),
		projectsTitle: string().default(""),
		projectsSubtitle: string().default("")
	}).default({
		heroEyebrow: "",
		heroHeadline: "",
		heroCtaPrimaryLabel: "",
		heroCtaPrimaryHref: "",
		heroCtaSecondaryLabel: "",
		heroCtaSecondaryHref: "",
		availability: "",
		availabilityDomains: "",
		aboutStatement: "",
		aboutBody: "",
		ctaEyebrow: "",
		ctaTitle: "",
		ctaBody: "",
		ctaPrimaryLabel: "",
		ctaPrimaryHref: "",
		ctaSecondaryLabel: "",
		ctaSecondaryHref: "",
		skillsTitle: "",
		skillsSubtitle: "",
		contactTitle: "",
		contactSubtitle: "",
		navCtaLabel: "",
		navCtaHref: "",
		projectsTitle: "",
		projectsSubtitle: ""
	})
});
var contactSchema = object({
	name: string().min(2).max(120),
	email: string().email().max(200),
	subject: string().max(200).optional().default(""),
	message: string().min(12).max(4e3),
	idempotencyKey: string().max(120).optional()
});
var lensSchema = object({
	id: string().min(1),
	label: string().min(1),
	blurb: string().default(""),
	focus: string().default(""),
	projectIds: array(string()).default([]),
	skillsEmphasis: array(string()).default([]),
	headline: string().default("")
});
/** Bump version path: invalidate caches + emit outbox event. */
var getPublicContent = createServerFn({ method: "GET" }).handler(createSsrRpc("df2ac8c14520276e433ed71cff7abbd4caeb79b783be40a399e55e2c14970fa4"));
var listPublicProjects = createServerFn({ method: "GET" }).handler(createSsrRpc("ec4f845f2f9856bd74947e920bcbe0c89e18ee768994adf24d41853291112697"));
var listPublicPosts = createServerFn({ method: "GET" }).handler(createSsrRpc("e170c38dcd5ee82280d2832a66afa94eacf5b2d60a86c4651ab5693ec4cfb0b4"));
var getPublicSiteSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("31de50ada3b8e44ff79d78c85a4c2ad19667d99d86db09b0f4037f7220c67182"));
/** Cheap content version token for client SWR refresh. */
var getPublicContentVersion = createServerFn({ method: "GET" }).handler(createSsrRpc("570b3656cdf3d9d3488651f585a7b38587c9f8205f6d8a4faa4c3abbd2c309f4"));
var submitContactMessage = createServerFn({ method: "POST" }).validator((input) => contactSchema.parse(input)).handler(createSsrRpc("70cdb851acc9a3d1d73659e8301438554d4e53ec290216f59a5e0ed333966f94"));
var adminCheckAccess = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("27d034f3e52add01f74eeae93382a62eeaf4aa02f723ebbaa65ee37e7d3eca46"));
var adminListProjects = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("82de4227d56a5f65424873e2995a3531de210387d22578f09866747ca3dbef9b"));
var adminListPosts = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("53bd0ff6b42e8d90d96d32409e9765fc92392614e68c63da48910c8b5fc98c3e"));
var adminGetSiteSettings = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("8cece2d2a5b546ca3b0c011a04e3e0601179de600dae7d99219a6c1a7c812e64"));
var adminListMessages = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("881ada45d3dc1a33678e08acb9d453f3177da790ffd804501e06423811048a53"));
var adminListAudit = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("5ac852dc47a98edfc955b5feaa5a58af9542c7d178329cdb02a25405d0ceb515"));
createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("882a861ff311dbeab57f51bebb332f067b62bd96b828a75cbfdc730c0eac32d8"));
var adminSystemStatus = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("fd053b019ffc191986a4a4c59aa18884d38150f5a5906adab845b38547c8e084"));
var adminDashboardStats = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(createSsrRpc("8e11cbc6cd24cf484c4488bcbde988213cd1761e32b08f2ca547820e217291ab"));
var adminUpsertProject = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => projectSchema.parse(input)).handler(createSsrRpc("b1bdaaa597a99b3806ab648127bd06c3fb79d9942590f6e4b7448f18c6ced086"));
var adminDeleteProject = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: string().min(1) }).parse(input)).handler(createSsrRpc("6bd021dedd7c4a64afea056d6b8bbf886cde4ab9c103d910c1c69a53cbbf7170"));
var adminUpsertPost = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => blogSchema.parse(input)).handler(createSsrRpc("fdec85d65cab7969d5ab8e4995153000ece1ccd5fdefb5c4254f621d928af775"));
var adminDeletePost = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ slug: string().min(1) }).parse(input)).handler(createSsrRpc("9e5cd65c218e67da597dd734c8f0aa41fee9a217294d6d7d7be1111a2048e2aa"));
var adminSaveSiteSettings = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => siteSettingsSchema.parse(input)).handler(createSsrRpc("408adc3659e506124f6654aba4914d070bae4b6b60f339ab9cc605b1b07ef615"));
var adminMarkMessageRead = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: number().int() }).parse(input)).handler(createSsrRpc("bd26d7ac2eab0c7113759ea185d7bf6e9f913be615f0d869967edd68cac952c5"));
var adminDeleteMessage = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: number().int() }).parse(input)).handler(createSsrRpc("c957fb0fa0768ed10ba369cb6cf024b0db78c7e94d991ace2c413d4020cf302f"));
var adminSaveLens = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => lensSchema.parse(input)).handler(createSsrRpc("d192f7948c538933f16a65dfcb212f52405b4374fdad86d4fb4d459503a8bbda"));
var adminResetLens = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: string().min(1) }).parse(input)).handler(createSsrRpc("92d97f230b510ef312bae1124564e2aca40773358905aac56bb015b8a2538fd5"));
//#endregion
export { submitContactMessage as C, listPublicProjects as S, adminUpsertProject as _, adminDeleteProject as a, getPublicSiteSettings as b, adminListMessages as c, adminMarkMessageRead as d, adminResetLens as f, adminUpsertPost as g, adminSystemStatus as h, adminDeletePost as i, adminListPosts as l, adminSaveSiteSettings as m, adminDashboardStats as n, adminGetSiteSettings as o, adminSaveLens as p, adminDeleteMessage as r, adminListAudit as s, adminCheckAccess as t, adminListProjects as u, getPublicContent as v, listPublicPosts as x, getPublicContentVersion as y };
