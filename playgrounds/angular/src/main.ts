import { bootstrapApplication } from '@angular/platform-browser'
import { provideDexa } from '@dexa-ui/angular'
import { App } from './app/app'

bootstrapApplication(App, { providers: [provideDexa()] }).catch((error: unknown) =>
  console.error(error),
)
