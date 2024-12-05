import { LazyExoticComponent, Suspense } from 'react'

import { LoadingScreen } from '@/components'

const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => {
  const WrappedComponent = () => (
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  )

  WrappedComponent.displayName = `Loadable(${(Component as any).displayName || 'Component'})`

  return WrappedComponent
}

export default Loadable
