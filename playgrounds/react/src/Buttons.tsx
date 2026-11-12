import { useState } from 'react'
import { DxButton, DxButtonGroup } from '@dexa-ui/react'
import { buttonVariants, intents, sizes } from '../../shared/demo'

export function Buttons() {
  const [loading, setLoading] = useState(false)
  const save = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <section className="pg-section">
      <h2>Buttons</h2>
      {buttonVariants.map((variant) => (
        <div key={variant} className="pg-row">
          {intents.map((intent) => (
            <DxButton key={intent} intent={intent} variant={variant}>
              {intent}
            </DxButton>
          ))}
        </div>
      ))}
      <div className="pg-row">
        {sizes.map((size) => (
          <DxButton key={size} size={size}>
            Size {size}
          </DxButton>
        ))}
        <DxButton pill>Pill</DxButton>
        <DxButton iconOnly aria-label="Add">
          +
        </DxButton>
        <DxButton loading={loading} onClick={save} start="★">
          Save
        </DxButton>
        <DxButton disabled>Disabled</DxButton>
        <DxButton href="#" variant="outline" intent="secondary">
          Link
        </DxButton>
      </div>
      <div className="pg-row">
        <DxButtonGroup aria-label="Alignment" variant="outline" intent="secondary">
          <DxButton>Left</DxButton>
          <DxButton>Center</DxButton>
          <DxButton>Right</DxButton>
        </DxButtonGroup>
        <DxButtonGroup aria-label="Actions">
          <DxButton>One</DxButton>
          <DxButton>Two</DxButton>
          <DxButton>Three</DxButton>
        </DxButtonGroup>
        <DxButtonGroup dir="rtl" aria-label="RTL" variant="soft">
          <DxButton>يمين</DxButton>
          <DxButton>وسط</DxButton>
          <DxButton>يسار</DxButton>
        </DxButtonGroup>
        <DxButtonGroup vertical aria-label="Vertical" variant="outline" intent="secondary">
          <DxButton>Top</DxButton>
          <DxButton>Bottom</DxButton>
        </DxButtonGroup>
      </div>
    </section>
  )
}
