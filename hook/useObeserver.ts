import { useEffect, useState } from "react"

interface useIntersectionObserverProps {
  root?: null; //null 이면 viewport
  rootMargin?: string;
  threshold?: number;
  target?: React.ReactHTML;
  onIntersect: IntersectionObserverCallback;
  enabled?: boolean | undefined;
}

const  useIntersectionObserver=({
    root,
    onIntersect,
    threshold = 1.0,
    rootMargin = '0px',
    enabled = true,
  }: useIntersectionObserverProps)=> {

    const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

    useEffect(() => {

      if (!target) return;
  
      const observer = new IntersectionObserver( onIntersect, {root, rootMargin, threshold})
      observer.observe(target);
       // target을 observer 통해 찾음. 찾으면 callback 함수(onIntersect를 실행)

      return ()=> observer.unobserve(target); //다시 찾지 않은 상태로 되돌림
    }, [target, enabled, root, threshold, rootMargin, onIntersect]) //ref 넣었을 때 문제 setState 넣어서 해결

    return {setTarget}
  }

  export default useIntersectionObserver;