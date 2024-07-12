import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
// customized a Hook for fetching videos data
const useAppwrite = (fn) => {
  // videos data 
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
   
  const fetchVideos = async () => {
    setIsLoading(true)
    try { 
      const videos = await fn()
      setData(videos) 
    } catch (e) {
      Alert.alert('Error-useAppwrite', e.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const refetch = () => fetchVideos()

  return { data, isLoading, refetch }
}

export default useAppwrite
