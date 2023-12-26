import Link from 'next/link'
import React from 'react'

export default function FooterCreators () {
  return (
    <div className="w-full flex justify-between text-white">
        <div className="flex gap-1 items-center text-white font-normal text-base">
            <div>
                @ 2023
            </div>
            <div className="">
                Happy Tails
            </div>
        </div>
        <div className="flex items-center text-white text-xl font-bold font-lato gap-1">
            <span> Website by</span>
            <Link href={'https://teamchallenge.io/team/5/public'} target='blanck' className='underline'>Team</Link>
        </div>
    </div>
  )
}
