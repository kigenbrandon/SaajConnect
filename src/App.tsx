import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownToLine,
  BriefcaseBusiness,
  Check,
  Handshake,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Mail,
  Phone,
  Instagram,
  Music2,
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const heroImage = 'https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const teamImage = 'https://images.pexels.com/photos/5439162/pexels-photo-5439162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const services = [
  {
    number: '01',
    icon: Search,
    title: 'International recruitment & placement',
    description: 'We connect qualified Kenyan candidates with skilled, semi-skilled, and general workforce roles abroad.',
  },
  {
    number: '02',
    icon: Handshake,
    title: 'Employer partnerships',
    description: 'We work with international employers and recruitment agencies to understand workforce needs.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Talent sourcing & screening',
    description: 'We identify candidates, review CVs, and screen and match applicants against job requirements.',
  },
  {
    number: '04',
    icon: BriefcaseBusiness,
    title: 'International opportunities',
    description: 'We facilitate access to vacancies across sectors in line with employer demand.',
  },
  {
    number: '05',
    icon: Check,
    title: 'Candidate support & coordination',
    description: 'We coordinate recruitment communication, documentation, and candidate preparation within the agreed placement scope.',
  },
];

const steps = [
  ['01', 'Understand the requirement', 'We agree job specifications, candidate numbers, terms, and timelines with the employer.'],
  ['02', 'Source & attract', 'We identify candidates whose skills and experience match the role.'],
  ['03', 'Screen & shortlist', 'We review CVs, conduct preliminary screening, and match candidates against the employer’s criteria.'],
  ['04', 'Employer selection', 'We present shortlisted candidates for interviews and final selection.'],
  ['05', 'Documentation & preparation', 'We coordinate paperwork and prepare selected candidates for travel and their new role.'],
  ['06', 'Deployment & follow-up', 'Candidates travel to the employer, and we keep communication open on both sides.'],
];

const sectors = ['Hospitality', 'Domestic services', 'Education', 'Transport', 'Logistics', 'Warehousing', 'Construction', 'Cleaning', 'Sales & marketing', 'Security', 'Healthcare & caregiving'];
const values = ['Integrity', 'Professionalism', 'Partnership', 'Opportunity', 'Accountability'];
const hrServices = [
  'Human resource planning',
  'Recruitment and selection',
  'Onboarding and employee integration',
  'Employee records and HR administration',
  'Compensation and benefits administration',
  'Performance management',
  'Training and development',
  'Employee relations and engagement',
  'Labour laws and regulatory compliance',
  'Leave and absence management',
  'Employee welfare, health and safety',
  'Talent management and career development',
  'Disciplinary and grievance management',
  'Separation and exit management',
  'HR strategy and reporting',
  'HR policy development',
];
const targetMarkets = [
  ['Local market', 'Kenya', 'Recruitment, placement and full HR support for Kenyan businesses and organisations across all sectors.'],
  ['International', 'Saudi Arabia', 'Domestic services, transport, logistics and other employer-driven workforce opportunities.'],
  ['International', 'Qatar', 'Education, cleaning, hospitality and other employment opportunities.'],
  ['International', 'United Arab Emirates', 'Construction, warehousing, cleaning and other workforce opportunities.'],
];

type EnquiryType = 'Employer' | 'Candidate' | 'General enquiry';

function BrandMark({ variant = 'gold' }: { variant?: 'gold' | 'charcoal' }) {
  const icon = variant === 'gold' ? 'saaj-icon-gold.png' : 'saaj-icon-charcoal.png';

  return (
    <span className={`brand-mark ${variant}`}>
      <img className="brand-icon" src={`/assets/images/${icon}`} alt="" />
      <span className="brand-wordmark">SAAJ<small>RECRUITMENT LIMITED</small></span>
    </span>
  );
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

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const { error: insertError } = await getSupabaseClient().from('contact_enquiries').insert({
        name: form.get('name')?.toString() ?? '',
        email: form.get('email')?.toString() ?? '',
        phone: form.get('phone')?.toString() || null,
        enquiry_type: enquiryType,
        message: form.get('message')?.toString() ?? '',
      });

      if (insertError) {
        console.error('Failed to submit contact enquiry:', insertError);
        setError('We could not send your enquiry just now. Please try again.');
        return;
      }

      setSubmitted(true);
      formElement.reset();
    } catch (submissionError) {
      console.error('Failed to submit contact enquiry:', submissionError);
      setError('We could not send your enquiry just now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="SAAJ RECRUITMENT LIMITED home">
          <BrandMark variant="gold" />
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About us</a>
          <a href="#services" onClick={closeMenu}>What we do</a>
          <a href="#hr-solutions" onClick={closeMenu}>HR solutions</a>
          <a href="#leadership" onClick={closeMenu}>Leadership</a>
          <a href="#process" onClick={closeMenu}>Our approach</a>
          <a href="https://saaj-connect-limited-app.vercel.app/careers" target="_blank" rel="noreferrer" onClick={closeMenu}>Careers</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a conversation <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span /> International recruitment & human capital solutions</p>
            <h1>Connecting Kenyan skills<br /><em>to the world.</em></h1>
            <p className="hero-intro">SAAJ RECRUITMENT LIMITED is a Kenyan recruitment and human capital solutions company connecting Kenyan talent with employment opportunities across international markets.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Partner with SAAJ RECRUITMENT <ArrowRight size={17} /></a>
              <a className="text-link" href="/assets/SAAJ_Connect_Company_Profile_2026.pdf" download>Download company profile <ArrowDownToLine size={16} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img src={heroImage} alt="Professionals collaborating around a table in a modern office" />
              <div className="gold-stamp"><Sparkles size={17} /><span>Kenyan talent<br />Global opportunity</span></div>
            </div>
            <div className="hero-note"><span>01</span><p>People-first<br />by design</p></div>
          </div>
        </section>

        <section className="trust-bar">
          <p>Kenyan talent. Global opportunities.</p>
          <div className="trust-items"><span><ShieldCheck size={16} /> Ethical recruitment</span><span><Users size={16} /> Candidate-focused</span><span><Handshake size={16} /> Partnership-driven</span></div>
        </section>

        <section className="about section-pad" id="about">
          <div className="section-label">02 <span>Company overview</span></div>
          <div className="about-grid">
            <h2>Local talent.<br /><em>Global opportunity.</em></h2>
            <div className="about-copy"><p>SAAJ RECRUITMENT bridges employers seeking capable, reliable workers and Kenyans looking to develop their careers, improve their livelihoods, and gain international work experience.</p><p>With a strategic focus on Saudi Arabia and the wider Gulf, we build partnerships that expand access to global employment through professionalism, integrity, and effective communication.</p></div>
          </div>
          <div className="purpose-grid">
            <article><span>Our vision</span><p>To become a trusted international recruitment and human capital partner connecting Kenyan talent to meaningful employment worldwide.</p></article>
            <article><span>Our mission</span><p>To connect employers with suitable Kenyan talent through professional recruitment, strategic partnerships, and responsible talent mobility.</p></article>
          </div>
          <div className="values-strip"><span>What we stand for</span>{values.map((value) => <strong key={value}>{value}</strong>)}</div>
        </section>

        <section className="director section-pad" id="leadership">
          <div className="section-label">03 <span>A message from our director</span></div>
          <div className="about-image-grid"><div className="director-profile"><img src="/assets/images/director.png" alt="A team sharing ideas in a bright office" /></div><div className="quote-card"><p>“Talent has no borders — and every great journey begins with the right connection.”</p><span>Sharon · Managing Director</span></div></div>
          <div className="director-grid">
            <div className="director-profile"><div><p className="director-kicker">Managing Director, SAAJ RECRUITMENT LIMITED</p><h2>Sharon</h2></div></div>
            <div className="director-copy"><p>SAAJ RECRUITMENT LIMITED was founded on a simple conviction: Kenya’s people are among its greatest assets, and with the right opportunity, Kenyan talent can thrive anywhere in the world.</p><p>We take that responsibility seriously through clear terms, honest communication, careful screening, and respect for every candidate and client.</p><a className="text-link" href="mailto:saajconnect@gmail.com">Contact our team <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-label">04 <span>Core services</span></div>
          <div className="section-heading-row"><h2>End-to-end<br /><em>recruitment support.</em></h2><p>From the first workforce requirement to final placement, we support employers and candidates through a coordinated recruitment process.</p></div>
          <div className="services-grid">{services.map(({ number, icon: Icon, title, description }) => <article className="service-card" key={number}><div className="service-top"><span>{number}</span><Icon size={24} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowRight size={18} /></a></article>)}</div>
          <div className="sectors-list"><h3>Sectors we serve</h3><div>{sectors.map((sector) => <span key={sector}>{sector}</span>)}</div></div>
          <div className="markets-note"><span>Talent from</span><strong>Kenya</strong><ArrowRight size={17} /><span>Initial markets</span><strong>Saudi Arabia · Qatar · United Arab Emirates</strong></div>
        </section>

        <section className="hr-solutions section-pad" id="hr-solutions">
          <div className="section-label">05 <span>Human resource solutions</span></div>
          <div className="section-heading-row">
            <h2>Complete HR,<br /><em>your way.</em></h2>
            <p>Choose a single service or a complete outsourced HR function. Every package is tailored to your organisation, team size and budget.</p>
          </div>
          <div className="hr-grid">
            {hrServices.map((service, index) => (
              <article key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></article>
            ))}
          </div>
        </section>

        <section className="markets section-pad" id="markets">
          <div className="section-label">06 <span>Target markets</span></div>
          <div className="section-heading-row">
            <h2>Where we<br /><em>connect.</em></h2>
            <p>Our market strategy is guided by employer demand, candidate suitability and applicable recruitment and employment regulations.</p>
          </div>
          <div className="market-grid">
            {targetMarkets.map(([scope, market, description]) => (
              <article key={market}><span>{scope}</span><h3>{market}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="process section-pad" id="process">
          <div className="process-intro"><div className="section-label light">07 <span>Our process</span></div><h2>Responsible<br /><em>talent mobility.</em></h2><p>Each placement is guided by employer demand, candidate suitability, clear communication, and applicable recruitment and employment regulations.</p></div>
          <div className="steps">{steps.map(([number, title, description]) => <div className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-copy">
            <div className="section-label">
              08 <span>Partner with us</span>
            </div>

            <h2>
              Let’s build
              <br />
              <em>something lasting.</em>
            </h2>

            <p>
              We welcome international employers, recruitment agencies, workforce
              partners, and organisations seeking access to Kenyan talent.
            </p>

            <div className="contact-detail">
              <BriefcaseBusiness size={18} />
              <div>
                <span>For employers</span>
                <a href="#contact-form">
                  Share your workforce needs <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="location-detail">
              <MapPin size={18} />
              <div>
                <span>Location</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ruaka%20Landmark%2C%20Ruaka%2C%20Kenya"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ruaka Landmark · Ruaka, Kenya
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

          <div className="location-detail">
            <Mail size={18} />
            <div>
              <span>Email</span>
              <a href="mailto:saajconnect@gmail.com">
                saajconnect@gmail.com <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="location-detail">
            <Phone size={18} />
            <div>
              <span>Telephone</span>
              <a href="tel:+254184280029">
                018 4280029 <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="social-links" aria-label="SAAJ RECRUITMENT LIMITED social channels">
            <a href="https://www.instagram.com/saaj_recruitment_" target="_blank" rel="noreferrer" aria-label="SAAJ Recruitment on Instagram">
              <Instagram size={17} />
              @saaj_recruitment_
            </a>
            <a href="https://www.tiktok.com/@saaj_recruitment_" target="_blank" rel="noreferrer" aria-label="SAAJ Recruitment on TikTok">
              <Music2 size={17} />
              @saaj_recruitment_
            </a>
            <a href="https://saaj-connect-limited-app.vercel.app/careers" target="_blank" rel="noreferrer">
              Careers
              <ArrowUpRight size={15} />
            </a>
          </div>

            <div className="location-map">
              <iframe
                title="Map showing SAAJ RECRUITMENT LIMITED in Ruaka, Kenya"
                src="https://www.google.com/maps?q=Ruaka%20Landmark%2C%20Ruaka%2C%20Kenya&output=embed"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>          <div className="form-card" id="contact-form">{submitted ? <div className="success-state"><div className="success-icon"><Check size={26} /></div><h3>Thank you for reaching out.</h3><p>Your enquiry is with our team. We will be in touch soon.</p><button className="button button-outline" type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button></div> : <form onSubmit={handleSubmit}><div className="form-type"><span>I am looking for</span><div className="type-options">{(['Employer', 'Candidate', 'General enquiry'] as EnquiryType[]).map((type) => <button className={enquiryType === type ? 'type-option active' : 'type-option'} key={type} type="button" onClick={() => setEnquiryType(type)}>{type}</button>)}</div></div><label>Name<input required name="name" type="text" placeholder="Your full name" /></label><div className="form-row"><label>Email<input required name="email" type="email" placeholder="you@example.com" /></label><label>Phone <span>(optional)</span><input name="phone" type="tel" placeholder="+44 ..." /></label></div><label>How can we help?<textarea required name="message" rows={4} placeholder="Tell us a little about your goals..." /></label>{error && <p className="form-error">{error}</p>}<button className="button button-dark form-submit" disabled={submitting} type="submit">{submitting ? 'Sending...' : 'Send enquiry'} <ArrowRight size={17} /></button></form>}</div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#top" aria-label="SAAJ RECRUITMENT LIMITED home"><BrandMark variant="charcoal" /></a><p>Kenyan talent · Global opportunities · Lasting impact</p><a className="profile-download" href="/assets/SAAJ_Connect_Company_Profile_2026.pdf" download>Download company profile <ArrowDownToLine size={15} /></a><div className="footer-links"><a href="https://www.instagram.com/saaj_recruitment_" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.tiktok.com/@saaj_recruitment_" target="_blank" rel="noreferrer">TikTok</a><a href="https://saaj-connect-limited-app.vercel.app/careers" target="_blank" rel="noreferrer">Careers</a></div><span>© {new Date().getFullYear()} SAAJ RECRUITMENT LIMITED</span></footer>
    </div>
  );
}

export default App;
