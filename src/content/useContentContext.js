import { useContext } from 'react'
import ContentContext from './contentContext'

export function useContentContext() {
  const context = useContext(ContentContext)

  if (!context) {
    throw new Error(
      'useContentContext debe utilizarse dentro de ContentProvider'
    )
  }

  return context
}