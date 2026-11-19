import { DxIcon } from '@dexa-ui/react'
import { iconArrowRight, iconCheck, iconChevronRight, iconSpinner } from '@dexa-ui/icons'
import { allIcons, iconSizes, intents } from '../../shared/demo'

export function Icons() {
  return (
    <section className="pg-section">
      <h2>Icons</h2>
      <div className="pg-row">
        {iconSizes.map((size) => (
          <DxIcon key={size} icon={iconCheck} size={size} />
        ))}
        {intents.map((intent) => (
          <DxIcon key={intent} icon={iconCheck} size={24} color={`var(--dx-color-${intent})`} />
        ))}
        <DxIcon icon={iconSpinner} spin label="Loading" size={24} />
        <span>
          Inline <DxIcon icon={iconCheck} /> with text
        </span>
        <span dir="rtl">
          RTL <DxIcon icon={iconChevronRight} /> <DxIcon icon={iconArrowRight} />
        </span>
      </div>
      <div className="pg-icons">
        {allIcons.map((icon) => (
          <div key={icon.name} className="pg-icon">
            <DxIcon icon={icon} />
            {icon.name}
          </div>
        ))}
      </div>
    </section>
  )
}
