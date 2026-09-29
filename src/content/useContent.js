import { useContentContext } from './useContentContext'

export default function useContent(
  key,
  fallback = ''
) {
  const { getContent } = useContentContext()

  return getContent(
    key,
    fallback
  )
}