export const skills = [
	{ id: "typescript", name: "TypeScript" },
	{ id: "react", name: "React" },
	{ id: "node-js", name: "Node.js" },
	{ id: "express-js", name: "Express" },
	{ id: "postgresql", name: "PostgreSQL" },
	{ id: "better-auth", name: "Better Auth" },
	{ id: "convex", name: "Convex" },
	{ id: "sass", name: "Sass" },
	{ id: "php", name: "PHP" },
	{ id: "wordpress", name: "WordPress" },
] as const;

export type Project = {
	name: string;
	description: string;
	techstack: readonly string[];
	github?: string;
	live?: string;
	images?: readonly string[];
};

export const projects: readonly Project[] = [
	{
		name: "Resting",
		description:
			"A REST API built with vanilla PHP to deepen my understanding of REST principles, HTTP methods, and API design.",
		techstack: ["PHP", "MySQL", "Docker"],
		github: "https://github.com/mkelvers/resting",
		live: "https://resting-api.mkelvers.tech/",
	},
] as const;
