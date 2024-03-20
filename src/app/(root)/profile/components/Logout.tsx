"use client";
import { Button } from '@mantine/core';

import LogoutWrapper from '@/components/Logout';

export const Logout = () => {
    return (
        <LogoutWrapper>
        {(handleLogout) => (
          <Button
            className='rounded-sm bg-black uppercase md:self-center'
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </LogoutWrapper>
    );
}