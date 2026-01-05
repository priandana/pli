const stats = [
  { title: "Accuracy", value: "99%+", desc: "Pencatatan & verifikasi bertahap" },
  { title: "Lead Time", value: "Fast", desc: "Alur inbound–outbound ringkas" },
  { title: "Traceability", value: "End-to-end", desc: "Jejak pergerakan barang terstruktur" },
  { title: "Reporting", value: "Daily", desc: "Ringkasan status operasional rutin" }
];

export default function Stats() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="grid fourCol">
          {stats.map((s) => (
            <div key={s.title} className="glass" style={{ padding: 18 }}>
              <div className="small">{s.title}</div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 850,
                  letterSpacing: "-.02em",
                  marginTop: 6
                }}
              >
                {s.value}
              </div>
              <div className="p" style={{ marginTop: 8 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
