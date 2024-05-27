import { useState, useEffect } from 'react'
import { getAllPosts } from './appwrite'
// customized a Hook for fetching videos data
const useAppwrite = () => {
  // videos data
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      try {
        const videos = await getAllPosts()
        setData(videos)
      } catch (e) {
        Alert.alert('Error', e.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const refetch = () => fetchVideos()

  return { data, isLoading, refetch }
}

export default useAppwrite
