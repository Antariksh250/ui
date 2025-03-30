"use client";

import React, { useEffect, useState } from "react";

interface CurtainAnimationProps {
  primaryColor?: string;
  secondaryColor?: string;
  height?: number;
  waveSpeed?: number;
  className?: string;
}

const CurtainAnimation: React.FC<CurtainAnimationProps> = ({
  primaryColor = "#ffffff",
  secondaryColor = "#3B82F6",
  height,
  waveSpeed = 8,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div
      className={`w-full overflow-hidden transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={height ? { height: `${height}px` } : undefined}
    >
      <svg
        viewBox="0 0 1200 350"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Enhanced gradient definitions */}
        <defs>
          <linearGradient
            id="curtainGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
            <stop offset="10%" stopColor={primaryColor} stopOpacity="0.5" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.8" />
            <stop offset="90%" stopColor={primaryColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="secondaryGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.1" />
            <stop offset="25%" stopColor={secondaryColor} stopOpacity="0.6" />
            <stop offset="75%" stopColor={secondaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background rectangle */}
        <rect x="0" y="0" width="1200" height="350" fill={primaryColor} />

        {/* Base wave layer - extra smooth */}
        {/* <path
          d="M0,0 C200,0 300,10 600,0 S1000,0 1200,0 V0 H0 Z"
          fill="url(#secondaryGradient)"
          opacity="0.1"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C200,0 300,10 600,0 S1000,0 1200,0 V0 H0 Z;
              M0,60 C200,30 300,80 600,40 S1000,70 1200,50 V0 H0 Z;
              M0,0 C200,0 300,10 600,0 S1000,0 1200,0 V0 H0 Z"
            dur={`${waveSpeed * 2.2}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
          />
        </path> */}

        {/* First main wave - with enhanced corner overflow */}
        {/* <path
          d="M0,0 C150,0 350,20 600,0 S900,0 1200,0 V0 H0 Z"
          fill="url(#curtainGradient)"
          opacity="0.35"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C150,0 350,20 600,0 S900,0 1200,0 V0 H0 Z;
              M0,100 C150,30 350,110 600,40 S900,30 1200,120 V0 H0 Z;
              M0,0 C150,0 350,20 600,0 S900,0 1200,0 V0 H0 Z"
            dur={`${waveSpeed * 1.8}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
          />
        </path> */}

        {/* Second wave - with multi-point dynamics */}
        <path
          d="M0,0 C100,0 200,10 400,0 S700,0 900,0 S1100,0 1200,0 V0 H0 Z"
          fill="url(#curtainGradient)"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C100,0 200,10 400,0 S700,0 900,0 S1100,0 1200,0 V0 H0 Z;
              M0,140 C100,20 200,90 400,160 S700,30 900,120 S1100,40 1200,150 V0 H0 Z;
              M0,0 C100,0 200,10 400,0 S700,0 900,0 S1100,0 1200,0 V0 H0 Z"
            dur={`${waveSpeed * 1.5}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
          />
        </path>

        {/* Third wave - with alternating peaks */}
        <path
          d="M0,0 C150,0 300,0 450,0 S750,0 900,0 S1050,0 1200,0 V0 H0 Z"
          fill="url(#curtainGradient)"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C150,0 300,0 450,0 S750,0 900,0 S1050,0 1200,0 V0 H0 Z;
              M0,80 C150,120 300,20 450,180 S750,20 900,200 S1050,100 1200,60 V0 H0 Z;
              M0,0 C150,0 300,0 450,0 S750,0 900,0 S1050,0 1200,0 V0 H0 Z"
            dur={`${waveSpeed * 1.9}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
          />
        </path>

        {/* Fourth wave - maximum depth wave */}
        <path
          d="M0,0 C200,0 400,0 600,0 S800,0 1000,0 S1100,0 1200,0 V0 H0 Z"
          fill="url(#curtainGradient)"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C200,0 400,0 600,0 S800,0 1000,0 S1100,0 1200,0 V0 H0 Z;
              M0,160 C200,60 400,240 600,80 S800,220 1000,40 S1100,80 1200,180 V0 H0 Z;
              M0,0 C200,0 400,0 600,0 S800,0 1000,0 S1100,0 1200,0 V0 H0 Z"
            dur={`${waveSpeed * 2.1}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
          />
        </path>

        {/* Fifth wave - ultra-deep accents */}
        {/* <path
          d="M0,0 C150,0 300,0 450,0 S600,0 750,0 S900,0 1050,0 S1150,0 1200,0 V0 H0 Z"
          fill="url(#secondaryGradient)"
          opacity="0.1"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C150,0 300,0 450,0 S600,0 750,0 S900,0 1050,0 S1150,0 1200,0 V0 H0 Z;
              M0,200 C150,50 300,220 450,70 S600,280 750,90 S900,240 1050,60 S1150,120 1200,220 V0 H0 Z;
              M0,0 C150,0 300,0 450,0 S600,0 750,0 S900,0 1050,0 S1150,0 1200,0 V0 H0 Z"
            dur={`${waveSpeed * 2.4}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
          />
        </path> */}
      </svg>
    </div>
  );
};

export default CurtainAnimation;
