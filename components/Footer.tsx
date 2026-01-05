export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ padding: "24px 0 40px" }}>
      <div className="container">
        <hr className="hr" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 14,
            marginTop: 16,
            flexWrap: "wrap"
          }}
        >
          <div className="small">© {year} PLI Bandung • Warehouse & Logistics</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="small" href="#services">
              Services
            </a>
            <a className="small" href="#spreadsheets">
              Spreadsheets
            </a>
            <a className="small" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
