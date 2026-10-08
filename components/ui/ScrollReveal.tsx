'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const targets = new Set<HTMLElement>()
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const target = entry.target as HTMLElement
          const siblings = Array.from(target.parentElement?.children ?? []).filter(
            (element): element is HTMLElement =>
              element instanceof HTMLElement && element.hasAttribute('data-reveal')
          )
          const position = siblings.indexOf(target)
          target.style.setProperty('--reveal-delay', `${Math.min(position, 5) * 65}ms`)
          target.dataset.revealed = 'true'
          revealObserver.unobserve(target)
          targets.delete(target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    const observeTargets = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((target) => {
        if (targets.has(target) || target.dataset.revealed === 'true') return
        targets.add(target)
        revealObserver.observe(target)
      })
    }

    document.body.classList.add('scroll-reveal-ready')
    observeTargets(document)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches('[data-reveal]')) {
            if (!targets.has(node) && node.dataset.revealed !== 'true') {
              targets.add(node)
              revealObserver.observe(node)
            }
          }
          observeTargets(node)
        })
      })
    })

    mutationObserver.observe(document.querySelector('main') ?? document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutationObserver.disconnect()
      revealObserver.disconnect()
      document.body.classList.remove('scroll-reveal-ready')
    }
  }, [])

  return null
}
