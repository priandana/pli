type LinkItem = { name: string; href: string; note?: string };

const links: Record<"Umum" | "Finishgood" | "Material", LinkItem[]> = {
  Umum: [
    { name: "Dashboard Operasional (Harian)", href: "https://docs.google.com/spreadsheets/d/EXAMPLE_UMUM_1", note: "Ringkasan inbound/outbound & backlog" },
    { name: "Master Lokasi Warehouse", href: "https://docs.google.com/spreadsheets/d/EXAMPLE_UMUM_2", note: "Zoning, rack, bin, status" }
  ],
  Finishgood: [
    { name: "FG Stock Card", href: "https://docs.google.com/spreadsheets/d/EXAMPLE_FG_1", note: "Mutasi FG + traceability" },
    { name: "FG Outbound Plan", href: "https://docs.google.com/spreadsheets/d/EXAMPLE_FG_2", note: "Plan kirim & progress" }
  ],
  Material: [
    { name: "Material Receiving Log", href: "https://docs.google.com/spreadsheets/d/EXAMPLE_MAT_1", note: "Penerimaan & QC material" },
    { name: "Material Stock On Hand", href: "https://docs.google.com/spreadsheets/d/EXAMPLE_MAT_2", note: "SOH + safety stock" }
  ]
};

function CategoryCard({ title, items }: { title: keyof typeof links; items: LinkItem[] }) {
  return (
    <div className="glass" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div>
          <div className="kicker">{title}</div>
          <div className="small">Akses cepat ke spreadsheet kategori {title.toLowerCase()}.</div>
        </div>
        <span
          aria-hidden
          style={{
            width: 44,
            height: 44,
            borderRadius: 16,
            background:
              title === "Umum"
                ? "linear-gradient(135deg, rgba(37,99,235,.95), rgba(255,255,255,.08))"
                : title === "Finishgood"
                ? "linear-gradient(135deg, rgba(249,115,22,.85), rgba(37,99,235,.35))"
                : "linear-gradient(135deg, rgba(34,211,238,.50), rgba(249,115,22,.25))",
            border: "1px solid rgba(255,255,255,.12)"
          }}
        />
      </div>

      <div className="grid" style={{ marginTop: 14 }}>
        {items.map((it) => (
          <a
            key={it.name}
            className="card"
            href={it.href}
            target="_blank"
            rel="noreferrer"
            style={{ transition: "transform .15s ease, border-color .15s ease" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 800 }}>{it.name}</div>
              <span className="small">Open ↗</span>
            </div>
            {it.note ? <p className="p" style={{ marginTop: 8 }}>{it.note}</p> : null}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SpreadsheetHub() {
  return (
    <section id="spreadsheets" className="section">
      <div className="container">
        <div className="grid twoCol" style={{ alignItems: "end" }}>
          <div>
            <div className="pill">
              <span className="badge-dot" />
              <span className="small">Spreadsheet Portal</span>
            </div>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Akses semua spreadsheet, rapi per kategori
            </h2>
            <p className="p" style={{ maxWidth: 660 }}>
              Dipisahkan menjadi <b>Umum</b>, <b>Finishgood</b>, dan <b>Material</b> agar tim cepat menemukan file yang dibutuhkan.
            </p>
          </div>

          <div className="glass" style={{ padding: 18 }}>
            <div className="kicker">Pencarian cepat</div>
            <p className="small" style={{ marginTop: 8 }}>
              Tip: kalau mau sekalian ada search/filter realtime dan auth login, tinggal bilang—aku bisa upgrade.
            </p>
          </div>
        </div>

        <div className="grid threeCol" style={{ marginTop: 18 }}>
          <CategoryCard title="Umum" items={links.Umum} />
          <CategoryCard title="Finishgood" items={links.Finishgood} />
          <CategoryCard title="Material" items={links.Material} />
        </div>

        <div className="glass" style={{ padding: 18, marginTop: 18 }}>
          <div className="kicker">Catatan keamanan</div>
          <p className="p" style={{ marginTop: 8 }}>
            Pastikan spreadsheet kamu diset permission sesuai kebutuhan (view/edit). Untuk akses internal-only, gunakan link yang restricted ke domain/akun perusahaan.
          </p>
        </div>
      </div>
    </section>
  );
}
