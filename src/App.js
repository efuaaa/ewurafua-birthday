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
};

// ── Airtable config ──────────────────────────────────────────────
const AIRTABLE_TOKEN = "patJkHWMEnFsd2DQZ.cc7ebde64a58ee58ec34254a46c2163e9198e1b378476bb0801f8940d6e46aa6";
const BASE_ID = "appvLB6VVZ9eXXs2Q";
const TABLE_ID = "tbl8cHy86VYtzgvfZ";
const AT_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
const AT_HEADERS = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  "Content-Type": "application/json",
};

async function fetchRSVPs() {
  const res = await fetch(`${AT_URL}?sort[0][field]=Timestamp&sort[0][direction]=desc`, {
    headers: AT_HEADERS,
  });
  const data = await res.json();
  return (data.records || []).map((r) => ({
    id: r.id,
    name: r.fields.Name || "",
    attending: r.fields.Attending === true,
    timestamp: r.fields.Timestamp || "",
  }));
}

async function submitRSVP(name, attending) {
  const res = await fetch(AT_URL, {
    method: "POST",
    headers: AT_HEADERS,
    body: JSON.stringify({
      records: [
        {
          fields: {
            Name: name,
            Attending: attending,
            Timestamp: new Date().toISOString(),
          },
        },
      ],
    }),
  });
  if (!res.ok) throw new Error("Airtable error");
  return res.json();
}

// ── Shared UI ────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${COLORS.gold})` }} />
      <span style={{ color: COLORS.gold, fontSize: 18 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${COLORS.gold})` }} />
    </div>
  );
}

// ── Invite page ──────────────────────────────────────────────────
function InvitePage({ onRSVP }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.cream,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ width: "100%", maxWidth: 480, height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "2px 2px 0 0" }} />

      <div style={{
        width: "100%", maxWidth: 480,
        background: "#fff",
        border: `1px solid ${COLORS.darkCream}`,
        borderTop: "none",
        padding: "48px 40px 40px",
        boxShadow: "0 8px 40px rgba(107,26,42,0.10)",
        position: "relative",
        overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", top: 12, left: 12, opacity: 0.18 }} width="48" height="48" viewBox="0 0 48 48">
          <path d="M4 4 Q4 44 44 44" stroke={COLORS.burgundy} strokeWidth="1.5" fill="none" />
          <path d="M4 4 Q24 4 24 24" stroke={COLORS.orange} strokeWidth="1.2" fill="none" />
        </svg>
        <svg style={{ position: "absolute", bottom: 12, right: 12, opacity: 0.18, transform: "rotate(180deg)" }} width="48" height="48" viewBox="0 0 48 48">
          <path d="M4 4 Q4 44 44 44" stroke={COLORS.burgundy} strokeWidth="1.5" fill="none" />
          <path d="M4 4 Q24 4 24 24" stroke={COLORS.orange} strokeWidth="1.2" fill="none" />
        </svg>

        <p style={{ textAlign: "center", margin: "0 0 8px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange }}>
          Save the Date
        </p>
        <h1 style={{ textAlign: "center", margin: "0 0 4px", fontSize: "clamp(32px, 8vw, 52px)", fontWeight: 400, color: COLORS.burgundy, lineHeight: 1.1 }}>
          Ewurafua
        </h1>
        <p style={{ textAlign: "center", margin: "0 0 4px", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted }}>
          is celebrating her birthday
        </p>

        <Divider />

        <div style={{
          background: `linear-gradient(135deg, ${COLORS.deepBurgundy} 0%, ${COLORS.burgundy} 60%, ${COLORS.orange} 100%)`,
          borderRadius: 2, padding: "28px 32px", margin: "0 0 24px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
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
          Mark your calendars — full details to follow.<br />Your presence would mean the world.
        </p>

        <Divider />

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, margin: "0 0 14px" }}>
            Kindly indicate attendance
          </p>
          <button
            onClick={onRSVP}
            style={{
              background: `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})`,
              color: "#fff", border: "none", padding: "14px 40px", fontSize: 13,
              letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Georgia",
              cursor: "pointer", borderRadius: 1, boxShadow: `0 4px 20px rgba(107,26,42,0.25)`,
            }}
          >
            RSVP Now
          </button>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 480, height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "0 0 2px 2px" }} />
    </div>
  );
}

// ── RSVP page ────────────────────────────────────────────────────
function RSVPPage({ onBack }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRSVPs()
      .then(setRsvps)
      .catch(() => setError("Couldn't load responses."))
      .finally(() => setLoading(false));
  }, []);

  const attending_count = rsvps.filter((r) => r.attending).length;
  const declined_count = rsvps.filter((r) => !r.attending).length;

  async function handleSubmit() {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (attending === null) { setError("Please select whether you'll attend."); return; }
    setError("");
    setSaving(true);
    try {
      await submitRSVP(name.trim(), attending);
      const updated = await fetchRSVPs();
      setRsvps(updated);
      setSubmitted(true);
    } catch (e) {
      setError("Couldn't save your response. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "12px 14px",
    border: `1px solid ${COLORS.darkCream}`, borderRadius: 2,
    fontFamily: "Georgia", fontSize: 14, color: COLORS.text,
    background: COLORS.cream, outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "Georgia, serif" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ height: 4, background: `linear-gradient(to right, ${COLORS.burgundy}, ${COLORS.orange}, ${COLORS.burgundy})`, borderRadius: "2px 2px 0 0" }} />

        <div style={{ background: "#fff", border: `1px solid ${COLORS.darkCream}`, borderTop: "none", padding: "40px 36px", boxShadow: "0 8px 40px rgba(107,26,42,0.10)" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted, fontFamily: "Georgia", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", padding: 0, marginBottom: 24 }}>
            ← Back to Invitation
          </button>

          <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.orange, textAlign: "center" }}>RSVP</p>
          <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 400, color: COLORS.burgundy, textAlign: "center" }}>Will you join us?</h2>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: COLORS.muted, textAlign: "center", fontStyle: "italic" }}>6th July · 6:30 PM · London</p>

          <Divider />

          {loading ? (
            <p style={{ textAlign: "center", color: COLORS.muted, fontStyle: "italic", fontSize: 13 }}>Loading responses…</p>
          ) : (
              <div style={{ display: "flex", gap: 12, margin: "20px 0 28px", justifyContent: "center" }}>
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
                {attending ? "Your spot is noted. Full details coming soon." : `Thanks for letting us know, ${name}.`}
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
                        flex: 1, padding: "12px 0",
                        border: `1px solid ${attending === val ? COLORS.burgundy : COLORS.darkCream}`,
                        borderRadius: 2,
                        background: attending === val ? `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})` : "#fff",
                        color: attending === val ? "#fff" : COLORS.muted,
                        fontFamily: "Georgia", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
                      }}>
                        {val ? "Joyfully Accept" : "Regretfully Decline"}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p style={{ color: COLORS.orange, fontSize: 13, fontStyle: "italic", margin: "0 0 14px" }}>{error}</p>}

                <button onClick={handleSubmit} disabled={saving} style={{
                  width: "100%", padding: "14px",
                  background: saving ? COLORS.muted : `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.orange})`,
                  color: "#fff", border: "none", borderRadius: 1,
                  fontFamily: "Georgia", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
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

export default function App() {
  const [page, setPage] = useState("invite");
  return page === "invite"
    ? <InvitePage onRSVP={() => setPage("rsvp")} />
    : <RSVPPage onBack={() => setPage("invite")} />;
}
