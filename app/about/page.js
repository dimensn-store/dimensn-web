import { site } from '../../lib/site';
export const metadata = { title: 'About' };

export default function About() {
  return (
    <>
      <div className="page-banner"><img src="/images/site/runway.jpg" alt="" /></div>
      <section className="section page narrow">
        <h1>{site.aboutTitle}</h1>
        <p className="prose">{site.aboutText}</p>
      </section>
    </>
  );
}
