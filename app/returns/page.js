import { site } from '../../lib/site';
export const metadata = { title: 'Returns' };

export default function Returns() {
  return (
    <section className="section page narrow">
      <h1>Returns</h1>
      <p className="prose">{site.returnsText}</p>
    </section>
  );
}
