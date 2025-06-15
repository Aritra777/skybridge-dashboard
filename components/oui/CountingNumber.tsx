import React, { useState, useEffect, useRef } from 'react';

interface CountingNumberProps {
  targetValue: number;
  duration?: number; // Optional: Animation duration in milliseconds, default to 2000
  suffix?: string;   // Optional: Text suffix to append (e.g., '%'), default to ''
}

const CountingNumber: React.FC<CountingNumberProps> = ({ targetValue, duration = 2000, suffix = '' }) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [hasIntersected, setHasIntersected] = useState<boolean>(false); // New state to track visibility
  const elementRef = useRef<HTMLDivElement>(null); // Ref to observe the element
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasIntersected(true); // Element is in view, set state to true
            observer.unobserve(entry.target); // Stop observing once it has intersected
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      observer.disconnect(); // Disconnect the observer completely
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // Only run the counting animation if 'hasIntersected' is true
    if (!hasIntersected) {
      setCurrentValue(0); // Reset or ensure it's 0 if not intersected yet
      return;
    }

    // Reset current value to 0 if the animation is restarted (e.g., targetValue changes)
    setCurrentValue(0);
    startTimeRef.current = null; // Reset start time for new animation

    const animateCount = (timestamp: DOMHighResTimeStamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      const easedProgress = percentage * (2 - percentage); // Ease-out effect

      const newValue = Math.floor(easedProgress * targetValue);
      setCurrentValue(newValue);

      if (percentage < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCount);
      } else {
        setCurrentValue(targetValue); // Ensure it lands exactly on targetValue
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateCount);

    // Cleanup: Cancel animation frame on unmount or when dependencies change
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasIntersected, targetValue, duration]); // Animation effect depends on hasIntersected

  // Format the number (e.g., add K for thousands)
  const formattedValue = (currentValue / 1000).toFixed(0) + 'K';

  return (
    <div ref={elementRef} className="text-3xl font-bold text-green-700">
      ${formattedValue}{suffix}
    </div>
  );
};

export default CountingNumber;