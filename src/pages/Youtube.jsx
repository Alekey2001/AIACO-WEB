import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const MediaHandScene = lazy(() => import('../components/media/MediaHandScene'))
import FeaturedMusicScene from '../components/media/FeaturedMusicScene'
import MusicVideoCard from '../components/media/MusicVideoCard'
import AccountNavAction from '../components/account/AccountNavAction'
const musicVideos = [
  {
    videoId: 'zB9c220WHts',
    title: 'Historia de Amor',
    description:
      'Dos silencios que no sabían caminar, una historia de amor nunca contada',
    accent: 'cyan',
  },
  {
    videoId: '7-rG5zz14mU',
    title: 'Te quise de Mas.',
    description:
      'un amor que lo dio todo pero no recibio amor ',
    accent: 'purple',
  },
  {
    videoId: 'umAXmyWOXGY',
    title: 'Aun te llevo en Mi',
    description:
      'El dolor de un amor no Correspondido.',
    accent: 'purple',
  },
  {
    videoId: 'CqPmZ9Dv2EQ',
    title: 'aun te llevo en mi versión rock',
    description:
      'El dolor de un amor no Correspondido.',
    accent: 'cyan',
  },
]
export default function Youtube() {
    const navigate = useNavigate()
      const [isScrolled, setIsScrolled] = useState(false)
        const [featuredPlaying, setFeaturedPlaying] = useState(false)

  const featuredPlayerContainerRef = useRef(null)
  const featuredPlayerRef = useRef(null)
  const scrollToContent = () => {
    document
      .getElementById('media-content')
      ?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

    useEffect(() => {
    let mounted = true

    const createFeaturedPlayer = () => {
      if (!mounted) return
      if (!window.YT || !window.YT.Player) return
      if (!featuredPlayerContainerRef.current) return

      if (featuredPlayerRef.current) return

      featuredPlayerRef.current = new window.YT.Player(
        featuredPlayerContainerRef.current,
        {
          videoId: 'AAiI-TKrmSE',

          playerVars: {
            rel: 0,
            playsinline: 1,
          },

          events: {
            onStateChange: event => {
              if (!mounted) return

              if (
                event.data === window.YT.PlayerState.PLAYING
              ) {
                setFeaturedPlaying(true)
              } else {
                setFeaturedPlaying(false)
              }
            },
          },
        }
      )
    }

    if (window.YT && window.YT.Player) {
      createFeaturedPlayer()
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )

      if (!existingScript) {
        const script = document.createElement('script')

        script.src =
          'https://www.youtube.com/iframe_api'

        script.async = true

        document.body.appendChild(script)
      }

      const previousCallback =
        window.onYouTubeIframeAPIReady

      window.onYouTubeIframeAPIReady = () => {
        if (
          typeof previousCallback === 'function'
        ) {
          previousCallback()
        }

        createFeaturedPlayer()
      }
    }

    return () => {
      mounted = false
      setFeaturedPlaying(false)

      if (
        featuredPlayerRef.current &&
        typeof featuredPlayerRef.current.destroy ===
          'function'
      ) {
        featuredPlayerRef.current.destroy()
      }

      featuredPlayerRef.current = null
    }
  }, [])
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050507',
        color: '#ffffff',
        overflowX: 'hidden',
      }}
    >

    {/* ── HERO AIACO MEDIA ── */}
<section
  className="relative min-h-screen flex items-center justify-center overflow-hidden"
  style={{
    background:
      'radial-gradient(circle at 50% 45%, rgba(8,28,54,0.95) 0%, rgba(5,12,24,0.92) 38%, rgba(3,6,12,1) 78%), #03060c',
  }}
>

  {/* ── NAVBAR PROPIO DE AIACO MEDIA ── */}
<nav
  className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  style={{
    background: isScrolled
      ? 'rgba(3,6,12,0.78)'
      : 'transparent',

    backdropFilter: isScrolled
      ? 'blur(22px)'
      : 'none',

    WebkitBackdropFilter: isScrolled
      ? 'blur(22px)'
      : 'none',

    borderBottom: isScrolled
      ? '1px solid rgba(255,255,255,0.07)'
      : '1px solid transparent',

    boxShadow: isScrolled
      ? '0 8px 30px rgba(0,0,0,0.28)'
      : 'none',
  }}
>
  <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">

    {/* Logo / identidad */}
    <button
      onClick={() => navigate('/')}
      className="transition-all duration-300"
      style={{
        background: 'transparent',
        border: 'none',
        color: '#ffffff',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        letterSpacing: '0.18em',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#00eefc'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#ffffff'
      }}
    >
      AIACO // MEDIA
    </button>

    {/* Navegación */}
    <div className="flex items-center gap-5 md:gap-8">

      <button
        onClick={scrollToContent}
        className="transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.65)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#00eefc'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
        }}
      >
        Videos
      </button>

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.65)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#ecb2ff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
        }}
      >
        <ArrowLeft size={15} strokeWidth={1.7} />
        Regresar
      </button>
{/* Cuenta / Avatar */}
<AccountNavAction />
    </div>

  </div>
    <div
    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-all duration-500"
    style={{
      opacity: isScrolled ? 1 : 0,
      background:
        'linear-gradient(90deg, transparent 0%, rgba(189,0,255,0.35) 25%, rgba(0,238,252,0.45) 50%, rgba(189,0,255,0.35) 75%, transparent 100%)',
      boxShadow: isScrolled
        ? '0 0 12px rgba(0,238,252,0.22)'
        : 'none',
    }}
  />
</nav>

  {/* ── FONDO DEEP NAVY ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        linear-gradient(
          180deg,
          rgba(2,6,14,0.15) 0%,
          rgba(2,7,16,0.30) 45%,
          rgba(2,5,12,0.65) 100%
        )
      `,
      zIndex: 0,
    }}
  />


  {/* ── GRID TECNOLÓGICO SUTIL ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: '72px 72px',
      maskImage:
        'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.85) 45%, transparent 82%)',
      WebkitMaskImage:
        'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.85) 45%, transparent 82%)',
      opacity: 0.7,
      zIndex: 0,
    }}
  />


  {/* ── GLOW CYAN ── */}
  <div
    className="absolute pointer-events-none"
    style={{
      width: 650,
      height: 650,
      top: '10%',
      right: '-10%',
      borderRadius: '50%',
      background: '#00eefc',
      filter: 'blur(190px)',
      opacity: 0.07,
      zIndex: 0,
    }}
  />


  {/* ── GLOW PÚRPURA ── */}
  <div
    className="absolute pointer-events-none"
    style={{
      width: 620,
      height: 620,
      bottom: '-20%',
      left: '-12%',
      borderRadius: '50%',
      background: '#bd00ff',
      filter: 'blur(190px)',
      opacity: 0.07,
      zIndex: 0,
    }}
  />


  {/* ── LÍNEAS TÉCNICAS LATERALES ── */}
  <div
    className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 pointer-events-none"
    style={{
      width: 1,
      height: '42%',
      background:
        'linear-gradient(180deg, transparent, rgba(0,238,252,0.22), transparent)',
      opacity: 0.8,
      zIndex: 0,
    }}
  />

  <div
    className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none"
    style={{
      width: 1,
      height: '42%',
      background:
        'linear-gradient(180deg, transparent, rgba(189,0,255,0.22), transparent)',
      opacity: 0.8,
      zIndex: 0,
    }}
  />


  {/* ── MANO 3D ── */}
<div
  className="absolute inset-0"
  style={{
    zIndex: 1,
  }}
>
  <Suspense fallback={null}>
    <MediaHandScene />
  </Suspense>
</div>


  {/* ── CONTENIDO CENTRAL ── */}
  <div
    className="relative text-center px-6"
    style={{
      transform: 'translateY(-20px)',
      zIndex: 20,
      pointerEvents: 'auto',
    }}
  >
    <h1
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 'clamp(52px, 9vw, 118px)',
        fontWeight: 700,
        letterSpacing: '-0.055em',
        lineHeight: 0.95,
        color: '#ffffff',
        textShadow: '0 12px 50px rgba(0,0,0,0.45)',
      }}
    >
      AIACO MEDIA
    </h1>

    <button
      onClick={scrollToContent}
      className="mt-12 inline-flex flex-col items-center gap-2 transition-all duration-300"
      style={{
        background: 'transparent',
        border: 'none',
        color: 'rgba(255,255,255,0.65)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#00eefc'
        e.currentTarget.style.transform = 'translateY(4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <ChevronDown
        size={26}
        strokeWidth={1.6}
      />

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        Ver más
      </span>
    </button>
  </div>


  {/* ── LÍNEA INFERIOR ── */}
  <div
    className="absolute bottom-0 left-0 right-0 h-px"
    style={{
      background:
        'linear-gradient(90deg, transparent, rgba(0,238,252,0.25), rgba(189,0,255,0.25), transparent)',
      zIndex: 20,
    }}
  />

</section>


  {/* ── VIDEO DESTACADO ── */}
<section
  id="media-content"
  className="relative min-h-screen overflow-hidden flex items-center justify-center py-28 px-6"
  style={{
    background:
      'radial-gradient(circle at 50% 48%, #0b1a30 0%, #07111f 32%, #030811 70%, #02050a 100%)',
  }}
>

  {/* ── BASE DEEP NAVY ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        linear-gradient(
          180deg,
          rgba(4,10,20,0.25) 0%,
          rgba(3,9,18,0.35) 45%,
          rgba(2,6,13,0.75) 100%
        )
      `,
      zIndex: 0,
    }}
  />


  {/* ── GRID TÉCNICO ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(255,255,255,0.018) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255,255,255,0.018) 1px,
          transparent 1px
        )
      `,
      backgroundSize: '80px 80px',
      opacity: 0.75,

      maskImage:
        'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.7) 55%, transparent 90%)',

      WebkitMaskImage:
        'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.7) 55%, transparent 90%)',

      zIndex: 0,
    }}
  />


  {/* ── GLOW CENTRAL ── */}
  <div
    className="absolute pointer-events-none"
    style={{
      width: 900,
      height: 900,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',

      background:
        'radial-gradient(circle, rgba(0,238,252,0.12) 0%, rgba(0,100,180,0.055) 30%, transparent 68%)',

      filter: 'blur(40px)',
      zIndex: 0,
    }}
  />


  {/* ── GLOW PÚRPURA ── */}
  <div
    className="absolute pointer-events-none"
    style={{
      width: 550,
      height: 550,
      bottom: '-25%',
      left: '-10%',

      background: '#bd00ff',
      borderRadius: '50%',
      filter: 'blur(180px)',

      opacity: 0.07,
      zIndex: 0,
    }}
  />


{/* ── ESFERA 3D ── */}
<FeaturedMusicScene
  isPlaying={featuredPlaying}
/>

  {/* ── ELEMENTOS FLOTANTES ── */}

  <div
    className="absolute hidden md:block pointer-events-none"
    style={{
      top: '31%',
      left: '8%',
      zIndex: 3,
    }}
  >
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.25)',
      }}
    >
      NOW PLAYING
    </span>
  </div>


  <div
    className="absolute hidden md:block pointer-events-none"
    style={{
      top: '67%',
      right: '8%',
      zIndex: 3,
    }}
  >
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.22em',
        color: 'rgba(0,238,252,0.38)',
      }}
    >
      OFFICIAL VIDEO
    </span>
  </div>


  {/* ── CONTENIDO PRINCIPAL ── */}
  <div
    className="relative z-10 w-full max-w-6xl mx-auto text-center"
  >

    {/* TÍTULO DE SECCIÓN */}
    <h2
      className="font-bold mb-14"
      style={{
        fontFamily: "'Sora', sans-serif",

        fontSize:
          'clamp(36px, 5vw, 64px)',

        letterSpacing: '-0.045em',

        color: '#ffffff',

        textShadow:
          '0 10px 45px rgba(0,0,0,0.4)',
      }}
    >
      Video destacado
    </h2>


    {/* ── VIDEO ── */}
    <div
      className="relative mx-auto"
      style={{
        width: 'min(880px, 100%)',
        zIndex: 10,
      }}
    >

     {/* Glow del reproductor */}
<div
  className="absolute pointer-events-none"
  style={{
    inset: -35,

    background: featuredPlaying
      ? 'radial-gradient(ellipse at center, rgba(0,238,252,0.24), rgba(189,0,255,0.12) 48%, transparent 72%)'
      : 'radial-gradient(ellipse at center, rgba(0,238,252,0.13), rgba(189,0,255,0.055) 48%, transparent 72%)',

    filter: 'blur(25px)',

    opacity: featuredPlaying ? 1 : 0.7,

    transition:
      'opacity 500ms ease, background 500ms ease',

    zIndex: -1,
  }}
/>


      {/* Contenedor del reproductor */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '16 / 9',

          borderRadius: 22,

          background:
            'rgba(3,7,15,0.82)',

          border:
            '1px solid rgba(255,255,255,0.10)',

          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.06),
            0 0 45px rgba(0,238,252,0.08),
            0 30px 80px rgba(0,0,0,0.55)
          `,

          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter:
            'blur(15px)',
        }}
      >

      <div
  ref={featuredPlayerContainerRef}
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  }}
/>
      </div>
    </div>


    {/* ── INFORMACIÓN MUSICAL ── */}
    <div
      className="mt-10 mx-auto"
      style={{
        maxWidth: 650,
      }}
    >

      <h3
        style={{
          fontFamily:
            "'Sora', sans-serif",

          fontSize:
            'clamp(22px, 3vw, 32px)',

          fontWeight: 600,

          letterSpacing: '-0.025em',

          color: '#ffffff',
        }}
      >
        In the silence - AIACO Media
      </h3>


      <p
        className="mt-3"
        style={{
          fontFamily:
            "'Sora', sans-serif",

          fontSize: 14,

          lineHeight: 1.7,

          color:
            'rgba(255,255,255,0.42)',
        }}
      >
        Una cancion de un dolor que transmite lo que causa la soledad y la deprecion.
      </p>

    </div>

  </div>


  {/* ── LÍNEA INFERIOR ── */}
  <div
    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
    style={{
      background:
        'linear-gradient(90deg, transparent, rgba(0,238,252,0.20), rgba(189,0,255,0.18), transparent)',
    }}
  />

</section>
{/* ── VIDEOS AIACO ── */}
<section
  id="videos"
  className="relative py-28 px-6 md:px-12 overflow-hidden"
  style={{
    background:
      'linear-gradient(180deg, #02050a 0%, #06101d 50%, #02050a 100%)',
  }}
>
  {/* FONDO DEEP NAVY */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(
          circle at 18% 20%,
          rgba(189,0,255,0.06),
          transparent 34%
        ),
        radial-gradient(
          circle at 82% 76%,
          rgba(0,238,252,0.07),
          transparent 36%
        )
      `,
      zIndex: 0,
    }}
  />

  {/* GRID TÉCNICO */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(255,255,255,0.015) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255,255,255,0.015) 1px,
          transparent 1px
        )
      `,
      backgroundSize: '82px 82px',
      opacity: 0.65,
      zIndex: 0,
    }}
  />

  {/* GLOW CENTRAL */}
  <div
    className="absolute pointer-events-none"
    style={{
      width: 900,
      height: 900,
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background:
        'radial-gradient(circle, rgba(0,238,252,0.06) 0%, rgba(189,0,255,0.035) 38%, transparent 70%)',
      filter: 'blur(40px)',
      zIndex: 0,
    }}
  />

  <div
    className="relative z-10 max-w-7xl mx-auto"
  >
    {/* TÍTULO */}
    <div
      className="text-center mb-16"
    >
      <h2
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 'clamp(38px, 5vw, 64px)',
          fontWeight: 700,
          letterSpacing: '-0.045em',
          color: '#ffffff',
          textShadow: '0 12px 45px rgba(0,0,0,0.35)',
        }}
      >
        Videos AIACO
      </h2>
    </div>

    {/* GRID 2 x 2 */}
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-9"
    >
      {musicVideos.map((video, index) => (
        <MusicVideoCard
          key={index}
          videoId={video.videoId}
          title={video.title}
          description={video.description}
          accent={video.accent}
        />
      ))}
    </div>
  </div>

  {/* LÍNEA INFERIOR */}
  <div
    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
    style={{
      background:
        'linear-gradient(90deg, transparent, rgba(0,238,252,0.18), rgba(189,0,255,0.18), transparent)',
    }}
  />
</section>
    </div>
  )
}