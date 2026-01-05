const items = [
  { name: "Supervisor Warehouse", quote: "Flow inbound/outbound jadi lebih tertib. Audit trail lebih gampang dicek." },
  { name: "Admin Inventory", quote: "Data stok lebih konsisten, dan pencarian file operasional jadi cepat." },
  { name: "PIC Dispatch", quote: "Outbound lebih on-track karena checklist dan reportingnya jelas." }
];

export default function Testimonials() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="grid twoCol" style={{ alignItems: "end" }}>
          <div>
            <h2 className="h2">Dipakai untuk operasional, bukan cuma tampilan</h2>
            <p className="p" style={{ maxWidth: 640 }}>
              Landing page ini dibuat fokus ke kebutuhan pergudangan: akses cepat, struktur jelas, dan nuansa profesional.
            </p>
          </div>
          <div className="pill" style={{ justifyContent: "flex-start" }}>
            <span className="badge-dot" />
            <span className="small">Blue–Orange Elegant Theme</span>
          </div>
        </div>

        <div className="grid threeCol" style={{ marginTop: 18 }}>
          {items.map((t) => (
            <div key={t.name} className="card">
              <div style={{ fontWeight: 800 }}>{t.name}</div>
              <p className="p" style={{ marginTop: 10 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
