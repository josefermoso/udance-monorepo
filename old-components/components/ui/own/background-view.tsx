import React from 'react';

const BackgroundView: React.FC = () => {
  return (
    <div className="background-view">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1100">
        <defs>
          <linearGradient
            id="danceGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#9B59B6" />
            <stop offset="100%" stop-color="#4A90E2" />
          </linearGradient>
        </defs>

        <rect width="1200" height="1100" fill="#F8F9FA" />

        <g opacity="0.3">
          <path
            d="M0 550 
             Q300 350, 600 550 
             T1200 550"
            fill="none"
            stroke="url(#danceGradient)"
            stroke-width="10"
          />
          <path
            d="M0 1000 
             Q300 800, 600 1000 
             T1200 1000"
            fill="none"
            stroke="url(#danceGradient)"
            stroke-width="10"
          />
        </g>

        <g transform="translate(600, 800) rotate(45)">
          <g opacity="0.2" transform="translate(-250, 550)">
            <path
              d="M-300 -200 
           Q-100 -300, 0 -100 
           T300 -200"
              fill="none"
              stroke="#FF3366"
              strokeWidth="10"
            />
          </g>
          <g opacity="0.2" transform="translate(0, -650)">
            <path
              d="M-250 -150 
           Q-50 -250, 0 -50 
           T250 -150"
              fill="none"
              stroke="#9B59B6"
              strokeWidth="8"
            />
          </g>

          <g>
            <circle
              cx="-400"
              cy="-180"
              r="80"
              fill="rgba(255,51,102,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="400"
              cy="50"
              r="90"
              fill="rgba(155,89,182,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="0"
              cy="300"
              r="85"
              fill="rgba(74,144,226,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="-300"
              cy="150"
              r="75"
              fill="rgba(255,142,60,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="250"
              cy="-450"
              r="70"
              fill="rgba(206,128,214,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="-400"
              cy="420"
              r="80"
              fill="rgba(255,51,102,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="400"
              cy="650"
              r="90"
              fill="rgba(155,89,182,0.1)"
              filter="url(#softBlur)"
            />
            <circle
              cx="0"
              cy="900"
              r="85"
              fill="rgba(74,144,226,0.1)"
              filter="url(#softBlur)"
            />
          </g>
        </g>

        <g opacity="0.3">
          <circle cx="200" cy="250" r="40" fill="#FF3366" />
          <circle cx="400" cy="150" r="25" fill="#9B59B6" />
          <circle cx="600" cy="300" r="35" fill="#4A90E2" />
          <circle cx="800" cy="200" r="30" fill="#FF8E3C" />
          <circle cx="1000" cy="350" r="45" fill="#CE80D6" />

          <circle cx="150" cy="500" r="20" fill="#9DCBEE" />
          <circle cx="350" cy="600" r="28" fill="#FF809F" />
          <circle cx="550" cy="550" r="33" fill="#5E356E" />
          <circle cx="750" cy="480" r="22" fill="#246497" />
          <circle cx="950" cy="550" r="38" fill="#FF3366" />

          <circle cx="200" cy="800" r="40" fill="#FF3366" />
          <circle cx="400" cy="850" r="25" fill="#9B59B6" />
          <circle cx="600" cy="900" r="35" fill="#4A90E2" />
          <circle cx="800" cy="850" r="30" fill="#FF8E3C" />
          <circle cx="1000" cy="900" r="45" fill="#CE80D6" />
          <circle cx="150" cy="950" r="20" fill="#9DCBEE" />
          <circle cx="350" cy="1000" r="28" fill="#FF809F" />
          <circle cx="550" cy="950" r="33" fill="#5E356E" />
          <circle cx="750" cy="900" r="22" fill="#246497" />
          <circle cx="950" cy="1000" r="38" fill="#FF3366" />
        </g>

        <defs>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default BackgroundView;
