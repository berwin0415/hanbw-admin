import React, { Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'

const Bundle = (loader) => {
  const Component = React.lazy(loader)
  const WrapComponent = (props) => {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    )
  }
  return WrapComponent
}

export default Bundle
