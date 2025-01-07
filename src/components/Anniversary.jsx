import React, { useState, useRef } from 'react';

const Anniversary = () => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const imagesRef = useRef(null);

  const handleHeartClick = () => {
    setHeartClicked(prev => !prev);
  };

  const handleButtonClick = () => {
    setShowImages(true);
    setTimeout(() => {
      imagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Generate random angles for polaroid images
  const polaroidAngles = [
    { rotate: '-8deg', translateX: '8px', translateY: '5px' },
    { rotate: '5deg', translateX: '-12px', translateY: '-8px' },
    { rotate: '-12deg', translateX: '4px', translateY: '12px' },
    { rotate: '7deg', translateX: '-15px', translateY: '6px' },
    { rotate: '-5deg', translateX: '12px', translateY: '-10px' },
    { rotate: '10deg', translateX: '-6px', translateY: '15px' },
    { rotate: '-7deg', translateX: '10px', translateY: '-5px' },
    { rotate: '6deg', translateX: '-8px', translateY: '10px' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFD1DF' }}>
      {/* Main section with heart and animations */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Crow GIF - positioned left */}
        <div className="absolute transform -rotate-12" style={{ left: '15%', top: '50%', transform: 'translateY(-50%) rotate(-12deg)' }}>
          <img
            src="crow.gif"
            alt="Crow"
            className="w-[480px] h-[480px]"
          />
        </div>

        {/* Heart in center */}
        <div 
          className={`relative transform transition-all duration-300 hover:scale-110 
            ${heartClicked ? 'scale-125' : ''}`}
          onClick={handleHeartClick}
          style={{ marginTop: '-5%' }}
        >
          <img
            src="heart.png"
            alt="Heart"
            className="w-[480px] h-[480px] relative z-10"
          />
          
          {/* Explosion particles - shown on each click */}
          {heartClicked && (
            <div className="absolute inset-0 z-0" key={Date.now()}>
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 text-2xl"
                  style={{
                    animation: `
                      particle${i} 1.5s ease-out forwards,
                      fadeOut 1.5s ease-out forwards
                    `,
                    transformOrigin: 'center',
                  }}
                >
                  {i % 2 === 0 ? '🩵' : '🩷'}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bat GIF - positioned right */}
        <div className="absolute transform rotate-12" style={{ right: '15%', top: '50%', transform: 'translateY(-50%) rotate(12deg)' }}>
          <img
            src="bat.gif"
            alt="Bat"
            className="w-[480px] h-[480px]"
          />
        </div>

        {/* "Click here" button */}
        <button
          onClick={handleButtonClick}
          className="absolute bottom-8 px-8 py-3 bg-[#FFF8F8] rounded-full shadow-lg 
            hover:shadow-xl transition-all duration-300"
        >
          Click here
        </button>
      </div>

      {/* Polaroid images section */}
      {showImages && (
        <div 
          ref={imagesRef}
          className="min-h-screen p-8 flex flex-wrap gap-8 justify-center items-center"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
            <div
              key={num}
              className="transform transition-all duration-300 hover:scale-105"
              style={{
                transform: `rotate(${polaroidAngles[index].rotate}) 
                           translate(${polaroidAngles[index].translateX}, 
                                   ${polaroidAngles[index].translateY})`,
              }}
            >
              <div className="bg-white p-3 pb-10 shadow-xl">
                <img
                  src={`${num}.jpeg`}
                  alt={`Photo ${num}`}
                  className="max-w-[250px] max-h-[350px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        ${[...Array(30)].map((_, i) => `
          @keyframes particle${i} {
            0% {
              transform: translate(-50%, -50%) rotate(${i * 12}deg) translateY(0);
            }
            100% {
              transform: translate(-50%, -50%) rotate(${i * 12}deg) translateY(${150 + Math.random() * 100}px);
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};

export default Anniversary;
