import { useEffect, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, isVisible]);

  return (
    <div
      ref={setElement}
      className={`${className} ${
        isVisible ? "about-text-reveal" : "translate-y-8 opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
