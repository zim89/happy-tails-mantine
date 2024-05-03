"use client";

import { useContext, useEffect } from "react";
import { Container } from '@mantine/core';

import { AdminPanelContext } from "@/shared/lib/context";

export default function AdminDashboard() {
    const { update } = useContext(AdminPanelContext);

    // The context for sharing the active link is used, 
    // because it ensures that whether the page is opened by clicking a menu link 
    // or requested by url string
    useEffect(() => {
        update(prev => ({ ...prev, openedLink: "Dashboard" }));
    }, []);

  return (
    <Container>
      <h2 className='my-8 text-2xl font-bold text-red-900'>AuthPage</h2>
    </Container>
  );
}
