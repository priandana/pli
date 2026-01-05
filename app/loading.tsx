export default function Loading() {
  return (
    <div className="loadingWrap">
      <div className="loadingCard">
        <div className="pill" style={{ marginBottom: 14 }}>
          <span className="badge-dot" />
          <span className="small">Initializing secure warehouse portal</span>
        </div>
        <h1 className="loadingTitle">PLI Bandung</h1>
        <p className="loadingSub">
          Menyiapkan tampilan &amp; memuat modul akses spreadsheet…
        </p>
        <div className="progress" aria-label="Loading">
          <div />
        </div>
        <p className="small" style={{ marginTop: 12 }}>
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
