export default function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-neutral-800 mb-8">
        Contact
      </h1>

      <div className="prose">
        <p>
          I&apos;m always happy to connect with fellow developers, discuss ideas, or
          explore collaboration opportunities.
        </p>

        <h2>Get in touch</h2>

        <p>The best ways to reach me:</p>

        <ul className="space-y-3 list-none pl-0">
          <li>
            <a
              href="mailto:hello@example.com"
              className="text-neutral-800 hover:text-neutral-600 transition-colors"
            >
              hello@example.com
            </a>
            <span className="text-neutral-500 ml-2">— For general inquiries</span>
          </li>
          <li>
            <a
              href="https://twitter.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-neutral-600 transition-colors"
            >
              Twitter / X
            </a>
            <span className="text-neutral-500 ml-2">— For quick conversations</span>
          </li>
          <li>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-neutral-600 transition-colors"
            >
              GitHub
            </a>
            <span className="text-neutral-500 ml-2">— For code and projects</span>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-neutral-600 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-neutral-500 ml-2">— For professional connections</span>
          </li>
        </ul>

        <h2>Response time</h2>

        <p>
          I try to respond to all messages within a few days. If it&apos;s urgent,
          please mention that in your message.
        </p>
      </div>
    </div>
  );
}
