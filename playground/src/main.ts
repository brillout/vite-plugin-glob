import './style.css'
import * as fixtures from '../../test/fixtures'

const app = document.querySelector<HTMLDivElement>('#app')!

const settled = Object.fromEntries(
  await Promise.all(Object.entries(fixtures)
    .map(async([key, value]) => {
      return [key, Object.fromEntries(
        await Promise.all(Object.entries(value)
          .map(async([k, v]) => [k, await (typeof v === 'function' ? v() : v)]),
        ),
      )]
    }),
  ),
)

app.innerHTML = `<pre>${JSON.stringify(settled, null, 2)}</pre>`
