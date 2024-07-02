const generateMDXWithFrontmatter = async (frontmatter: Record<string, any>, content: string) => {
	return `---
${Object.entries(frontmatter).map(([key, value]) => `${key}: "${value}"`).join('\n')}
---
${content}`;
}

export { generateMDXWithFrontmatter };
