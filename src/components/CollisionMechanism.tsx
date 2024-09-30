import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Explosion from './Explosion';

interface BeamOptions {
  initialX?: number;
  translateX?: number;
  duration?: number;
  repeatDelay?: number;
  delay?: number;
  className?: string;
  initialY?: string;
  rotate?: number;
  translateY?: string;
}

interface CollisionMechanismProps {
  parentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  beamOptions?: BeamOptions;
}

interface Coordinates {
  x: number;
  y: number;
}

interface CollisionState {
  detected: boolean;
  coordinates: Coordinates | null; // Allow coordinates to be null initially
}

const CollisionMechanism: React.FC<CollisionMechanismProps> = ({ parentRef, containerRef, beamOptions = {} }) => {
  const beamRef = useRef<HTMLDivElement>(null);
  
  // Explicitly define the type for collision
  const [collision, setCollision] = useState<CollisionState>({ detected: false, coordinates: null });
  const [beamKey, setBeamKey] = useState(0);

  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({ detected: true, coordinates: { x: relativeX, y: relativeY } });
        }
      }
    };

    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [containerRef]);

  useEffect(() => {
    if (collision.detected) {
      setTimeout(() => setCollision({ detected: false, coordinates: null }), 2000);
      setTimeout(() => setBeamKey(prev => prev + 1), 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{ translateY: beamOptions.initialY || "-200px", translateX: beamOptions.initialX || "0px" }}
        animate={{ translateY: beamOptions.translateY || "1800px", translateX: beamOptions.translateX || "0px" }}
        transition={{ duration: beamOptions.duration || 8, repeat: Infinity, ease: "linear", delay: beamOptions.delay || 0, repeatDelay: beamOptions.repeatDelay || 0 }}
        className={beamOptions.className || ""}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CollisionMechanism;
