import { site } from '../../lib/site';
export const metadata = { title: 'Contact' };

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');
const isPhone = (s) => /^[+\d][\d\s-]{6,}$/.test(s || '');

export default function Contact() {
  return (
    <>
      <div className="page-banner"><img src="/images/site/newsletter.jpg" alt="" /></div>
      <section className="section page narrow">
        <h1>Contact</h1>
        <dl className="contact">
          <dt>Email</dt><dd>{isEmail(site.contactEmail) ? <a href={'mailto:' + site.contactEmail}>{site.contactEmail}</a> : site.contactEmail}</dd>
          <dt>Phone</dt><dd>{isPhone(site.contactPhone) ? <a href={'tel:' + site.contactPhone.replace(/\s/g, '')}>{site.contactPhone}</a> : site.contactPhone}</dd>
        </dl>
        <p className="prose">{site.contactText}</p>
      </section>
    </>
  );
}
