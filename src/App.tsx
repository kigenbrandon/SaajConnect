import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  Handshake,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const heroImage = 'https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const teamImage = 'https://images.pexels.com/photos/5439162/pexels-photo-5439162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const services = [
  {
    number: '01',
    icon: Search,
    title: 'Talent search',
    description: 'We find capable, motivated people who fit the role and the culture behind it.',
  },
  {
    number: '02',
    icon: BriefcaseBusiness,
    title: 'Workforce solutions',
    description: 'Flexible recruitment support that keeps your team moving at every stage of growth.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Career connection',
    description: 'Personal guidance and opportunities that help ambitious professionals move forward.',
  },
];

const steps = [
  ['01', 'Tell us what you need', 'A focused conversation gives us the context to understand your goals.'],
  ['02', 'We make the connection', 'Our team searches, screens, and introduces the right people with care.'],
  ['03', 'Move forward together', 'We stay close through the process so every placement starts strongly.'],
];

type EnquiryType = 'Employer' | 'Candidate' | 'General enquiry';

function BrandMark({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return <img className={`brand-logo ${variant}`} src={variant === 'dark' ? '/assets/images/DARKMODE.jpeg' : '/assets/images/LIGHTMODE.jpeg'} alt="Saaj Connect LTD" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('Employer');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const form = new FormData(event.currentTarget);
    const { error: insertError } = await supabase.from('contact_enquiries').insert({
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      enquiry_type: enquiryType,
      message: form.get('message'),
    });

    if (insertError) {
      setError('We could not send your enquiry just now. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Saaj Connect LTD home">
          <BrandMark variant="dark" />
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About us</a>
          <a href="#services" onClick={closeMenu}>What we do</a>
          <a href="#leadership" onClick={closeMenu}>Leadership</a>
          <a href="#process" onClick={closeMenu}>Our approach</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a conversation <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Human resources, reconnected</p>
            <h1>People make<br /><em>progress</em> possible.</h1>
            <p className="hero-intro">Saaj Connect brings ambitious people and forward-thinking businesses together, creating the right conditions for meaningful work to thrive.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Find your next connection <ArrowRight size={17} /></a>
              <a className="text-link" href="#services">Explore our services <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img src={heroImage} alt="Professionals collaborating around a table in a modern office" />
              <div className="gold-stamp"><Sparkles size={17} /><span>Connecting<br />what matters</span></div>
            </div>
            <div className="hero-note"><span>01</span><p>People-first<br />by design</p></div>
          </div>
        </section>

        <section className="trust-bar">
          <p>Helping teams grow with intention</p>
          <div className="trust-items"><span><ShieldCheck size={16} /> Trusted process</span><span><Users size={16} /> Human insight</span><span><Clock3 size={16} /> Built for the long term</span></div>
        </section>

        <section className="about section-pad" id="about">
          <div className="section-label">02 <span>About Saaj Connect</span></div>
          <div className="about-grid">
            <h2>Good work begins<br />with the <em>right fit.</em></h2>
            <div className="about-copy"><p>We believe recruitment is more than filling a role. It is about understanding potential, recognising ambition, and making connections that last.</p><p>Our approach is thoughtful, personal, and practical. Whether you are building a team or building your career, we make every step feel more considered.</p><a className="text-link" href="#contact">Meet your next opportunity <ArrowRight size={16} /></a></div>
          </div>
          <div className="about-image-grid"><div className="image-frame"><img src={teamImage} alt="A team sharing ideas in a bright office" /></div><div className="quote-card"><p>“The best connections are the ones that create momentum for everyone.”</p><span>Saaj Connect LTD</span></div></div>
        </section>

        <section className="director section-pad" id="leadership">
          <div className="section-label">03 <span>Leadership</span></div>
          <div className="director-grid">
            <div className="director-profile"><div className="director-initials">SMT</div><div><p className="director-kicker">Managing Director</p><h2>Sharon Murugi<br /><em>Thuo.</em></h2></div></div>
            <div className="director-copy"><p>Saaj Connect LTD is led by Sharon Murugi Thuo, bringing a thoughtful, people-first perspective to every connection the business makes.</p><p>Her focus is simple: create meaningful opportunities for people and practical solutions for organisations.</p><a className="text-link" href="#contact">Connect with Saaj Connect <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-label">04 <span>What we do</span></div>
          <div className="section-heading-row"><h2>Connection with<br /><em>purpose.</em></h2><p>From the first conversation to the first day and beyond, we make the human side of work feel straightforward.</p></div>
          <div className="services-grid">{services.map(({ number, icon: Icon, title, description }) => <article className="service-card" key={number}><div className="service-top"><span>{number}</span><Icon size={24} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowRight size={18} /></a></article>)}</div>
        </section>

        <section className="process section-pad" id="process">
          <div className="process-intro"><div className="section-label light">05 <span>Our approach</span></div><h2>Simple steps.<br /><em>Strong starts.</em></h2><p>Clear communication, thoughtful matching, and a genuine interest in what comes next.</p></div>
          <div className="steps">{steps.map(([number, title, description]) => <div className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-copy"><div className="section-label">06 <span>Start a conversation</span></div><h2>Let’s create<br /><em>what’s next.</em></h2><p>Tell us a little about what you are looking for. We will be in touch with a considered next step.</p><div className="contact-detail"><span>Ready to take the next step?</span><a href="#contact-form">Use our enquiry form <ArrowUpRight size={15} /></a></div><div className="location-detail"><MapPin size={18} /><div><span>Visit our office</span><a href="https://www.google.com/maps/search/?api=1&query=QQWH%2B353%2C%20Limuru%20Rd%2C%20Nairobi" target="_blank" rel="noreferrer">QQWH+353, Limuru Rd<br />Nairobi, Kenya <ArrowUpRight size={15} /></a></div></div></div>
          <div className="form-card" id="contact-form">{submitted ? <div className="success-state"><div className="success-icon"><Check size={26} /></div><h3>Thank you for reaching out.</h3><p>Your enquiry is with our team. We will be in touch soon.</p><button className="button button-outline" type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button></div> : <form onSubmit={handleSubmit}><div className="form-type"><span>I am looking for</span><div className="type-options">{(['Employer', 'Candidate', 'General enquiry'] as EnquiryType[]).map((type) => <button className={enquiryType === type ? 'type-option active' : 'type-option'} key={type} type="button" onClick={() => setEnquiryType(type)}>{type}</button>)}</div></div><label>Name<input required name="name" type="text" placeholder="Your full name" /></label><div className="form-row"><label>Email<input required name="email" type="email" placeholder="you@example.com" /></label><label>Phone <span>(optional)</span><input name="phone" type="tel" placeholder="+44 ..." /></label></div><label>How can we help?<textarea required name="message" rows={4} placeholder="Tell us a little about your goals..." /></label>{error && <p className="form-error">{error}</p>}<button className="button button-dark form-submit" disabled={submitting} type="submit">{submitting ? 'Sending...' : 'Send enquiry'} <ArrowRight size={17} /></button></form>}</div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><BrandMark variant="light" /></a><p>Human resources, reconnected.</p><span>© {new Date().getFullYear()} Saaj Connect LTD</span></footer>
    </div>
  );
}

export default App;
