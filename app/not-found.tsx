'use client'  // ← обязательно, чтобы избежать prerendering проблем

export default function NotFound() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find that page.</p>
    </div>
  )
}
