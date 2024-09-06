'use client';

import React, { useState, useRef, useEffect } from 'react';
import InputFile from '@/components/Fileinput';
import { LeftArrow, RightArrow } from '@/components/svg/arrows';
import { QuestionSvg } from '@/components/svg/question';
import { info } from './data';
import { ResponsiveImage } from '@/components/responsive-image';

export default function Component() {
  const [activeTab, setActiveTab] = useState('about');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [images, setImages] = useState([
    '/image.png',
    '/image.png',
    '/image.png',
    '/image.png',
    '/image.png',
  ]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = ['About Me', 'Experiences', 'Recommended'];

  const handleTabClick = (tab: string, index: number) => {
    setActiveTab(tab.toLowerCase());
    setActiveTabIndex(index);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      console.log(newImage)
      setImages([...images, newImage]);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      let scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      if (scrollTo < 0) {
        scrollTo = scrollWidth - clientWidth;
      } else if (scrollTo + clientWidth > scrollWidth) {
        scrollTo = 0;
      }

      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });

      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && !isScrolling) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth === scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
        } else if (scrollLeft === 0) {
          carouselRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'auto' });
        }
      }
    };

    const currentRef = carouselRef.current;
    currentRef?.addEventListener('scrollend', handleScroll);
    return () => currentRef?.removeEventListener('scrollend', handleScroll);
  }, [isScrolling]);

  useEffect(() => {
    const activeTabElement = tabsRef.current[activeTabIndex];
    if (activeTabElement) {
      const tabContainer = activeTabElement.parentElement;
      if (tabContainer) {
        const containerRect = tabContainer.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        const leftOffset = activeTabRect.left - containerRect.left;
        
        tabContainer.style.setProperty('--active-tab-left', `${leftOffset}px`);
        tabContainer.style.setProperty('--active-tab-width', `${activeTabRect.width}px`);
      }
    }
  }, [activeTabIndex]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col md:flex-row md:justify-end px-4 sm:px-8">
      <div className="w-full md:w-1/2 space-y-6 py-6">
        <div className="relative bg-[#363C43] h-auto rounded-3xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="relative bg-[#171717] w-full max-w-[560px] p-1 rounded-xl flex flex-row">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  //@ts-ignore
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`relative rounded-xl h-[40px] md:h-[49px] w-full px-2 md:px-4 py-1 md:py-2 text-sm md:text-xl font-medium tab-btn z-10 transition-colors duration-300 ${
                    activeTab === tab.toLowerCase()
                      ? 'text-white tab-btn-active'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleTabClick(tab, index)}
                >
                  <span>{tab}</span>
                  <div className={`${activeTab === tab.toLowerCase() ? "" :"fill-animation"}`}></div>
                </button>
              ))}
              <div className="absolute inset-0 p-1 pointer-events-none">
                <div
                  className="absolute bg-[#363C43] rounded-xl transition-all duration-300 ease-in-out"
                  style={{
                    left: 'var(--active-tab-left, 0)',
                    width: 'var(--active-tab-width, 33.33%)',
                    height: 'calc(100% - 8px)',
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="text-gray-300 text-sm md:text-base font-semibold leading-relaxed">
            {info[activeTabIndex]}
          </div>
          <div className="absolute top-2 md:top-4 left-2">
            <QuestionSvg className="w-[18px] h-[18px] md:w-[23px] md:h-[23px] question" />
          </div>
        </div>

        <div className="relative bg-[#363C43] h-auto rounded-3xl p-4 md:p-6 shadow-lg">
          <div className="absolute top-2 md:top-4 left-2">
            <QuestionSvg className="w-[18px] h-[18px] md:w-[23px] md:h-[23px] question" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0">
            <div className="flex justify-center items-center text-white sm:ml-10 text-xl font-semibold bg-black rounded-xl h-10 md:h-12 px-4 mb-4 md:mb-0">
              <h2 className="text-[16px] md:text-[20px] font-light">Gallery</h2>
            </div>
            <div className="flex justify-center gap-4 md:gap-6 items-center">
              <InputFile addImage={addImage}/>
              <button 
                className="text-white p-2 md:p-3 next-btn rounded-full transition duration-700 ease-in-out hover:bg-black btn-next shadow-sm shadow-white"
                onClick={() => scroll('left')}
                disabled={isScrolling}
              >
                <LeftArrow />
              </button>
              <button 
                className="text-white next-btn p-2 md:p-3 rounded-full transition duration-700 ease-in-out hover:bg-black btn-prev shadow-sm shadow-white"
                onClick={() => scroll('right')}
                disabled={isScrolling}
              >
                <RightArrow />
              </button>
            </div>
          </div>
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-4 md:pt-12"
          >
            {images.concat(images.slice(0, 2)).map((src, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 snap-start">
                <ResponsiveImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto rounded-2xl img-hover object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}