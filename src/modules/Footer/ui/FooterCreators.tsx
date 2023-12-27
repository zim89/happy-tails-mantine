import React from 'react'
import { Anchor } from '@mantine/core';

export default function FooterCreators () {
  return (
    <div className="w-full flex justify-between text-white">
        <p className=" text-primary text-xs leading-[18px] lg:text-base">@ 2023 Happy Tails</p>
        <p className='text-xs leading-[18px] font-bold text-primary md:text-xl md:leading-6'>Website by <a href='https://teamchallenge.io/team/5/public' target='_blank' className='underline'>Team</a></p>
    </div>
  )
}
