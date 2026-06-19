"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
 Crosshair,
 ShieldCheck,
 Clock3,
 CalendarDays,
 Building2,
 Grid2X2,
 Phone,
 MapPin,
 Landmark,
 Menu,
 X,
} from "lucide-react";

export default function Home() {

  useEffect(() => {
    const gallery = document.getElementById("gallery-scroll");

    if (!gallery) return;

    let paused = false;

    const scroll = setInterval(() => {
      if (paused) return;

      gallery.scrollLeft += 1.5;
      

      if (
        gallery.scrollLeft + gallery.clientWidth >=
        gallery.scrollWidth - 2
      ) {
        gallery.scrollTo({
          left: 0,
          behavior: "auto",
        });
      }
    }, 20);

    gallery.addEventListener("mouseenter", () => {
      paused = true;
    });

    gallery.addEventListener("mouseleave", () => {
      paused = false;
    });

    return () => clearInterval(scroll);
  }, []);
useEffect(() => {
  const testimonials =
    document.getElementById("testimonial-scroll");

  if (!testimonials) return;

  let paused = false;

  const scroll = setInterval(() => {
    if (paused) return;

    testimonials.scrollLeft -= 2;

    if (testimonials.scrollLeft <= 0) {
      testimonials.scrollLeft =
        testimonials.scrollWidth / 2;
    }
  }, 20);

  testimonials.addEventListener(
    "mouseenter",
    () => {
      paused = true;
    }
  );

  testimonials.addEventListener(
    "mouseleave",
    () => {
      paused = false;
    }
  );

  return () => clearInterval(scroll);
}, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", address: "", details: "", honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  function validateForm(): string[] {
    const errs: string[] = [];
    if (!form.name.trim()) errs.push("Name is required");
    if (!form.email.trim()) errs.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.push("Invalid email format");
    if (!form.phone.trim()) errs.push("Phone number is required");
    else if (form.phone.replace(/\D/g, "").length < 10)
      errs.push("Phone number must have at least 10 digits");
    if (!form.company.trim()) errs.push("Company / Property Name is required");
    if (!form.address.trim()) errs.push("Property Address is required");
    return errs;
  }

  async function handleSubmit() {
    const clientErrors = validateForm();
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }
    setErrors([]);
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", company: "", address: "", details: "", honeypot: "" });
      } else {
        setErrors(data.errors ?? ["Something went wrong. Please try again."]);
        setStatus("error");
      }
    } catch {
      setErrors(["Network error. Please check your connection and try again."]);
      setStatus("error");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main>
      {/* NAVBAR */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "rgba(20,21,24,.85)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
        className="navbar-inner"
  style={{
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "90px",
  }}
>
          <Image
  src="/images/logo.png"
  alt="GumGone Pros"
  width={250}
  height={70}
  priority
  style={{
    marginLeft: "-30px",
  }}
/>

         <nav
  className="nav-links"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "40px",
  }}
>
  <a href="#about">ABOUT</a>

  <a href="#results">RESULTS</a>

  <a href="#contact">CONTACT</a>

  <a
    href="#contact"
    className="nav-cta"
  >
    <button className="btn-primary">
      REQUEST FREE EVALUATION
    </button>
  </a>
</nav>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "8px" }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        </div>
      </header>

      {menuOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
            onClick={() => setMenuOpen(false)}
          />
          <div className="mobile-nav">
            <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
            <a href="#results" onClick={() => setMenuOpen(false)}>RESULTS</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
          </div>
        </>
      )}

      {/* HERO */}
<section
  className="hero-container mobile-stack hero-grid"
  style={{
    minHeight: "720px",
    paddingTop: "110px",
    alignItems: "start",
    gap: "40px",
}}
>
  {/* LEFT SIDE */}
  <div
  className="hero-text"
  style={{
    position: "relative",
    zIndex: 2,
    paddingTop: "60px",
  }}
>
    <h1
      style={{
        fontSize: "82px",
        whiteSpace: "nowrap",
        fontWeight: "900",
        lineHeight: ".95",
        fontFamily: "'Arial Narrow', Arial, sans-serif",
        letterSpacing: "-1px",
        marginBottom: "18px",
      }}
    >
      GUM REMOVAL
    </h1>

    <div
      style={{
        width: "70px",
        height: "4px",
        background: "var(--accent)",
        marginBottom: "45px",
      }}
    />

    <h2
      style={{
        fontSize: "54px",
        lineHeight: "1.15",
        fontWeight: "500",
        marginBottom: "35px",
      }}
    >
      Cleaner Sidewalks.
      <br />
      <span className="accent">
        Better Impressions.
      </span>
    </h2>

    <p
      style={{
        fontSize: "22px",
        lineHeight: "1.7",
        fontWeight: "500",
        maxWidth: "420px",
        marginBottom: "55px",
      }}
    >
      Helping business and commercial properties maintain cleaner sidewalks and stronger first impressions
    </p>

    <a href="#contact">
  <button className="btn-primary">
    REQUEST FREE EVALUATION
  </button>
</a>
  </div>

  {/* RIGHT SIDE IMAGE */}
<div
  className="hero-image"
  style={{
    position: "relative",
    overflow: "hidden",

  WebkitMaskImage:
"linear-gradient(to right, transparent 0%, black 20%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",

maskImage:
"linear-gradient(to right, transparent 0%, black 20%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",

WebkitMaskComposite: "source-in",
maskComposite: "intersect",
  }}
>
  <Image
    src="/images/Hero-property4.png"
    alt="Commercial Property"
    width={1100}
    height={700}
    priority
    style={{
      width: "100%",
      height: "auto",
      display: "block",
    }}
  />

  
</div>

</section>

      {/* QUOTE */}
      <section style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ width: "60px", height: "3px", background: "var(--accent)", margin: "0 auto 30px" }} />

        <h3
          style={{
            fontSize: "38px",
            fontWeight: "300",
            letterSpacing: "4px",
            lineHeight: "1.6",
            textTransform: "uppercase",
          }}
        >
          First Impressions Start Before
          <br />
          Anyone Walks Through The Door
        </h3>

        <div style={{ width: "60px", height: "3px", background: "var(--accent)", margin: "30px auto 0" }} />
      </section>

      {/* BETTER APPROACH */}

      <div className="section-divider" />
      <section id="about" style={{ paddingTop: "100px", paddingBottom: "90px" }}>
        <div className="container">
          
<h2 className="section-title">
  A Better Approach
</h2>
<div
  style={{
    width: "60px",
    height: "3px",
    background: "var(--accent)",
    margin: "8px auto 80px",
    borderRadius: "999px",
  }}
/>
          <div
            className="mobile-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,280px)",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <div className="feature-card">
  <Crosshair
    size={52}
    strokeWidth={1.75}
    color="var(--accent)"
    style={{ marginBottom: "18px" }}
  />
  <h3>Targeted Cleaning</h3>
  <p>
    Remove gum where it exists without costly spraying of entire walkways.
  </p>
</div>

<div className="feature-card">
  <ShieldCheck
    size={52}
    strokeWidth={1.75}
    color="var(--accent)"
    style={{ marginBottom: "18px" }}
  />
  <h3>Surface Conscious</h3>
  <p>
    Designed to remove gum without eroding concrete or damaging surfaces.
  </p>
</div>

<div className="feature-card">
  <Clock3
    size={52}
    strokeWidth={1.75}
    color="var(--accent)"
    style={{ marginBottom: "18px" }}
  />
  <h3>Low Disruption</h3>
  <p>
    Minimal property impact during cleaning.
    No water. No hoses. No Mess.
  </p>
</div>
<div className="feature-card">
  <CalendarDays
    size={52}
    strokeWidth={1.75}
    color="var(--accent)"
    style={{ marginBottom: "18px" }}
  />
  <h3>Eco-Friendly Process</h3>
  <p>
    Biodegradable Solution.  Good for your
    property and the environment.
  </p>
</div>
          </div>
        </div>
      </section>


{/* SEE THE DIFFERENCE */}
<section id="results" style={{ paddingTop: "140px", paddingBottom: "90px" }}>
  <div className="container">

    <h2 className="section-title">
  See The Difference
</h2>
<div
  style={{
    width: "60px",
    height: "3px",
    background: "var(--accent)",
    margin: "8px auto 20px",
    borderRadius: "999px",
  }}
/>
    <p
      style={{
        textAlign: "center",
        maxWidth: "550px",
        margin: "0 auto 60px",
        fontSize: "20px",
        lineHeight: "1.8",
      }}
    >
      Targeted gum removal designed to restore
      the appearance of multiple surface types
    </p>

    <div
      className="mobile-stack"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,420px)",
        justifyContent: "center",
        gap: "20px",
      }}
    >

      <div className="result-card">
        <div
          style={{
            height: "300px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/Concrete Image1.png"
            alt="Concrete"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
    style={{
    padding: "24px 20px",
    textAlign: "center",
  }}
>
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  }}
>
  <Building2
    size={32}
    strokeWidth={1.75}
    color="var(--accent)"
  />

  <h3
    style={{
      fontSize: "22px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontWeight: "700",
      color: "rgba(255,255,255,.9)",
      margin: 0,
    }}
  >
    Concrete
  </h3>
</div>
</div>
      </div>

      <div className="result-card">
        <div
          style={{
            height: "300px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/Brick Image1.png"
            alt="Brick"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
  style={{
    padding: "24px 20px",
    textAlign: "center",
  }}
>
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  }}
>
  <Grid2X2
    size={32}
    strokeWidth={1.75}
    color="var(--accent)"
  />

  <h3
    style={{
      fontSize: "22px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontWeight: "700",
      color: "rgba(255,255,255,.9)",
      margin: 0,
    }}
  >
    Brick
  </h3>
</div>
</div>
      </div>

      <div className="result-card">
        <div
          style={{
            height: "300px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/Stone Image1.png"
            alt="Stone"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          </div>
        <div
  style={{
    padding: "24px 20px",
    textAlign: "center",
  }}
>
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  }}
>
  <Landmark
    size={32}
    strokeWidth={1.75}
    color="var(--accent)"
  />

  <h3
    style={{
      fontSize: "22px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontWeight: "700",
      color: "rgba(255,255,255,.9)",
      margin: 0,
    }}
  >
    Stone
  </h3>
</div>
</div>
      </div>

    </div>
  </div>
</section>

{/* RESULTS GALLERY — hidden until 6 real examples exist */}

<div className="section-divider" style={{ display: "none" }} />
<section
  style={{ display: "none",
    paddingTop: "100px",
    paddingBottom: "90px",
  }}
>
  <div className="container">

<h2 className="section-title">
  Results Gallery
</h2>

<div
  style={{
    width: "60px",
    height: "3px",
    background: "var(--accent)",
    margin: "8px auto 50px",
    borderRadius: "999px",
  }}
/>

<div
  className="gallery-wrapper"
  style={{
    position: "relative",
  }}
>

  {/* LEFT ARROW */}
  <button
    onClick={() => {
      const gallery = document.getElementById("gallery-scroll");

      if (gallery) {
        gallery.scrollLeft -= 600;
      }
    }}
    className="gallery-arrow-left"
    style={{
      position: "absolute",
      left: "-10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      color: "var(--accent)",
      fontSize: "90px",
      fontWeight: "300",
      cursor: "pointer",
      zIndex: 10,
    }}
  >
    ❮
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={() => {
      const gallery = document.getElementById("gallery-scroll");

      if (gallery) {
        gallery.scrollLeft += 600;
      }
    }}
    className="gallery-arrow-right"
    style={{
      position: "absolute",
      right: "-10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      color: "var(--accent)",
      fontSize: "90px",
      fontWeight: "300",
      cursor: "pointer",
      zIndex: 10,
    }}
  >
    ❯
  </button>

  <div
    id="gallery-scroll"
    className="gallery-scroll"
    style={{
      display: "flex",
      gap: "24px",
      overflowX: "auto",
      paddingBottom: "10px",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div
        key={item}
        className="result-card"
        style={{
          minWidth: "560px",
          height: "350px",
          flexShrink: 0,
          background: "#2a2d31",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          fontWeight: "700",
          color: "rgba(255,255,255,.85)",
        }}
      >
        Gallery {item}
      </div>
    ))}
  </div>

</div>

  </div>
</section>

{/* TESTIMONIALS — hidden until 6 real testimonials exist */}
<section style={{ display: "none", paddingBottom: "90px" }}>
  <div className="container">

    <h2 className="section-title">
      We Don't Mean To Brag, But...
    </h2>

    <div
      style={{
        width: "60px",
        height: "3px",
        background: "var(--accent)",
        margin: "8px auto 70px",
        borderRadius: "999px",
      }}
    />

    <div
      id="testimonial-scroll"
      style={{
        display: "flex",
        gap: "25px",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        paddingBottom: "10px",
      }}
    >
      {[1,2,3,4,5,6,1,2,3,4,5,6].map((item, index) => (
        <div
          key={index}
          className="feature-card"
          style={{
            minWidth: "240px",
            height: "220px",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Testimonial #{item}
          </p>

          <p>
            Sample customer review text.
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
{/* CONTACT */}

<div className="section-divider" />

<section
  id="contact"
  style={{
    paddingTop: "100px",
    paddingBottom: "120px",
  }}
>
  <div className="container">

    <h2 className="section-title">
      Request A Free Evaluation
    </h2>

    <div
      style={{
        width: "60px",
        height: "3px",
        background: "var(--accent)",
        margin: "8px auto 25px",
        borderRadius: "999px",
      }}
    />

    <div
      className="mobile-stack"
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr .8fr",
        gap: "50px",
        alignItems: "start",
      }}
    >

      {/* LEFT SIDE */}

      <div>

        <form
          onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}
          style={{ display: "grid", gap: "15px" }}
          noValidate
        >
          {/* Honeypot — hidden from real users, bots fill it in */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          {/* ROW 1 */}
          <div className="form-row">
            <input
              name="name"
              placeholder="Your Name *"
              value={form.name}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
            />
            <input
              name="company"
              placeholder="Company / Property Name *"
              value={form.company}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          {/* ROW 2 */}
          <div className="form-row">
            <input
              name="address"
              placeholder="Property Address *"
              value={form.address}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
            />
            <input
              name="phone"
              placeholder="Phone Number *"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          {/* ROW 3 */}
          <input
            name="email"
            placeholder="Email Address *"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={status === "loading" || status === "success"}
          />

          {/* ROW 4 */}
          <textarea
            name="details"
            placeholder="Additional Details (Optional)"
            rows={6}
            value={form.details}
            onChange={handleChange}
            disabled={status === "loading" || status === "success"}
          />

          {/* Validation errors */}
          {errors.length > 0 && (
            <ul
              style={{
                background: "rgba(200,60,60,.15)",
                border: "1px solid rgba(200,60,60,.4)",
                borderRadius: "8px",
                padding: "14px 18px",
                margin: 0,
                listStyle: "none",
              }}
            >
              {errors.map((err) => (
                <li
                  key={err}
                  style={{ color: "#f87171", fontSize: "14px", marginBottom: "4px" }}
                >
                  {err}
                </li>
              ))}
            </ul>
          )}

          {/* Success message */}
          {status === "success" && (
            <div
              style={{
                background: "rgba(60,180,60,.15)",
                border: "1px solid rgba(60,180,60,.4)",
                borderRadius: "8px",
                padding: "18px 20px",
                color: "#86efac",
                fontSize: "16px",
                lineHeight: "1.7",
                textAlign: "center",
              }}
            >
              Thank you for contacting GumGone Pros. We&apos;ve received your
              request and will reach out shortly.
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading" || status === "success"}
            style={{ opacity: status === "loading" || status === "success" ? 0.7 : 1 }}
          >
            {status === "loading" ? "SENDING..." : "REQUEST FREE EVALUATION"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "rgba(255,255,255,.6)",
              marginTop: "5px",
            }}
          >
            🔒 Your information is secure and will never be shared.
          </p>
        </form>

      </div>

      {/* RIGHT SIDE */}
<div
  className="contact-info-right"
  style={{
    borderLeft: "1px solid rgba(255,255,255,.12)",
    paddingLeft: "60px",
  }}
>

  {/* CALL */}
  <div
    style={{
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      marginBottom: "45px",
    }}
  >
    <div
      style={{
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        border: "2px solid var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Phone size={34} color="var(--accent)" />
    </div>

    <div>
      <h3
        style={{
          color: "var(--accent)",
          marginBottom: "12px",
        }}
      >
        CONTACT US
      </h3>

      <p
  style={{
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "rgba(255,255,255,.75)",
  }}
>
  (804) 600-3461
</p>

      <p
        style={{
          color: "rgba(255,255,255,.7)",
        }}
      >
        info@gumgonepros.com
      </p>
    </div>
  </div>

  <div
    style={{
      borderTop: "1px solid rgba(255,255,255,.08)",
      paddingTop: "35px",
      marginBottom: "45px",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          border: "2px solid var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <MapPin size={34} color="var(--accent)" />
      </div>

      <div>
        <h3
          style={{
            color: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          PROUDLY SERVING
        </h3>

        <p className="service-areas">
  Richmond • Chesterfield<br />
  Henrico • Midlothian<br />
  Mechanicsville • Short Pump • <br />
  And Surrounding Counties
</p>
      </div>
    </div>
  </div>

  <div
    style={{
      borderTop: "1px solid rgba(255,255,255,.08)",
      paddingTop: "35px",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          border: "2px solid var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ShieldCheck size={34} color="var(--accent)" />
      </div>

      <div>
        <h3
          style={{
            color: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          RESULTS DRIVEN
        </h3>

        <p style={{ lineHeight: "1.8" }}>
          If gum's not gone... <br />
          we come back. <br />
          No questions asked.
        </p>
      </div>
    </div>
  </div>

</div>

    </div>

    {/* FOOTER */}

    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        color: "rgba(255,255,255,.55)",
        lineHeight: "1.7",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "-20px",
  }}
>
  <Image
    src="/images/logo.png"
    alt="GumGone Pros"
    width={200}
    height={58}
    style={{
      opacity: 0.95,
    }}
  />
</div>

      <p style={{ marginBottom: "8px" }}>
        GumGone Pros is a registered trade name of
        Elevation Property Services LLC
      </p>

      <p>
        © 2026 GumGone Pros. All rights reserved.
      </p>

    </div>

  </div>
</section>
    </main>
  );
}