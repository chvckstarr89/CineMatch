import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react'

const videoClips = [
  { id: 1, name: 'Clip 1', src: '/videos/clip1.mp4' },
  { id: 2, name: 'Clip 2', src: '/videos/clip2.mp4' },
  { id: 3, name: 'Clip 3', src: '/videos/clip3.mp4' },
  { id: 4, name: 'Clip 4', src: '/videos/clip4.mp4' },
  { id: 5, name: 'Clip 5', src: '/videos/clip5.mp4' },
]

function App() {
  const [currentClip, setCurrentClip] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  const currentVideo = videoClips[currentClip]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      if (currentClip < videoClips.length - 1) {
        setCurrentClip(currentClip + 1)
      }
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('ended', handleEnded)
    }
  }, [currentClip])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch(console.error)
    } else {
      video.pause()
    }
  }, [isPlaying, currentClip])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
  }, [isMuted])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const nextClip = () => {
    if (currentClip < videoClips.length - 1) {
      setCurrentClip(currentClip + 1)
      setIsPlaying(false)
      setProgress(0)
    }
  }

  const prevClip = () => {
    if (currentClip > 0) {
      setCurrentClip(currentClip - 1)
      setIsPlaying(false)
      setProgress(0)
    }
  }

  const handleProgressClick = (e) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    video.currentTime = percentage * video.duration
    setProgress(percentage * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CineMatch
          </h1>
          <p className="text-gray-400">Local Prototype</p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden shadow-2xl mb-6">
            <div className="relative aspect-video bg-gray-950">
              <video
                ref={videoRef}
                src={currentVideo.src}
                className="w-full h-full object-contain"
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0
                    setProgress(0)
                  }
                }}
              />
              
              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevClip}
                    disabled={currentClip === 0}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous Clip"
                  >
                    <SkipBack size={24} />
                  </button>
                  
                  <button
                    onClick={togglePlayPause}
                    className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                  
                  <button
                    onClick={nextClip}
                    disabled={currentClip === videoClips.length - 1}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Next Clip"
                  >
                    <SkipForward size={24} />
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-4"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className="h-2 bg-gray-700 cursor-pointer hover:h-3 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Clip Selector */}
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Video Clips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {videoClips.map((clip, index) => (
                <button
                  key={clip.id}
                  onClick={() => {
                    setCurrentClip(index)
                    setIsPlaying(false)
                    setProgress(0)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentClip === index
                      ? 'border-blue-500 bg-blue-500/20 scale-105'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{clip.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {index === currentClip && isPlaying ? 'Playing' : index === currentClip ? 'Selected' : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Currently playing: <span className="text-white font-medium">{currentVideo.name}</span></p>
            <p className="mt-2">Clip {currentClip + 1} of {videoClips.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
