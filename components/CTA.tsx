export default function CTA() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="glass" style={{ padding: 18 }}>
          <div className="grid twoCol" style={{ alignItems: "center" }}>
            <div>
              <h2 className="h2">Siap rapikan akses & reporting warehouse?</h2>
              <p className="p" style={{ maxWidth: 680 }}>
                Pakai portal spreadsheet yang terstruktur + landing page yang profesional untuk komunikasi internal & eksternal.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
                <a className="btn primary" href="#spreadsheets">
                  Buka Portal
                </a>
                <a className="btn" href="#services">
                  Lihat Layanan
                </a>
              </div>
            </div>

            <div className="card">
              <div className="kicker">Contact Form (Dummy UI)</div>
              <p className="small" style={{ marginTop: 8 }}>
                Kalau kamu mau form ini benar-benar kirim email (mis. via Resend/SMTP), bilang ya.
              </p>
              <div style={{ marginTop: 12 }} className="grid">
                <input className="input" placeholder="Nama" aria-label="Nama" />
                <input className="input" placeholder="Email" aria-label="Email" />
                <input className="input" placeholder="Pesan singkat" aria-label="Pesan" />
                <button
                  className="btn orange"
                  type="button"
                  onClick={() => alert("Form demo. Belum terhubung ke email.")}
                >
                  Kirim (Demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
