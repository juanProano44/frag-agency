import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Alert, Button, Card, Field, Form, InputText, Badge } from 'fragui';
import { Loader } from './components/Loader';
import { FormTextarea } from './components/FormTextarea';
import { useRevealAnimation } from './hooks/useRevealAnimation';
import { getProjects, getServices, sendContact } from './lib/api';
import { useLocale } from './providers/LocaleProvider';
import { useTheme } from './providers/ThemeProvider';
import { siteCopy } from './content/siteCopy';
import type { ContactPayload, ProjectItem, ServiceItem } from './types/domain';
import './App.css';

/* ─── Navigation ───────────────────────────────────────── */
function Navigation() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLocale();
  const copy = siteCopy[language];

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <header className="site-header">
      <div className="site-branding">
        <Link to="/" className="site-brand">
          Frag Agency
        </Link>
      </div>

      <nav className="site-nav" aria-label="Primary">
        <Link className={isActive('/') ? 'is-active' : ''} to="/">
          {copy.nav.home}
        </Link>
        <Link className={isActive('/work') ? 'is-active' : ''} to="/work">
          {copy.nav.work}
        </Link>
        <Link
          className={isActive('/services') ? 'is-active' : ''}
          to="/services"
        >
          {copy.nav.services}
        </Link>
        <Link className={isActive('/contact') ? 'is-active' : ''} to="/contact">
          {copy.nav.contact}
        </Link>
      </nav>

      <div className="site-actions">
        <Button
          variant={language === 'es' ? 'contained' : 'outlined'}
          size="sm"
          onClick={toggleLanguage}
        >
          {language === 'es' ? copy.actions.spanish : copy.actions.english}
        </Button>
        <Button
          variant="outlined"
          size="sm"
          onClick={toggleTheme}
          tooltip={
            theme === 'dark' ? copy.actions.themeLight : copy.actions.themeDark
          }
        >
          {theme === 'dark' ? '☀' : '☾'}
        </Button>
      </div>
    </header>
  );
}

/* ─── Newsletter Section ───────────────────────────────── */
function NewsletterSection() {
  const { language } = useLocale();
  const isEs = language === 'es';

  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <div className="newsletter-left">
          <p className="newsletter-eyebrow">
            {isEs ? 'Suscríbete ahora' : 'Subscribe now'}
          </p>
          <h2>
            {isEs ? 'Frag —\nNewsletter' : 'Frag —\nNewsletter'}
          </h2>
        </div>
        <div className="newsletter-right">
          <p>
            <strong>
              {isEs
                ? 'Revelando el futuro de las marcas, startups y el capital creativo.'
                : 'Revealing the future of brands, startups, and creative capital.'}
            </strong>
            <br />
            {isEs
              ? 'Cada semana, descubrimos las ideas y las historias que están dando forma al mañana — destacando fundadores visionarios, startups audaces y los cambios que redefinen cómo vivimos, trabajamos y nos conectamos.'
              : 'Each week, we uncover the ideas and stories shaping tomorrow — spotlighting visionary founders, bold startups, and the shifts redefining how we live, work, and connect.'}
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              className="newsletter-input"
              type="email"
              placeholder={isEs ? 'Tu correo electrónico' : 'Your email'}
            />
            <button className="newsletter-btn" type="submit">
              {isEs ? 'Unirme' : 'Join List'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ───────────────────────────────────────── */
function CtaBanner() {
  const { language } = useLocale();
  const isEs = language === 'es';

  return (
    <section className="cta-banner">
      <Link to="/contact" className="cta-banner-text">
        {isEs ? "HABLEMOS" : "LET'S CHAT"}
      </Link>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────── */
function Footer() {
  const { language } = useLocale();
  const copy = siteCopy[language];

  return (
    <footer className="site-footer">
      <div>
        <div className="site-footer-brand">{copy.footer.brand}</div>
      </div>
      <div className="site-footer-meta">
        <span>© {new Date().getFullYear()}</span>
        <span>FragUI</span>
      </div>
    </footer>
  );
}

/* ─── Project Card ─────────────────────────────────────── */
function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Card variant="elevated" className="project-card">
      <Card.Media>
        <img src={project.imageUrl} alt={project.title} loading="lazy" />
      </Card.Media>
      <Card.Body>
        <Card.Eyebrow>{project.category}</Card.Eyebrow>
        <Card.Title>{project.title}</Card.Title>
        <Card.Description>{project.summary}</Card.Description>
      </Card.Body>
    </Card>
  );
}

/* ─── Service Card ─────────────────────────────────────── */
function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Card variant="elevated" className="service-card">
      <Card.Body>
        <Card.Eyebrow>
          <Badge color="ink" label={service.id} />
        </Card.Eyebrow>
        <Card.Title>{service.title}</Card.Title>
        <Card.Description>{service.summary}</Card.Description>
      </Card.Body>
    </Card>
  );
}

/* ─── Home Page ────────────────────────────────────────── */
function HomePage({
  projects,
  services,
}: {
  projects: ProjectItem[];
  services: ServiceItem[];
}) {
  const { language } = useLocale();
  const copy = siteCopy[language];

  useRevealAnimation('.home-reveal');

  return (
    <div className="page page-home">
      <section className="hero hero-reveal home-reveal">
        <div className="hero-copy">
          <p className="eyebrow">{copy.home.eyebrow}</p>
          <h1>{copy.home.title}</h1>
          <p className="hero-text">{copy.home.subtitle}</p>
          <div className="hero-actions">
            <Link to="/work" className="hero-link">
              <Button variant="contained">{copy.home.primaryCta}</Button>
            </Link>
            <Link to="/contact" className="hero-link">
              <Button variant="outlined">{copy.home.secondaryCta}</Button>
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          {copy.home.stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section home-reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.home.featuredTitle}</p>
            <h2>{copy.home.featuredSubtitle}</h2>
          </div>
          <Link to="/work" className="section-link">
            {copy.nav.work} →
          </Link>
        </div>
        <div className="grid grid-three">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section home-reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.home.servicesTitle}</p>
            <h2>{copy.home.servicesSubtitle}</h2>
          </div>
          <Link to="/services" className="section-link">
            {copy.nav.services} →
          </Link>
        </div>
        <div className="grid grid-services-preview">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <NewsletterSection />
      <CtaBanner />
    </div>
  );
}

/* ─── Work Page ────────────────────────────────────────── */
function WorkPage({ projects }: { projects: ProjectItem[] }) {
  const { language } = useLocale();
  const copy = siteCopy[language];

  useRevealAnimation('.work-reveal');

  const alternatingProjects = projects.slice(0, 6);
  const stripProjects = projects.slice(6, 9);
  const galleryProjects = projects.slice(9);

  return (
    <div className="page page-work">
      <header className="page-header work-reveal">
        <p className="eyebrow">{copy.work.eyebrow}</p>
        <h1>{copy.work.title}</h1>
        <p>{copy.work.subtitle}</p>
      </header>

      <section className="section work-reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.work.alternatingTitle}</p>
            <h2>{copy.work.alternatingSubtitle}</h2>
          </div>
        </div>

        <div className="story-stack">
          {alternatingProjects.map((project, index) => (
            <article
              key={project.id}
              className={`story-card ${index % 2 === 1 ? 'story-card-reverse' : ''}`}
              data-format={project.format}
            >
              <div className="story-media">
                <img src={project.imageUrl} alt={project.title} loading="lazy" />
              </div>
              <div className="story-copy">
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section work-reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.work.stripTitle}</p>
            <h2>{copy.work.stripSubtitle}</h2>
          </div>
        </div>
        <div className="grid grid-three gallery-strip">
          {stripProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section work-reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.work.galleryTitle}</p>
            <h2>{copy.work.gallerySubtitle}</h2>
          </div>
        </div>
        <div className="grid gallery-grid">
          {galleryProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

/* ─── Services Page ────────────────────────────────────── */
function ServicesPage({ services }: { services: ServiceItem[] }) {
  const { language } = useLocale();
  const copy = siteCopy[language];

  useRevealAnimation('.services-reveal');

  return (
    <div className="page page-services">
      <header className="page-header services-reveal">
        <p className="eyebrow">{copy.services.eyebrow}</p>
        <h1>{copy.services.title}</h1>
        <p>{copy.services.subtitle}</p>
      </header>

      <section className="section services-reveal">
        <div className="grid grid-services">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <NewsletterSection />
      <CtaBanner />
    </div>
  );
}

/* ─── Contact Page ─────────────────────────────────────── */
function ContactPage() {
  const { language } = useLocale();
  const copy = siteCopy[language];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );

  useRevealAnimation('.contact-reveal');

  async function handleSubmit(values: Record<string, unknown>) {
    setStatus('sending');

    const payload: ContactPayload = {
      name: String(values.name ?? '').trim(),
      email: String(values.email ?? '').trim(),
      message: String(values.message ?? '').trim(),
    };

    try {
      await sendContact(payload);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      throw error instanceof Error ? error : new Error(copy.contact.errorBody);
    }
  }

  return (
    <div className="page page-contact contact-reveal">
      <header className="page-header">
        <p className="eyebrow">{copy.contact.eyebrow}</p>
        <h1>{copy.contact.title}</h1>
        <p>{copy.contact.subtitle}</p>
      </header>

      <div className="contact-layout">
        <aside className="contact-aside">
          <div className="contact-note">
            <span>{copy.contact.emailLabel}</span>
            <strong>{copy.contact.emailValue}</strong>
          </div>
          <p>{copy.contact.helper}</p>
          <p className="contact-inline-link">
            <a href={`mailto:${copy.contact.emailValue}`}>{copy.contact.emailValue}</a>
          </p>
        </aside>

        <div className="contact-form-shell">
          {status === 'success' && (
            <Alert status="success" variant="filled" title={copy.contact.successTitle}>
              {copy.contact.successBody}
            </Alert>
          )}
          {status === 'error' && (
            <Alert status="error" variant="outlined" title={copy.contact.errorTitle}>
              {copy.contact.errorBody}
            </Alert>
          )}

          <Form
            id="contact-form"
            initialValues={{ name: '', email: '', message: '' }}
            validationRules={{
              name: [
                { required: true, message: 'Required field' },
                { minLength: 2, message: 'Minimum 2 characters' },
              ],
              email: [
                { required: true, message: 'Required field' },
                { pattern: 'email', message: 'Invalid email' },
              ],
              message: [
                { required: true, message: 'Required field' },
                { minLength: 10, message: 'Minimum 10 characters' },
              ],
            }}
            validateOn="submit"
            onSubmit={handleSubmit}
            resetOnSuccess
          >
            <div className="form-grid">
              <Field name="name" label={copy.contact.nameLabel} required>
                <InputText placeholder={copy.contact.namePlaceholder} />
              </Field>
              <Field name="email" label={copy.contact.emailFieldLabel} required>
                <InputText type="email" placeholder={copy.contact.emailPlaceholder} />
              </Field>
            </div>

            <Field name="message" label={copy.contact.messageLabel} required>
              <FormTextarea
                rows={6}
                placeholder={copy.contact.messagePlaceholder}
                className="contact-textarea"
              />
            </Field>

            <div className="form-actions">
              <Button
                type="submit"
                variant="contained"
                loading={status === 'sending'}
                loadingText={copy.contact.sending}
              >
                {copy.contact.send}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

/* ─── App Shell ────────────────────────────────────────── */
function AppShell() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [servicesData, projectsData] = await Promise.all([
          getServices(),
          getProjects(),
        ]);
        setServices(servicesData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-shell">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage projects={projects} services={services} />} />
          <Route path="/work" element={<WorkPage projects={projects} />} />
          <Route path="/services" element={<ServicesPage services={services} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export { AppShell };