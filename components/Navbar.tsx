export default function Navbar() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, padding: "14px 0" }}>
      <div className="container">
        <div
          className="glass"
          style={{
            padding: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              aria-hidden
              style={{
                width: 38,
                height: 38,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, rgba(37,99,235,.95), rgba(249,115,22,.75))",
                boxShadow: "0 16px 40px rgba(0,0,0,.35)"
              }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 800, letterSpacing: "-.02em" }}>PLI Bandung</div>
              <div className="small">Warehouse &amp; Logistics</div>
            </div>
          </a>

          <nav
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end"
            }}
          >
            <a className="btn" href="#services">
              Services
            </a>
            <a className="btn" href="#spreadsheets">
              Spreadsheets
            </a>
            <a className="btn orange" href="#contact">
              Contact
            </a>
            <a className="btn primary" href="#spreadsheets">
              Open Portal
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
