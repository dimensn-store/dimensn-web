'use client';
import { useState } from 'react';
import ModelViewer from './ModelViewer';
import { useBag } from './BagProvider';
import { money } from '../lib/format';

export default function ProductView({ product }) {
  const { add } = useBag();
  const [view, setView] = useState('3d');
  const [colour, setColour] = useState(product.colours.length === 1 ? product.colours[0] : '');
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);

  const needsSize = product.sizes.length > 0;
  const ready = !!colour && (!needsSize || !!size);
  const missing = [!colour && 'colour', needsSize && !size && 'size'].filter(Boolean);

  const onAdd = () => {
    if (!ready) return;
    const id = [product.sku, colour, size].filter(Boolean).join('|');
    add({ id, slug: product.slug, name: product.name, options: [colour, size].filter(Boolean).join(' / '), price: product.price, image: product.thumb });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pdp">
      <div className="pdp-media">
        <div className="toggle" role="group" aria-label="Product view">
          <button aria-pressed={view === '3d'} onClick={() => setView('3d')}>View in 3D</button>
          <button aria-pressed={view === 'photo'} onClick={() => setView('photo')}>Photo</button>
        </div>
        {view === '3d'
          ? <ModelViewer src={product.glb} poster={product.image} alt={'3D model of ' + product.name + '. Drag to turn it.'} />
          : <img className="pdp-img" src={product.image} alt={product.name} width="1200" height="1200" />}
      </div>

      <div className="pdp-info">
        <p className="meta">{product.categoryName}</p>
        <h1>{product.name}</h1>
        <p className="pdp-price">{money(product.price)}</p>
        <p className="lead">{product.short}</p>

        <Choice label="Colour" options={product.colours} value={colour} onChange={setColour} />
        {needsSize ? <Choice label="Size" options={product.sizes} value={size} onChange={setSize} /> : null}

        <div className="pdp-buy">
          <button className="btn btn-block" onClick={onAdd} disabled={!ready}>{added ? 'Added' : 'Add to bag'}</button>
          <p className="meta" aria-live="polite">{added ? product.name + ' is in your bag.' : missing.length ? 'Choose ' + missing.join(' and ') + '.' : ''}</p>
        </div>
      </div>
    </div>
  );
}

function Choice({ label, options, value, onChange }) {
  return (
    <fieldset className="swatches">
      <legend>{label}{value ? ': ' + value : ''}</legend>
      <div>
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(value === o && options.length > 1 ? '' : o)}>{o}</button>
        ))}
      </div>
    </fieldset>
  );
}
