import { useEffect, useRef, useState } from 'react'
import FeaturedMusicScene from './FeaturedMusicScene'

let youtubeApiPromise = null

function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT)
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise
  }

  youtubeApiPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    )

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true

      document.body.appendChild(script)
    }

    const previousCallback =
      window.onYouTubeIframeAPIReady

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') {
        previousCallback()
      }

      resolve(window.YT)
    }
  })

  return youtubeApiPromise
}

export default function MusicVideoCard({
  videoId,
  title,
  description,
  accent = 'cyan',
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playerContainerRef = useRef(null)
  const playerRef = useRef(null)

  const isCyan = accent === 'cyan'

  const accentColor = isCyan
    ? '#00eefc'
    : '#bd00ff'

  const glowColor = isCyan
    ? 'rgba(0,238,252,0.16)'
    : 'rgba(189,0,255,0.16)'

  useEffect(() => {
    let mounted = true

    loadYouTubeAPI().then((YT) => {
      if (!mounted) return
      if (!playerContainerRef.current) return

      playerRef.current = new YT.Player(
        playerContainerRef.current,
        {
          videoId,

          playerVars: {
            rel: 0,
            playsinline: 1,
          },

          events: {
            onStateChange: (event) => {
              if (!mounted) return

              const state = event.data

              if (state === YT.PlayerState.PLAYING) {
                setIsPlaying(true)
              } else {
                setIsPlaying(false)
              }
            },
          },
        }
      )
    })

    return () => {
      mounted = false
      setIsPlaying(false)

      if (
        playerRef.current &&
        typeof playerRef.current.destroy === 'function'
      ) {
        playerRef.current.destroy()
      }

      playerRef.current = null
    }
  }, [videoId])

  return (
    <article
      className="group relative overflow-hidden rounded-3xl transition-all duration-500"
      style={{
        background: `
          linear-gradient(
            145deg,
            rgba(255,255,255,0.035),
            rgba(255,255,255,0.01)
          )
        `,
        border: isPlaying
          ? `1px solid ${accentColor}55`
          : '1px solid rgba(255,255,255,0.07)',

        boxShadow: isPlaying
          ? `0 0 45px ${glowColor}, 0 28px 70px rgba(0,0,0,0.42)`
          : '0 22px 60px rgba(0,0,0,0.32)',

        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',

        transition:
          'transform 500ms ease, border-color 500ms ease, box-shadow 500ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          'translateY(-6px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          'translateY(0)'
      }}
    >
      {/* ESFERA / PARTÍCULAS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isPlaying ? 0.72 : 0.55,
          zIndex: 0,
          transition: 'opacity 500ms ease',
        }}
      >
        <FeaturedMusicScene
          isPlaying={isPlaying}
        />
      </div>

      {/* GLOW LOCAL */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 420,
          height: 420,
          top: -180,
          right: -140,
          borderRadius: '50%',
          background: accentColor,
          filter: 'blur(140px)',
          opacity: isPlaying ? 0.16 : 0.09,
          zIndex: 0,
          transition: 'opacity 500ms ease',
        }}
      />

      {/* CONTENIDO */}
      <div
        className="relative z-10 p-5 md:p-6"
      >
        {/* VIDEO */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '16 / 9',
            borderRadius: 18,
            background: '#02050a',

            border: isPlaying
              ? `1px solid ${accentColor}55`
              : '1px solid rgba(255,255,255,0.09)',

            boxShadow: isPlaying
              ? `
                  inset 0 1px 1px rgba(255,255,255,0.05),
                  0 0 30px ${glowColor},
                  0 24px 55px rgba(0,0,0,0.42)
                `
              : `
                  inset 0 1px 1px rgba(255,255,255,0.05),
                  0 24px 55px rgba(0,0,0,0.42)
                `,

            transition:
              'border-color 500ms ease, box-shadow 500ms ease',
          }}
        >
          <div
            ref={playerContainerRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* INFORMACIÓN */}
        <div
          className="pt-6"
        >
          <h3
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(20px, 2vw, 27px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            {title}
          </h3>

          <p
            className="mt-3"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 13,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.42)',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}