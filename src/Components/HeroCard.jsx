import React from "react";

export default function HeroCard({
    imageSrc,
    imageAlt = "Imagem destaque",
    title = "Título principal",
    subtitle,
    description,
    ctaText,
    ctaHref,
    reverse = false,
    className = "",
}) {
    return (
        <section className={`hero-card ${reverse ? "reverse" : ""} ${className}`}>
            <style>{`
                .hero-card{
                    display:flex;
                    gap:24px;
                    align-items:stretch;
                    background:#fff;
                    border-radius:12px;
                    box-shadow:0 6px 18px rgba(0,0,0,0.08);
                    overflow:hidden;
                    padding:0;
                    max-width:1100px;
                    margin:0 auto;
                }
                .hero-card .hero-image{
                    flex:0 0 42%;
                    min-width:200px;
                    height:100%;
                    background:#f0f0f0;
                }
                .hero-card .hero-image img{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    display:block;
                }
                .hero-card .hero-content{
                    flex:1;
                    padding:28px 28px;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    gap:12px;
                }
                .hero-card h1{
                    margin:0;
                    font-size:1.6rem;
                    line-height:1.1;
                }
                .hero-card .subtitle{
                    color:#666;
                    font-size:0.95rem;
                }
                .hero-card .description{
                    color:#444;
                    font-size:1rem;
                    margin-top:6px;
                }
                .hero-card .cta{
                    margin-top:12px;
                    display:inline-block;
                    background:#0b5fff;
                    color:#fff;
                    text-decoration:none;
                    padding:10px 16px;
                    border-radius:8px;
                    font-weight:600;
                }
                .hero-card.reverse{flex-direction:row-reverse}
                @media (max-width:720px){
                    .hero-card{flex-direction:column}
                    .hero-card .hero-image{flex:0 0 auto;height:220px;width:100%}
                    .hero-card .hero-content{padding:18px}
                }
            `}</style>

            <div className="hero-image" aria-hidden={!imageSrc}>
                {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
            </div>

            <div className="hero-content">
                {subtitle ? <div className="subtitle">{subtitle}</div> : null}
                <h1>{title}</h1>
                {description ? <p className="description">{description}</p> : null}
                {ctaText && ctaHref ? (
                    <a className="cta" href={ctaHref}>
                        {ctaText}
                    </a>
                ) : null}
            </div>
        </section>
    );
}