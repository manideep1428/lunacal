'use client';
import React, { useState } from 'react';
import InputFile from '@/components/Fileinput';
import Image from 'next/image';
import { LeftArrow, RightArrow } from '@/components/svg/arrows';
import { QuestionSvg } from '@/components/svg/question';
import { info } from './data';

export default function Component() {
  const [activeTab, setActiveTab] = useState('about');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [images, setImages] = useState([
    '/image.png?height=200&width=200',
    '/image.png?height=200&width=200',
    '/image.png?height=200&width=200',
  ]);

  const tabs = ['About Me', 'Experiences', 'Recommended'];
  

  //@ts-ignore
  const handleTabClick = (tab, index) => {
    setActiveTab(tab.toLowerCase());
    setActiveTabIndex(index);
  };
  

  const addImage = () => {
    setImages([...images, '/image.png?height=200&width=200']);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex justify-end px-8">
      <div className="w-full lg:w-1/2 space-y-6 py-6">
        <div className="relative bg-[#363C43] h-[260px] rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-center mb-6">
          <div className="relative bg-[#171717] w-full lg:w-[560px] p-1 rounded-xl flex">
          <div className="relative bg-[#171717] w-full lg:w-[560px] p-1 rounded-xl flex">
            {tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`relative rounded-xl h-[49px] w-full lg:w-[195px] px-4 py-2 text-xl font-medium tab-btn ${
                    activeTab === tab.toLowerCase()
                      ? 'tab-btn-active'
                      : 'tab-btn-inactive'
                  }`}
                  onClick={() => handleTabClick(tab, index)}
                >
                  <span >{tab}</span>
                  <div className="fill-animation"></div>
                </button>
              ))}
              </div>
            </div>
          </div>
          <div className="text-gray-300 font-semibold leading-relaxed">
            {info[activeTabIndex]}
          </div>
          <div className='absolute top-4 left-2'>
            <QuestionSvg className="w-[23px] h-[23px] question" />
          </div>
        </div>

        {/* Gallery Widget */}
        <div className="relative bg-[#363C43] h-[330px] rounded-3xl p-6 shadow-lg">
          <div className='absolute top-4 left-2'>
            <QuestionSvg className="w-[23px] h-[23px] question" />
          </div>
          <div className="flex justify-between">
            <div className="flex justify-center ml-4 items-center text-white text-xl font-semibold bg-black rounded-xl h-12 px-4">
              <h2 className='text-[20px] font-light'>
                Gallery
              </h2>
            </div>
            <div className="flex justify-center gap-6 items-center">
              <InputFile/>
              <button
                className="text-white p-2 next-btn rounded-full transition duration-700 ease-in-out hover:bg-black"
              >
                <LeftArrow/>
              </button>
              <button className="text-white next-btn p-2 rounded-full transition duration-700 ease-in-out hover:bg-black">
                <RightArrow/>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-12">
            {images.map((src, index) => (
              <Image key={index} width={200} height={200} src={src} alt={`Gallery image ${index + 1}`} className="h-auto rounded-2xl img-hover" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
