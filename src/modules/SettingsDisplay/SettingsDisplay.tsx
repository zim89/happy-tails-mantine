'use client';

import { Tabs } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import { pathMap, tabs } from './lib/data';
import { HomePageSetting } from './components/HomePageSetting';
import { useParams, useRouter } from 'next/navigation';
import { AdminPanelContext } from '@/shared/context/panel.context';
import { PromoCodeDisplay } from './components/PromoCodeDisplay';

export const SettingsDisplay = () => {
  const [currentTab, setCurrentTab] = useState('homePage');
  const params = useParams();
  const router = useRouter();
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: `${pathMap[currentTab]}` }));
  }, [currentTab]);

  useEffect(() => {
    setCurrentTab(window.location.hash.slice(1));
  }, [params]);

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(val) => val && setCurrentTab(val)}
        color='orange'
      >
        <Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Tab
              key={index}
              onClick={() => {
                router.replace(`#${tab.value}`);
              }}
              value={tab.value}
              className={
                tab.value === currentTab ? 'text-brand-orange-400' : undefined
              }
            >
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value='homePage'>
          <HomePageSetting />
        </Tabs.Panel>
        <Tabs.Panel value='delivery'>2</Tabs.Panel>
        <Tabs.Panel value='promo'>
          <PromoCodeDisplay />
        </Tabs.Panel>
        <Tabs.Panel value='tax'>4</Tabs.Panel>
      </Tabs>
    </>
  );
};
