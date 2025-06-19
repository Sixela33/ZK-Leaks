import './globals.ts'

import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Loading } from '@/components/loading.tsx'

const LazyApp = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </StrictMode>,
)
