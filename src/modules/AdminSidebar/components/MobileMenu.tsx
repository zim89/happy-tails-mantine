"use client";

import { Box, Menu, UnstyledButton } from "@mantine/core";
import { LinksGroup } from "../lib/utils";
import { useContext, useEffect, useState } from "react";
import { AdminPanelContext, UnsavedChangesContext } from "@/shared/lib/context";
import { cn } from "@/shared/lib/utils";
import BlockLink from "@/modules/BlockLink";
import { Minus } from "lucide-react";

type Props = {
    linksGroup: LinksGroup;
};
export const MobileMenu = ({ linksGroup }: Props) => {
    const { unsavedChanges } = useContext(UnsavedChangesContext);
    const { openedLink, update } = useContext(AdminPanelContext);
    const [isOpened, setIsOpened] = useState(false);

    const areThereLinksSelected = linksGroup.links.find(
        (l) => l.label === openedLink
    );

    useEffect(() => {
        if (unsavedChanges) return;

        if (areThereLinksSelected) {
            setIsOpened(true);
        } else if (openedLink !== linksGroup.label) {
            setIsOpened(false);
        }
    }, [openedLink]);

    const setOpened = (label: string) => {
        if (unsavedChanges) return;
        update((prev) => ({ ...prev, openedLink: label }));
    };

    return (
        <div className="md:hidden w-full">
            <Menu opened={isOpened} onChange={setIsOpened} position="right-start" offset={6} withArrow arrowPosition="center">
                {/* Menu items */}
                <Menu.Target>
                    <UnstyledButton onClick={() => setIsOpened(!openedLink)} title="Open catalog" className={cn('flex justify-center w-full py-2 text-[#C8C8C8]', (isOpened && areThereLinksSelected) && 'bg-[#F39324] text-[#FDFDFD]')}>
                        <linksGroup.icon size={20} />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown classNames={{ dropdown: "md:hidden" }}>
                    {linksGroup.links.map((link, linkKey) => (
                        <Menu.Item
                            c={link.label === openedLink ? '#F39324' : '#868686'}
                            onClick={() => {
                                setOpened(link.label)
                            }}
                            classNames={{ item: "pl-4 pr-4" }}
                            key={linkKey}
                            title={link.label}
                        >
                            <BlockLink href={link.link} className='pt-2 inline-flex text-lg'><Minus width={7} className='mr-3' /> {link.label}</BlockLink>
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}