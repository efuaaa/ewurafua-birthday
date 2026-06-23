import { useState, useEffect } from "react";

const COLORS = {
  burgundy: "#6B1A2A",
  deepBurgundy: "#4A0F1C",
  orange: "#D4611A",
  gold: "#C8901A",
  cream: "#FDF6EE",
  darkCream: "#F5E8D8",
  text: "#2C1012",
  muted: "#8A6060",
  hotPink: "#FF1E8C",
  blush: "#F4A7B9",
};

const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN;
const BASE_ID = "appvLB6VVZ9eXXs2Q";
const TABLE_ID = "tbl8cHy86VYtzgvfZ";
const AT_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
const AT_HEADERS = { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" };

async function fetchRSVPs() {
  const res = await fetch(`${AT_URL}?sort[0][field]=Timestamp&sort[0][direction]=desc`, { headers: AT_HEADERS });
  const data = await res.json();
  return (data.records || []).map((r) => ({
    id: r.id, name: r.fields.Name || "", attending: r.fields.Attending === true, timestamp: r.fields.Timestamp || "",
  }));
}

async function submitRSVP(name, attending, dietary) {
  const res = await fetch(AT_URL, {
    method: "POST", headers: AT_HEADERS,
    body: JSON.stringify({ records: [{ fields: { Name: name, Attending: attending, Dietary: dietary || "None", Timestamp: new Date().toISOString() } }] }),
  });
  if (!res.ok) throw new Error("Airtable error");
  return res.json();
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${COLORS.gold})` }} />
      <span style={{ color: COLORS.gold, fontSize: 18 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${COLORS.gold})` }} />
    </div>
  );
}

function TopBar({ page, setPage }) {
  const pages = [
    { key: "invite", label: "Invite" },
    { key: "details", label: "Details" },
    { key: "rsvp", label: "RSVP" },
  ];
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,253,250,0.96)", backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${COLORS.darkCream}`,
      display: "flex", justifyContent: "center", gap: 0,
      padding: "0 20px",
    }}>
      {pages.map((p) => (
        <button key={p.key} onClick={() => setPage(p.key)} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "Georgia", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
          color: page === p.key ? COLORS.burgundy : COLORS.muted,
          padding: "16px 20px",
          borderBottom: page === p.key ? `2px solid ${COLORS.burgundy}` : "2px solid transparent",
          transition: "all 0.2s",
        }}>{p.label}</button>
      ))}
    </div>
  );
}

// ── INVITE PAGE ──────────────────────────────────────────────────
function InvitePage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 40px", fontFamily: "Georgia, serif" }}>
      <div style={{ width: "100%", maxWidth: 480, height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "2px 2px 0 0" }} />
      <div style={{ width: "100%", maxWidth: 480, background: "#fff", border: `1px solid ${COLORS.darkCream}`, borderTop: "none", padding: "48px 40px 40px", boxShadow: "0 8px 40px rgba(107,26,42,0.10)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", top: 12, left: 12, opacity: 0.18 }} width="48" height="48" viewBox="0 0 48 48">
          <path d="M4 4 Q4 44 44 44" stroke={COLORS.burgundy} strokeWidth="1.5" fill="none" />
          <path d="M4 4 Q24 4 24 24" stroke={COLORS.orange} strokeWidth="1.2" fill="none" />
        </svg>
        <svg style={{ position: "absolute", bottom: 12, right: 12, opacity: 0.18, transform: "rotate(180deg)" }} width="48" height="48" viewBox="0 0 48 48">
          <path d="M4 4 Q4 44 44 44" stroke={COLORS.burgundy} strokeWidth="1.5" fill="none" />
          <path d="M4 4 Q24 4 24 24" stroke={COLORS.orange} strokeWidth="1.2" fill="none" />
        </svg>

        <p style={{ textAlign: "center", margin: "0 0 8px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange }}>Save the Date</p>
        <h1 style={{ textAlign: "center", margin: "0 0 4px", fontSize: "clamp(32px, 8vw, 52px)", fontWeight: 400, color: COLORS.burgundy, lineHeight: 1.1 }}>Ewurafua</h1>
        <p style={{ textAlign: "center", margin: "0 0 4px", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted }}>is celebrating her birthday</p>

        <Divider />

        <div style={{ background: `linear-gradient(135deg, ${COLORS.deepBurgundy} 0%, ${COLORS.burgundy} 60%, ${COLORS.orange} 100%)`, borderRadius: 2, padding: "28px 32px", margin: "0 0 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "8px 8px" }} />
          <p style={{ margin: "0 0 2px", color: "rgba(255,255,255,0.65)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" }}>Monday</p>
          <p style={{ margin: "0 0 6px", fontSize: "clamp(42px, 12vw, 72px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
            6<span style={{ fontSize: "0.5em", verticalAlign: "super", color: COLORS.gold }}>th</span>
          </p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", fontSize: 16, letterSpacing: "0.15em", textTransform: "uppercase" }}>July 2026</p>
          <div style={{ width: 40, height: 1, background: COLORS.gold, margin: "14px auto" }} />
          <p style={{ margin: 0, color: "#fff", fontSize: 15, letterSpacing: "0.1em" }}>6:30 <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em" }}>PM</span></p>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>London</p>
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 28px", fontStyle: "italic" }}>
          Mark your calendars — full details below.<br />Your presence would mean the world.
        </p>

        <Divider />

        <div style={{ textAlign: "center", marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => setPage("details")} style={{ background: COLORS.darkCream, color: COLORS.burgundy, border: "none", padding: "14px 24px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Georgia", cursor: "pointer", borderRadius: 1 }}>
            View Details
          </button>
          <button onClick={() => setPage("rsvp")} style={{ background: `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})`, color: "#fff", border: "none", padding: "14px 24px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Georgia", cursor: "pointer", borderRadius: 1, boxShadow: `0 4px 20px rgba(107,26,42,0.25)` }}>
            RSVP Now
          </button>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 480, height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "0 0 2px 2px" }} />
    </div>
  );
}

// ── DETAILS PAGE ─────────────────────────────────────────────────
function DetailsPage({ setPage }) {
  const dressCodes = [
    { color: "#FF1E8C", label: "Hot Pink", emoji: "💗" },
    { color: "#F4A7B9", label: "Blush", emoji: "🌸" },
    { color: "#C41E3A", label: "Red", emoji: "❤️" },
    { color: "#6B1A2A", label: "Burgundy", emoji: "🍷" },
  ];

  const starters = [
    { name: "Deep-Fried Crispy Chicken", tags: ["Spicy", "Halal"] },
    { name: "Salt & Pepper Calamari", tags: ["Pescatarian"] },
    { name: "Grilled Chicken Dumplings", tags: ["Halal"] },
    { name: "Spring Rolls", tags: ["Vegetarian"] },
  ];

  const mains = [
    { name: "Prawns with Vermicelli in Garlic Sauce", tags: ["Pescatarian"] },
    { name: "Stir Fried Beef with Fresh Coriander", tags: ["Spicy", "Halal"] },
    { name: "Kung Pao Chicken", tags: ["Peanuts", "Spicy", "Halal"] },
    { name: "Spicy Roast Duck", tags: ["Spicy"] },
    { name: "Black Pepper Beef Udon Noodles", tags: ["Halal"] },
  ];

  const tagColor = (tag) => {
    if (tag === "Halal") return { bg: "#E8F5E9", color: "#2E7D32" };
    if (tag === "Vegetarian") return { bg: "#F3E5F5", color: "#6A1B9A" };
    if (tag === "Pescatarian") return { bg: "#E3F2FD", color: "#1565C0" };
    if (tag === "Spicy") return { bg: "#FFF3E0", color: "#E65100" };
    return { bg: COLORS.darkCream, color: COLORS.muted };
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, padding: "80px 20px 60px", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange, margin: "0 0 8px" }}>The Evening</p>
          <h2 style={{ fontSize: 32, fontWeight: 400, color: COLORS.burgundy, margin: "0 0 8px" }}>Event Details</h2>
          <p style={{ fontSize: 13, color: COLORS.muted, fontStyle: "italic", margin: 0 }}>Monday 6th July 2026 · 6:30 PM</p>
        </div>

        {/* Venue */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.darkCream}`, borderRadius: 2, padding: "28px 28px", marginBottom: 20, boxShadow: "0 4px 20px rgba(107,26,42,0.06)" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange, margin: "0 0 10px" }}>📍 Venue</p>
          <h3 style={{ fontSize: 22, fontWeight: 400, color: COLORS.burgundy, margin: "0 0 4px" }}>Glass Garden (和九丫)</h3>
          <p style={{ fontSize: 14, color: COLORS.muted, margin: "0 0 16px" }}>130 Southwark St, London SE1 0SW</p>
          <a href="https://maps.google.com/?q=130+Southwark+St+London+SE1+0SW" target="_blank" rel="noreferrer" style={{
            display: "inline-block", padding: "10px 20px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
            background: COLORS.darkCream, color: COLORS.burgundy, textDecoration: "none", borderRadius: 1, fontFamily: "Georgia",
          }}>
            View on Maps →
          </a>
        </div>

        {/* Menu */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.darkCream}`, borderRadius: 2, padding: "28px 28px", marginBottom: 20, boxShadow: "0 4px 20px rgba(107,26,42,0.06)" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange, margin: "0 0 10px" }}>🍽️ Menu</p>
          <h3 style={{ fontSize: 20, fontWeight: 400, color: COLORS.burgundy, margin: "0 0 4px" }}>3-Course Sharing Menu</h3>
          <p style={{ fontSize: 13, color: COLORS.muted, fontStyle: "italic", margin: "0 0 20px" }}>Chinese cuisine enjoyed together, sharing style</p>

          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, margin: "0 0 10px" }}>Starters</p>
          {starters.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.darkCream}` }}>
              <span style={{ fontSize: 14, color: COLORS.text, flex: 1 }}>{item.name}</span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", marginLeft: 8 }}>
                {item.tags.map(t => <span key={t} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, letterSpacing: "0.1em", textTransform: "uppercase", ...tagColor(t) }}>{t}</span>)}
              </div>
            </div>
          ))}

          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, margin: "18px 0 10px" }}>Mains</p>
          {mains.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "8px 0", borderBottom: i < mains.length - 1 ? `1px solid ${COLORS.darkCream}` : "none" }}>
              <span style={{ fontSize: 14, color: COLORS.text, flex: 1 }}>{item.name}</span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", marginLeft: 8 }}>
                {item.tags.map(t => <span key={t} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, letterSpacing: "0.1em", textTransform: "uppercase", ...tagColor(t) }}>{t}</span>)}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, padding: "12px 16px", background: COLORS.darkCream, borderRadius: 2 }}>
            <p style={{ fontSize: 12, color: COLORS.muted, margin: 0, fontStyle: "italic" }}>
              ⚠️ Please inform us of any allergies or dietary requirements at least 3 days before the event.
            </p>
          </div>
        </div>

        {/* Dress Code */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.darkCream}`, borderRadius: 2, padding: "28px 28px", marginBottom: 20, boxShadow: "0 4px 20px rgba(107,26,42,0.06)" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange, margin: "0 0 10px" }}>👗 Dress Code</p>
          <h3 style={{ fontSize: 22, fontWeight: 400, color: COLORS.burgundy, margin: "0 0 4px" }}>Red Carpet Chic</h3>
          <p style={{ fontSize: 14, color: COLORS.muted, fontStyle: "italic", margin: "0 0 20px" }}>Come dressed to impress. The colours of the night:</p>

          {/* Colour swatches */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {dressCodes.map((d) => (
              <div key={d.label} style={{ flex: "1 1 80px", textAlign: "center" }}>
                <div style={{ width: "100%", aspectRatio: "1", background: d.color, borderRadius: 2, marginBottom: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }} />
                <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.muted, margin: 0 }}>{d.label}</p>
              </div>
            ))}
          </div>

          {/* Dress code inspiration images */}
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, margin: "0 0 12px" }}>Style Inspiration</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80",
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
              "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=400&q=80",
              "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80",
            ].map((src, i) => (
              <div key={i} style={{ borderRadius: 2, overflow: "hidden", aspectRatio: "3/4", background: COLORS.darkCream }}>
                <img src={src} alt="Style inspiration" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* RSVP CTA */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontSize: 13, color: COLORS.muted, fontStyle: "italic", margin: "0 0 16px" }}>Kindly RSVP by 20th June</p>
          <button onClick={() => setPage("rsvp")} style={{
            background: `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})`,
            color: "#fff", border: "none", padding: "16px 48px", fontSize: 13,
            letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Georgia",
            cursor: "pointer", borderRadius: 1, boxShadow: `0 4px 20px rgba(107,26,42,0.25)`,
          }}>
            RSVP Now
          </button>
        </div>

      </div>
    </div>
  );
}

// ── RSVP PAGE ────────────────────────────────────────────────────
function RSVPPage({ setPage }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(null);
  const [dietary, setDietary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRSVPs().then(setRsvps).catch(() => { }).finally(() => setLoading(false));
  }, []);

  const attending_count = rsvps.filter((r) => r.attending).length;
  const declined_count = rsvps.filter((r) => !r.attending).length;

  async function handleSubmit() {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (attending === null) { setError("Please select whether you'll attend."); return; }
    setError(""); setSaving(true);
    try {
      await submitRSVP(name.trim(), attending, dietary.trim());
      const updated = await fetchRSVPs();
      setRsvps(updated); setSubmitted(true);
    } catch (e) {
      setError("Couldn't save your response. Please try again.");
    } finally { setSaving(false); }
  }

  const inputStyle = { width: "100%", padding: "12px 14px", border: `1px solid ${COLORS.darkCream}`, borderRadius: 2, fontFamily: "Georgia", fontSize: 14, color: COLORS.text, background: COLORS.cream, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 40px", fontFamily: "Georgia, serif" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "2px 2px 0 0" }} />
        <div style={{ background: "#fff", border: `1px solid ${COLORS.darkCream}`, borderTop: "none", padding: "40px 36px", boxShadow: "0 8px 40px rgba(107,26,42,0.10)" }}>

          <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange, textAlign: "center" }}>RSVP</p>
          <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 400, color: COLORS.burgundy, textAlign: "center" }}>Will you join us?</h2>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: COLORS.muted, textAlign: "center", fontStyle: "italic" }}>6th July · 6:30 PM · Glass Garden, London</p>
          <p style={{ margin: "0 0 20px", fontSize: 12, color: COLORS.orange, textAlign: "center", letterSpacing: "0.1em" }}>Kindly respond by 20th June</p>

          <Divider />

          {loading ? (
            <p style={{ textAlign: "center", color: COLORS.muted, fontStyle: "italic", fontSize: 13 }}>Loading…</p>
          ) : (
              <div style={{ display: "flex", gap: 12, margin: "20px 0 28px" }}>
                <div style={{ flex: 1, textAlign: "center", padding: "14px 10px", background: `linear-gradient(135deg, ${COLORS.deepBurgundy}, ${COLORS.burgundy})`, borderRadius: 2, color: "#fff" }}>
                  <div style={{ fontSize: 28, fontWeight: 400, lineHeight: 1 }}>{attending_count}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Attending</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "14px 10px", background: COLORS.darkCream, borderRadius: 2 }}>
                  <div style={{ fontSize: 28, fontWeight: 400, lineHeight: 1, color: COLORS.text }}>{declined_count}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, marginTop: 4 }}>Declined</div>
                </div>
              </div>
            )}

          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{attending ? "🥂" : "💌"}</div>
              <p style={{ fontSize: 18, color: COLORS.burgundy, margin: "0 0 8px" }}>{attending ? "We'll see you there!" : "We'll miss you!"}</p>
              <p style={{ fontSize: 13, color: COLORS.muted, fontStyle: "italic" }}>
                {attending ? "Your spot is noted. See you on the 6th! 🎉" : `Thanks for letting us know, ${name}.`}
              </p>
            </div>
          ) : (
              <div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 8 }}>Your Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" style={inputStyle} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 10 }}>Will you attend?</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[true, false].map((val) => (
                      <button key={String(val)} onClick={() => setAttending(val)} style={{
                        flex: 1, padding: "12px 0", border: `1px solid ${attending === val ? COLORS.burgundy : COLORS.darkCream}`, borderRadius: 2,
                        background: attending === val ? `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})` : "#fff",
                        color: attending === val ? "#fff" : COLORS.muted, fontFamily: "Georgia", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
                      }}>
                        {val ? "Joyfully Accept" : "Regretfully Decline"}
                      </button>
                    ))}
                  </div>
                </div>
                {attending && (
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 8 }}>
                      Dietary Requirements
                  </label>
                    <textarea
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="Any allergies or dietary needs? (e.g. vegetarian, nut allergy) — leave blank if none"
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                    />
                  </div>
                )}
                {error && <p style={{ color: COLORS.orange, fontSize: 13, fontStyle: "italic", margin: "0 0 14px" }}>{error}</p>}
                <button onClick={handleSubmit} disabled={saving} style={{
                  width: "100%", padding: "14px", background: saving ? COLORS.muted : `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})`,
                  color: "#fff", border: "none", borderRadius: 1, fontFamily: "Georgia", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: saving ? "not-allowed" : "pointer", boxShadow: `0 4px 20px rgba(107,26,42,0.2)`,
                }}>
                  {saving ? "Sending…" : "Send Response"}
                </button>
              </div>
            )}
        </div>
        <div style={{ height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "0 0 2px 2px" }} />
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("invite");
  return (
    <div>
      <TopBar page={page} setPage={setPage} />
      {page === "invite" && <InvitePage setPage={setPage} />}
      {page === "details" && <DetailsPage setPage={setPage} />}
      {page === "rsvp" && <RSVPPage setPage={setPage} />}
    </div>
  );
}
