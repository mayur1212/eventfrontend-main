import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Cpu, Cog, Circle, Radio, Zap, SlidersHorizontal, Boxes, Code2 } from 'lucide-react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { getProducts } from '../../services/shop';
import { apiError } from '../../api';
import './KitsBuy.css';

const icons = { motor: Zap, servo: SlidersHorizontal, wheel: Circle, gear: Cog, hub: Cpu, sensor: Radio };

export function ProductArt({ product }) {
  const [failedImage, setFailedImage] = useState(null);
  const Icon = icons[product.kind] || Cpu;
  if (product.imageUrl && failedImage !== product.imageUrl) return <img onError={() => setFailedImage(product.imageUrl)} className="kit-art kit-product-image" src={product.imageUrl} alt={product.name} />;
  return <div className={`kit-art kit-art-${product.color}`} aria-hidden="true">
    <span className="kit-art-orbit" />
    <span className={`kit-component kit-component-${product.kind}`}><Icon strokeWidth={1.3} /></span>
    <span className="kit-art-label">{product.category} / {(product.kind || 'hub').toUpperCase()}</span>
  </div>;
}

export default function KitsBuy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { let active = true; getProducts().then(data => { if (active) setProducts(data); }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All products');
  const [expanded, setExpanded] = useState(null);
  const visible = products.filter(product => (category === 'All products' || product.category === category) && `${product.name} ${product.description} ${product.use}`.toLowerCase().includes(query.trim().toLowerCase()));

  return <div className="kits-page">
    <Navbar />
    <section className="kits-hero" aria-labelledby="kits-title">
      <div className="kits-hero-inner">
        <div>
          <div className="kits-eyebrow"><span /> THE ROBOTICS PARTS COLLECTION</div>
          <h1 id="kits-title">Small parts.<br /><span>Big possibilities.</span></h1>
          <p>Build it. Code it. Bring it to life. Explore the essentials for your next robotics project.</p>
          <a href="#kit-products" className="kits-primary">Explore kits & parts <ArrowRight size={18} /></a>
          <div className="kits-hero-caption">FOR CURIOUS MINDS & FUTURE INNOVATORS</div>
        </div>
        <div className="kits-hero-art" aria-hidden="true">
          <span className="kits-orbit orbit-one" /><span className="kits-orbit orbit-two" />
          <div className="kits-brain"><Cpu size={84} strokeWidth={1} /><span>YOUR NEXT<br />BIG IDEA</span></div>
          <div className="kits-floating kits-floating-gear"><Cog size={42} /><span>BUILD</span></div>
          <div className="kits-floating kits-floating-code"><Code2 size={35} /><span>PROGRAM</span></div>
          <div className="kits-floating kits-floating-power"><Zap size={32} /><span>CREATE</span></div>
          <span className="kits-art-note">Every great robot starts with a part.</span>
        </div>
      </div>
    </section>

    <section className="kits-catalog" id="kit-products" aria-labelledby="catalog-title">
      <div className="kits-catalog-heading"><div><div className="kits-eyebrow">THE BUILD STARTS HERE</div><h2 id="catalog-title">Kits Buy<span>.</span></h2><p>Find the right part. Bring your robot to life.</p></div><span className="kits-preview"><Boxes size={16} /> Robotics catalogue</span></div>
      <div className="kits-toolbar">
        <div className="kits-filters" aria-label="Product categories">{['All products', 'Motion', 'Electronics', 'Structure'].map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <label className="kits-search"><Search size={18} /><input aria-label="Search products" placeholder="Search parts…" value={query} onChange={event => setQuery(event.target.value)} /></label>
      </div>
      {loading && <p role="status">Loading products…</p>}{error && <p role="alert">{error} <button onClick={() => window.location.reload()}>Retry</button></p>}
      <p className="kits-result-count" role="status">Showing {visible.length} of {products.length} products</p>
      <div className="kits-grid">{visible.map(product => <article className="kit-card" key={product.id}>
        <ProductArt product={product} />
        <div className="kit-card-body"><span className="kit-category">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><div className="kit-use"><span>USE / उपयोग</span><p lang="mr">{product.use}</p></div>
          <div className="kit-purchase"><span className="text-slate-500">{product.stock === 0 ? "Not available" : "View price at checkout"}</span><Link className="kit-buy" to={`/kits-buy/checkout/${product.id}`}>{product.stock === 0 ? "View product" : "Buy Now"}<ArrowRight size={15} /></Link></div>
          <button className="kit-details" aria-expanded={expanded === product.id} aria-controls={`details-${product.id}`} onClick={() => setExpanded(expanded === product.id ? null : product.id)}>{expanded === product.id ? 'Hide details' : 'Explore product'}<ArrowRight size={17} /></button>
          {expanded === product.id && <div id={`details-${product.id}`} className="kit-expanded">{product.tag && <strong>{product.tag}</strong>}<ul>{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul><p>Review quantity and delivery details at checkout.</p><Link to="/help/contactus">Enquire about this product <ArrowRight size={14} /></Link></div>}
        </div>
      </article>)}</div>
      {!loading && !error && visible.length === 0 && <div className="kits-empty"><Search size={32} /><h3>{products.length ? "No matching parts" : "No products available yet"}</h3><p>{products.length ? "Try another name or category." : "Published products will appear here once they are added."}</p>{products.length > 0 && <button onClick={() => { setQuery(''); setCategory('All products'); }}>Show all products</button>}</div>}
      <div className="kits-help"><div><span className="kits-eyebrow">LET’S BUILD SOMETHING</span><h2>Big idea. Need a little guidance?</h2><p>Connect with our team for help choosing parts for your robot.</p></div><Link to="/help/contactus">Talk to our team <ArrowRight size={18} /></Link></div>
    </section>
    <Footer />
  </div>;
}
