"use client";
import { Header, AppHeader, LogoHp, Avatar, ContextualMenu, MenuList, MenuItem, IconLogOut } from "@veneer/core";
import Link from "next/link";

export default function CustomHeader() {
  return (
    <Header
      leadingArea={
        <Link href="/devices">
          <AppHeader appName="HP" logo={<LogoHp appearance="multicolor" />} />
        </Link>
      }
      trailingArea={
        <ContextualMenu anchorNode={<Avatar button={true} label="BM" />} placement="bottom">
          <MenuList>
            <MenuItem label="Logout" leadingArea={<IconLogOut />} value={1} />
          </MenuList>
        </ContextualMenu>
      }
      appearance="dropShadow"
      position="relative"
      className="pl-[18px] pr-6"
    />
  );
}
