import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Family Home AI</h1>
        <p>Next.js proof of concept for a smart home family assistant.</p>
        <div className="cards">
          <article>
            <h2>AI status</h2>
            <p>Ready to build integrations for sensors, voice, and home automation.</p>
          </article>
          <article>
            <h2>Next steps</h2>
            <p>Connect an API route, embed voice control, or add real-time device state.</p>
          </article>
        </div>
        <Link href="/api/hello" className="button">
          Try API route
        </Link>
      </section>
    </main>
  );
}
