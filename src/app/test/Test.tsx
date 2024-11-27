'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Sketchfab from './sketchfab-viewer';
import axios from 'axios';

import { data } from './utils';
import Product3DCard from './3DCard';

// const sketchfabApiUrl = 'https://api.sketchfab.com/v3/models';

export const Test = () => {
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const sketchfab = new Sketchfab('1.12.1', iframeRef.current);

      sketchfab.init('94af58955e984763b423d05cc21ba7a9', {
        success: (api) => {
          console.log('Sketchfab viewer initialized successfully');
          // You can now use the API to control the viewer
          setIsReady(true);
        },
        error: (error) => {
          console.error('Error initializing Sketchfab viewer:', error);
        },
      });

      sketchfab.show();
    }
  }, []);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault();

  //     const formData = new FormData(e.currentTarget);
  //     const request = new Request(sketchfabApiUrl, {
  //       method: 'POST',
  //       body: formData,
  //       headers: { Authorization: `Bearer EkAkkur7tRQsJlz0mXfRxRT10pgaJO` },
  //     });

  //     const res = await fetch(request);
  //     console.log(res);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleClick = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('grant_type', 'password');
  //     formData.append('username', 'd.goncharenko.man@gmail.com');
  //     formData.append('password', '3X*x4t5c$6*');

  //     const res = await axios.post(
  //       'https://sketchfab.com/oauth2/token/',
  //       null,
  //       {
  //         params: {
  //           grant_type: 'password',
  //           username: 'd.goncharenko.man@gmail.com',
  //           password: '3X*x4t5c$6*',
  //         },
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization:
  //             'Basic ' +
  //             globalThis.btoa(
  //               `${process.env.NEXT_PUBLIC_SKETCHFAB_CLIENT_ID}:${process.env.NEXT_PUBLIC_SKETCHFAB_CLIENT_SECRET}`
  //             ),
  //         },
  //       }
  //     );

  //     console.log(res);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <ul className='container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
      {/* <iframe
        ref={iframeRef}
        className={cn('h-full w-full', isReady ? 'block' : 'hidden')}
        allow='autoplay; fullscreen; xr-spatial-tracking'
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        allowFullScreen
      /> */}
      {data.map((item, index) => (
        <li key={index}>
          <Product3DCard product={item} />
        </li>
      ))}
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>
            Model
            <input name='modelFile' type='file' />
          </label>
        </div>
        <div>
          <label>
            Model name:
            <input name='name' type='text' />
          </label>
        </div>
        <div>
          <label>
            Model description:
            <input name='description' type='text' />
          </label>
        </div>
        <div>
          <label>
            Tags (space separated):
            <input name='tags' type='text' />
          </label>
        </div>
        <button type='submit'>OK</button>
      </form> */}
      {/* <Button onClick={handleClick}>Log in without consent</Button> */}
    </ul>
  );
};
