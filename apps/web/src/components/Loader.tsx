export function Loader() {
  return (
    <div className="loader-shell" aria-busy="true" aria-live="polite">
      <div className="loader-ring" />
      <style>{`
        .loader-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: var(--color-bg);
        }
        .loader-ring {
          width: 44px;
          height: 44px;
          border: 3px solid var(--color-ink);
          border-right-color: transparent;
          border-radius: 999px;
          animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
