'use client';

import axios from 'axios';
import Bot from 'react-chatbotify';
import { BotIcon } from 'lucide-react';

import classes from './classes.module.css';
import Image from 'next/image';

export const ChatBot = () => {
  let hasError = false;

  const call_chat_service = async (params: any) => {
    try {
      const res = await axios.get(
        `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/assistance?message=${params.userInput}`
      );

      await params.injectMessage(res.data);
    } catch (err) {
      console.error(err);
      await params.injectMessage(
        'Unable to load model, is your API Key valid?'
      );
      hasError = true;
    }
  };

  const flow = {
    start: {
      message: 'Greetings 😊, how would I help you?',
      path: 'loop',
    },

    loop: {
      message: async (params: any) => {
        await call_chat_service(params);
      },
      path: () => {
        if (hasError) {
          return 'start';
        }
        return 'loop';
      },
    },
  };

  return (
    <div className={classes.chat}>
      <Bot
        settings={{
          botBubble: { dangerouslySetInnerHtml: true },
          chatHistory: { autoLoad: true, storageKey: 'chat_bot' },
          general: {
            fontFamily: '__Inter_90234e',
            secondaryColor: '#DB8420',
            primaryColor: '#F39324',
          },
          notification: {
            disabled: true,
          },
          header: {
            title: (
              <h2 className='mt-1 text-lg font-semibold'>
                Happy Tails Assistant
              </h2>
            ),
            avatar:
              'https://happy-tails-mantine.vercel.app/logo/logo-mobile.svg',
          },
          fileAttachment: {
            disabled: true,
          },
          footer: {
            text: (
              <p className='mb-2 text-brand-grey-600'>
                Be specific to be comprehensive to the bot
              </p>
            ),
          },
          chatButton: {
            icon: () => (
              <Image
                src='/images/bot_dog.png'
                height={48}
                width={48}
                className='invert filter'
                alt='Chat bot'
              />
            ),
          },
          tooltip: {
            mode: 'hidden',
          },
        }}
        flow={flow}
      />
    </div>
  );
};