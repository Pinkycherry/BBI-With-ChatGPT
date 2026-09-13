import { Brand } from "./header";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>
              Researched business ideas.
              <br />A clearer place to begin.
            </p>
          </div>
          <div className="footer-column">
            <h2>The library</h2>
            <a href="/browse">All business ideas</a>
            <a href="/list">Reading lists</a>
            <a href="/search">Search the library</a>
            <a href="/calculator">Free calculators</a>
          </div>
          <div className="footer-column">
            <h2>Keep exploring</h2>
            <a href="/blog">Field notes</a>
            <a href="/faq">Common questions</a>
            <a href="/validate/tech-saas">Founder-fit checklist</a>
            <a href="/pricing">Free access</a>
          </div>
          <div className="footer-column">
            <h2>About BBI</h2>
            <a href="/about">Our approach</a>
            <a href="/contact">Get in touch</a>
            <a href="/services">Services</a>
            <a href="/sign-in">Sign in</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>businessidea.io · Thoughtfully researched. Freely shared.</span>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/gdpr">Data rights</a>
            <a href="/refund-policy">Refund policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
