'use client';

import axios from 'axios';
import Bot from 'react-chatbotify';
import Image from 'next/image';

import classes from './classes.module.css';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { SITE_DOMAIN } from '@/shared/constants/env.const';

const ChatBot = () => {
  let hasError = false;

  const call_chat_service = async (params: any) => {
    try {
      const messages: { sender: string; content: string }[] = JSON.parse(
        globalThis.localStorage.getItem(KEYS.CHAT_BOT) || ''
      );

      const res = await axios.post(
        `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : SITE_DOMAIN}/api/assistance`,
        {
          message: params.userInput,
          messages: messages.map((message) => ({
            role: message.sender === 'user' ? 'user' : 'assistant',
            content: message.content,
          })),
        }
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
      message: () => {
        const candidate = localStorage.getItem(KEYS.CHAT_BOT);

        return !candidate
          ? 'Greetings 😊, how would I help you?'
          : 'Would I help you with something else?';
      },
      path: 'loop',
    },

    error: {
      message:
        "I'm experiencing a problem with understanding you. Please try again",
      path: 'loop',
    },

    loop: {
      message: async (params: any) => {
        await call_chat_service(params);
      },
      path: () => {
        if (hasError) {
          return 'error';
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

export default ChatBot;
