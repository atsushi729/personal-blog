interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Personal Blog",
    description:
      "This website! A minimalist personal blog built with Next.js and Tailwind CSS. Focused on simplicity and readability.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/username/blog",
  },
  {
    title: "Project Alpha",
    description:
      "A full-stack application that solves an interesting problem. Built with modern technologies and best practices.",
    tech: ["React", "Node.js", "PostgreSQL"],
    link: "https://project-alpha.example.com",
    github: "https://github.com/username/project-alpha",
  },
  {
    title: "CLI Tool",
    description:
      "A command-line tool that automates repetitive tasks and improves developer productivity.",
    tech: ["Rust", "CLI"],
    github: "https://github.com/username/cli-tool",
  },
];

export default function Projects() {
  return (
    <div className="font-serif">
      <h1 className="text-3xl font-normal text-neutral-800 mb-6">
        Projects
      </h1>

      <p className="text-neutral-800 mb-12">
        A selection of projects I&apos;ve worked on. Some are experiments, others are
        tools I use regularly.
      </p>

      <div className="space-y-10">
        {projects.map((project) => (
          <article key={project.title} className="group">
            <h2 className="text-xl font-normal text-neutral-800">
              {project.title}
            </h2>
            <p className="text-neutral-600 mt-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-sans px-2 py-1 bg-neutral-100 text-neutral-600 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-sans text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  View project &rarr;
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-sans text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  GitHub &rarr;
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
