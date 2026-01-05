export default function Hero() {
  return (
    <section id="top" className="section">
      <div className="container">
        <div className="grid heroGrid">
          <div>
            <div className="pill">
              <span className="badge-dot" />
              <span className="small">Secure • Real-time • Traceable</span>
            </div>

            <h1 className="h1">
              Pergudangan modern untuk{" "}
              <span style={{ color: "rgba(255,255,255,.98)" }}>operasi yang</span>{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, var(--blue), var(--orange))",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                rapi &amp; cepat
              </span>
              .
            </h1>

            <p className="p" style={{ maxWidth: 620 }}>
              PLI Bandung membantu perusahaan mengelola inbound–outbound, penyimpanan,
              picking, dan kontrol stok dengan standar operasional yang konsisten,
              audit-ready, dan mudah dipantau.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <a className="btn primary" href="#spreadsheets">
                Akses Spreadsheet
              </a>
              <a className="btn" href="#services">
                Lihat Layanan
              </a>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <div className="pill">
                <span className="small">✔ SOP-driven</span>
              </div>
              <div className="pill">
                <span className="small">✔ Cycle count support</span>
              </div>
              <div className="pill">
                <span className="small">✔ Reporting &amp; KPI</span>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: 18 }}>
            <div className="card">
              <div className="kicker">Operational Snapshot</div>
              <div style={{ marginTop: 12 }} className="grid">
                {[
                  { label: "Receiving", value: "Inbound control & QC" },
                  { label: "Storage", value: "Racking + zoning system" },
                  { label: "Dispatch", value: "On-time outbound" },
                  { label: "Visibility", value: "Daily & weekly dashboard" }
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                  >
                    <span className="badge-dot" style={{ marginTop: 6 }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.label}</div>
                      <div className="small">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="hr" style={{ margin: "16px 0" }} />

            <div className="card">
              <div className="kicker">Why PLI</div>
              <p className="p" style={{ marginTop: 8 }}>
                Fokus pada ketertiban data, traceability, dan kecepatan eksekusi —
                cocok untuk kebutuhan warehouse harian dan audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
