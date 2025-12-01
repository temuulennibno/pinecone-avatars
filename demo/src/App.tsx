import { useState } from 'react'
import {
  Avatar,
  AvatarPicker,
  AvatarConfig,
  generateRandomConfig,
  generateSvg,
  generateBase64,
  downloadSvg,
  downloadPng,
} from 'pinecone-avatars'

function App() {
  const [config, setConfig] = useState<AvatarConfig>(generateRandomConfig())
  const [activeTab, setActiveTab] = useState<'picker' | 'random' | 'export'>('picker')

  const handleDownloadSvg = () => {
    downloadSvg(config, 'my-avatar.svg')
  }

  const handleDownloadPng = async () => {
    await downloadPng(config, 512, 'my-avatar.png')
  }

  const handleCopySvg = () => {
    const svg = generateSvg(config)
    navigator.clipboard.writeText(svg)
    alert('SVG copied to clipboard!')
  }

  const handleCopyBase64 = () => {
    const base64 = generateBase64(config)
    navigator.clipboard.writeText(base64)
    alert('Base64 copied to clipboard!')
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pinecone Avatars</h1>
        <p style={styles.subtitle}>A customizable React avatar picker library</p>
      </header>

      <nav style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'picker' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('picker')}
        >
          Avatar Picker
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'random' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('random')}
        >
          Random Avatars
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'export' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('export')}
        >
          Export
        </button>
      </nav>

      <main style={styles.main}>
        {activeTab === 'picker' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Customize Your Avatar</h2>
            <AvatarPicker value={config} onChange={setConfig} />
          </div>
        )}

        {activeTab === 'random' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Random Avatars</h2>
            <div style={styles.randomGrid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={styles.randomItem}>
                  <Avatar {...generateRandomConfig()} size={100} />
                </div>
              ))}
            </div>
            <button
              style={styles.button}
              onClick={() => window.location.reload()}
            >
              Regenerate All
            </button>
          </div>
        )}

        {activeTab === 'export' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Export Avatar</h2>

            <div style={styles.exportPreview}>
              <Avatar {...config} size={200} />
            </div>

            <div style={styles.exportButtons}>
              <button style={styles.button} onClick={handleDownloadSvg}>
                Download SVG
              </button>
              <button style={styles.button} onClick={handleDownloadPng}>
                Download PNG
              </button>
              <button style={styles.buttonSecondary} onClick={handleCopySvg}>
                Copy SVG
              </button>
              <button style={styles.buttonSecondary} onClick={handleCopyBase64}>
                Copy Base64
              </button>
            </div>

            <div style={styles.codeSection}>
              <h3 style={styles.codeTitle}>Current Config:</h3>
              <pre style={styles.code}>
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>

            <div style={styles.codeSection}>
              <h3 style={styles.codeTitle}>Usage:</h3>
              <pre style={styles.code}>
{`import { Avatar } from 'pinecone-avatars';

<Avatar
  background="${config.background}"
  skin="${config.skin}"
  tshirt="${config.tshirt}"
  expression="${config.expression}"
  hair="${config.hair}"
  size={200}
/>`}
              </pre>
            </div>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>
          Made with Pinecone Avatars |
          <a href="https://github.com/yourusername/pinecone-avatars" style={styles.link}> GitHub</a> |
          <a href="https://www.npmjs.com/package/pinecone-avatars" style={styles.link}> npm</a>
        </p>
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#fff',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    padding: '0 20px',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  tabActive: {
    background: '#fff',
    color: '#667eea',
  },
  main: {
    flex: 1,
    padding: '0 20px 40px',
  },
  card: {
    background: '#fff',
    borderRadius: '0 16px 16px 16px',
    padding: '32px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '24px',
    textAlign: 'center',
    color: '#333',
  },
  randomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  randomItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
    borderRadius: '12px',
    padding: '12px',
  },
  exportPreview: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
    padding: '24px',
    background: '#f5f5f5',
    borderRadius: '12px',
  },
  exportButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  button: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'transform 0.2s',
  },
  buttonSecondary: {
    padding: '12px 24px',
    border: '2px solid #667eea',
    borderRadius: '8px',
    background: '#fff',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
  },
  codeSection: {
    marginTop: '24px',
  },
  codeTitle: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#666',
  },
  code: {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '13px',
    overflow: 'auto',
    fontFamily: 'Monaco, Consolas, monospace',
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
  },
  link: {
    color: '#fff',
    textDecoration: 'underline',
  },
}

export default App
