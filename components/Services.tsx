const services = [
  {
    title: "Inbound & QC",
    desc: "Penerimaan barang, pengecekan dokumen, QC visual, dan pencatatan terstandar."
  },
  {
    title: "Storage Management",
    desc: "Penataan lokasi (zoning), labeling, dan kontrol kapasitas penyimpanan."
  },
  {
    title: "Outbound & Dispatch",
    desc: "Picking/packing, verifikasi final, dan kesiapan pengiriman on schedule."
  },
  {
    title: "Stock Control",
    desc: "Cycle count, investigasi selisih, dan penguatan disiplin data stok."
  },
  {
    title: "KPI & Dashboard",
    desc: "Ringkasan performa (lead time, akurasi, backlog) untuk keputusan cepat."
  },
  {
    title: "Audit-ready Process",
    desc: "Dokumentasi proses dan jejak transaksi lebih rapi untuk kebutuhan audit."
  }
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="grid twoCol" style={{ alignItems: "end" }}>
          <div>
            <div className="pill">
              <span className="badge-dot" />
              <span className="small">Warehouse Services</span>
            </div>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Layanan yang siap untuk operasional harian
            </h2>
            <p className="p" style={{ maxWidth: 620 }}>
              Dibangun untuk flow kerja warehouse yang real: rapi, cepat, dan bisa diukur.
            </p>
          </div>
          <div className="glass" style={{ padding: 18 }}>
            <div className="kicker">Standar Eksekusi</div>
            <p className="p" style={{ marginTop: 8 }}>
              SOP yang konsisten, kontrol dokumen, dan pelaporan rutin agar operasional
              tetap stabil meskipun volume naik.
            </p>
          </div>
        </div>

        <div className="grid threeCol" style={{ marginTop: 18 }}>
          {services.map((s) => (
            <div key={s.title} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className="badge-dot" />
                <div style={{ fontWeight: 800 }}>{s.title}</div>
              </div>
              <p className="p" style={{ marginTop: 10 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
