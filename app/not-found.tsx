'use client'

export default function NotFound() {
  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0' }}>404</h1>
      <p style={{ fontSize: '2rem', margin: '20px 0' }}>Page Not Found</p>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" style={{ color: '#00ff9d', textDecoration: 'underline', fontSize: '1.5rem' }}>
        Back to Home
      </a>
    </div>
  )
  export const dynamic = 'force-dynamic' // Только для этой страницы — отключает prerendering 404
  export const revalidate = 0 // Отключает кэширование
}
