import React from 'react';

export default function ShareInSocial() {
  return (
    <div className='space-y-3'>
      <h2 className='text-lg/normal uppercase'>Share</h2>
      <ul className='flex gap-6'>
        <li>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-grey-900 transition-colors duration-300 hover:bg-secondary'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.3447 11.1068L14.863 7.69417H11.621V5.48058C11.621 4.54672 12.0731 3.63592 13.5251 3.63592H15V0.730583C15 0.730583 13.6621 0.5 12.3836 0.5C9.71233 0.5 7.96804 2.13483 7.96804 5.0932V7.69417H5V11.1068H7.96804V19.357C8.56393 19.4516 9.17352 19.5 9.79452 19.5C10.4155 19.5 11.0251 19.4516 11.621 19.357V11.1068H14.3447Z'
                fill='white'
              />
            </svg>
          </button>
        </li>
        <li>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-grey-900 transition-colors duration-300 hover:bg-secondary'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_3792_61709)'>
                <path
                  d='M9.99588 0C4.4673 0 0 4.47552 0 9.99588C0 14.2328 2.63266 17.8527 6.3513 19.3089C6.2608 18.5191 6.18676 17.3015 6.3842 16.4377C6.5652 15.6561 7.55244 11.4685 7.55244 11.4685C7.55244 11.4685 7.25628 10.868 7.25628 9.98766C7.25628 8.59728 8.06252 7.56068 9.06622 7.56068C9.92184 7.56068 10.3332 8.20238 10.3332 8.9675C10.3332 9.82312 9.7902 11.1065 9.50226 12.2995C9.26368 13.2949 10.0041 14.1094 10.9831 14.1094C12.7602 14.1094 14.1259 12.2336 14.1259 9.53518C14.1259 7.1411 12.4064 5.471 9.94652 5.471C7.09996 5.471 5.42986 7.6018 5.42986 9.80666C5.42986 10.6623 5.75894 11.5837 6.1703 12.0856C6.25258 12.1843 6.2608 12.2748 6.23612 12.3735C6.16208 12.6861 5.9893 13.369 5.9564 13.5088C5.91526 13.6898 5.8083 13.731 5.61908 13.6405C4.38502 13.0481 3.61168 11.2217 3.61168 9.7573C3.61168 6.60634 5.8988 3.7104 10.218 3.7104C13.6816 3.7104 16.3801 6.17852 16.3801 9.4858C16.3801 12.9329 14.2081 15.7055 11.197 15.7055C10.1851 15.7055 9.23076 15.1789 8.90992 14.5537C8.90992 14.5537 8.40806 16.4624 8.28466 16.9313C8.06252 17.8034 7.45372 18.8893 7.04236 19.5557C7.98026 19.8437 8.9675 20 10.0041 20C15.5245 20 20 15.5245 20 10.0041C19.9918 4.47552 15.5162 0 9.99588 0Z'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_3792_61709'>
                  <rect width='20' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </button>
        </li>
        <li>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-brand-grey-900 transition-colors duration-300 hover:bg-secondary'>
            <svg
              width='22'
              height='21'
              viewBox='0 0 22 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.219349 -7.62939e-06L8.58546 11.2202L0.166504 20.3401H2.06234L9.43099 12.3531L15.386 20.3401H21.8332L12.9981 8.49051L20.8324 -7.62939e-06H18.9399L12.1525 7.35424L6.66981 -7.62939e-06H0.219349ZM3.00695 1.39796H5.9696L19.0489 18.9388H16.0862L3.00695 1.39796Z'
                fill='white'
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}
