import { useState } from 'react'
import { DxConfigProvider, useLocale, useTheme } from '@dexa-ui/react'
import { en, tr } from '@dexa-ui/locales'
import { Buttons } from './Buttons'
import { intents, surfaces, swatchStyles, themeOptions } from '../../shared/demo'

const keys = ['close', 'clear', 'confirm', 'cancel', 'loading', 'noData']

function Messages() {
  const { t, locale } = useLocale()
  return (
    <section className="pg-section">
      <h2>Locale: {locale.name}</h2>
      <p>{keys.map((k) => t(`common.${k}`)).join(' · ')}</p>
    </section>
  )
}

export function App() {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState<'en' | 'tr'>('en')

  return (
    <DxConfigProvider locale={lang === 'tr' ? tr : en}>
      <main className="pg">
        <header className="pg-bar">
          <h1>dexa-ui · React</h1>
          <select value={theme} aria-label="Theme" onChange={(e) => setTheme(e.target.value)}>
            {themeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <select
            value={lang}
            aria-label="Language"
            onChange={(e) => setLang(e.target.value as 'en' | 'tr')}
          >
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </header>

        <Messages />

        <Buttons />

        <section className="pg-section">
          <h2>Intents</h2>
          <div className="pg-grid">
            {intents.map((intent) => {
              const s = swatchStyles(intent)
              return (
                <div key={intent} className="pg-swatch">
                  <div style={s.solid}>{intent}</div>
                  <div style={s.hover}>hover</div>
                  <div style={s.subtle}>subtle</div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="pg-section pg-surfaces">
          <h2>Surfaces</h2>
          <div className="pg-grid">
            {surfaces.map((s) => (
              <div key={s.name} style={s.style}>
                {s.name}
                <br />
                <small style={{ color: 'var(--dx-text-muted)' }}>muted text</small>
                <br />
                <small style={{ color: 'var(--dx-text-subtle)' }}>subtle text</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </DxConfigProvider>
  )
}
