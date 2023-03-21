import { useEffect } from "react"

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  target: any;
  onIntersect:any;
  enabled: boolean | undefined;
}

export default function useIntersectionObserver({
    root,
    target,
    onIntersect,
    threshold = 1.0,
    rootMargin = '0px',
    enabled = true,
  }: useIntersectionObserverProps) {
    useEffect(() => {
      if (!target) {
        return;
      }
  
      const observer = new IntersectionObserver(
        entries =>
          entries.forEach(entry => entry.isIntersecting && onIntersect()),
        {
          root: root,
          rootMargin,
          threshold,
        }
      )
  
      const el = target && target.current
  
      if (!el) {
        return
      }
  
      observer.observe(el)
  
      return () => {
        observer.unobserve(el)
      }
    }, [target, enabled, root, threshold, rootMargin, onIntersect])
  }
  