export default function Contact() {
  return (
    <article className="prose font-serif">
      <h1>Contact</h1>

      <p>
        I&apos;m always happy to connect with fellow developers, discuss ideas, or
        explore collaboration opportunities.
      </p>

      <h2>Get in touch</h2>

      <p>The best ways to reach me:</p>

      <ul className="space-y-3 list-none pl-0">
        <li>
          <a href="mailto:hello@example.com">hello@example.com</a>
          <span className="text-neutral-500 ml-2">— For general inquiries</span>
        </li>
        <li>
          <a
            href="https://twitter.com/username"
            target="_blank"
            rel="noopener noreferrer"
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
    </article>
  );
}
