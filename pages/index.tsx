import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import Bridge from '../components/Icons/Bridge'
import Modal from '../components/Modal'
import getResults from '../utils/cachedImages'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  // Intersection Observer for fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.fade-in-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [images])

  // Back to top scroll listener
  useEffect(() => {
    let lastShowState = false
    const handleScroll = () => {
      const shouldShow = window.scrollY > 600
      if (shouldShow !== lastShowState) {
        if (shouldShow) {
          setIsHiding(false)
          setShowBackToTop(true)
        } else {
          setIsHiding(true)
          setTimeout(() => {
            setShowBackToTop(false)
            setIsHiding(false)
          }, 300)
        }
        lastShowState = shouldShow
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <Head>
        <title>Sankalp Sharma — Photography</title>
        <meta
          property="og:image"
          content="https://sankalpsharma-gallery.vercel.app/og-image.jpg"
        />
        <meta
          name="twitter:image"
          content="https://sankalpsharma-gallery.vercel.app/og-image.jpg"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {/* ===== Hero Card ===== */}
          <div className="hero-card relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 rounded-2xl px-6 pb-16 pt-64 text-center text-white shadow-highlight lg:pt-0">
            {/* Background art */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black" />
            </div>

            {/* Decorative glow orbs */}
            <div
              className="hero-glow"
              style={{
                top: '10%',
                left: '15%',
                background: 'rgba(139, 92, 246, 0.5)',
              }}
            />
            <div
              className="hero-glow"
              style={{
                bottom: '20%',
                right: '10%',
                background: 'rgba(59, 130, 246, 0.4)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                Photography Portfolio
              </p>
              <h1 className="text-2xl font-bold uppercase tracking-widest sm:text-3xl">
                Sankalp Sharma
              </h1>
              <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <p className="max-w-[40ch] text-sm leading-relaxed text-white/60 sm:max-w-[32ch]">
                My incredible life and the moments I have captured along
                the way.
              </p>

              {/* Photo count badge */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909-4.97-4.969a.75.75 0 00-1.06 0L2.5 11.06z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  {images.length} photos
                </span>
              </div>

              <a
                className="cta-button z-10 mt-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
                href="https://sankalpsharma-blog.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visit Blog →
              </a>
            </div>
          </div>

          {/* ===== Gallery Grid ===== */}
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="fade-in-on-scroll gallery-card after:content group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:shadow-highlight"
            >
              <Image
                alt={`Photo ${id + 1} by Sankalp Sharma`}
                className="transform rounded-xl brightness-90 transition-all duration-500 will-change-auto group-hover:brightness-110 group-hover:saturate-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>

      {/* ===== Back to Top ===== */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`back-to-top ${isHiding ? 'hiding' : ''}`}
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* ===== Footer ===== */}
      <footer className="px-6 pb-10 pt-6 sm:px-12">
        <div className="footer-divider mx-auto mb-8 max-w-xl" />
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-white/50">
            All photos captured & curated by
          </p>
          <a
            href="https://sankalpsharma.vercel.app/"
            target="_blank"
            className="group flex items-center gap-2 text-base font-semibold text-white/80 transition-colors hover:text-white"
            rel="noreferrer"
          >
            <span className="inline-block h-6 w-6 overflow-hidden rounded-full bg-white/10 ring-2 ring-white/10 transition-all group-hover:ring-white/30">
              <img
                src="https://github.com/sankalpsharmaofficial.png"
                alt="Sankalp Sharma"
                className="h-full w-full object-cover"
              />
            </span>
            Sankalp Sharma
          </a>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await getResults()

  const reducedResults: ImageProps[] = results.resources.map(
    (result: any, i: number) => ({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
  )

  const imagesWithBlurDataUrls = await Promise.all(
    reducedResults.map((image: ImageProps) => getBase64ImageUrl(image))
  )

  reducedResults.forEach((img, i) => {
    img.blurDataUrl = imagesWithBlurDataUrls[i]
  })

  return {
    props: {
      images: reducedResults,
    },
  }
}
