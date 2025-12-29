interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio website showcasing my work and experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://atsushi-hatakeyama.vercel.app/",
  },
  {
    title: "Diff Check AI",
    description:
      "An AI-powered tool for checking and analyzing code differences.",
    tech: ["Next.js", "AI"],
    link: "https://diff-check-ai.vercel.app/",
  },
  {
    title: "Recall",
    description:
      "A developer tool for improving memory and recall of programming concepts.",
    tech: ["Next.js", "TypeScript"],
    link: "https://recall-dev.vercel.app/",
  },
  {
    title: "Algorithm Visualizer",
    description:
      "An interactive tool for visualizing various algorithms and data structures.",
    tech: ["TypeScript", "Visualization"],
    link: "https://algorithm-visualizer-bqz.pages.dev/",
  },
];

export default function Projects() {
  return (
    <div className="font-serif">
      <h1 className="text-3xl font-normal text-neutral-800 mb-6">Projects</h1>

      <p className="text-neutral-800 mb-12">
        A selection of projects I&apos;ve worked on. Some are experiments,
        others are tools I use regularly.
      </p>

      <div className="space-y-10">
        {projects.map((project) => (
          <article key={project.title} className="group">
            <h2 className="text-xl font-normal text-neutral-800">
              {project.title}
            </h2>
            <p className="text-neutral-600 mt-2">{project.description}</p>
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
