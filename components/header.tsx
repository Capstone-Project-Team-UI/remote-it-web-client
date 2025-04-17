"use client";
import { Header, AppHeader, LogoHp, Avatar, ContextualMenu, MenuList, MenuItem, IconLogOut, Button, IconPerson } from "@veneer/core";
import Link from "next/link";
import { logout } from "@/clientLib";
import { useRouter } from "next/navigation";

export default function CustomHeader({ page }: { page: "login" | "devices" }) {
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Header
      leadingArea={
        <Link href="/devices">
          <AppHeader appName="HP" logo={<LogoHp appearance="multicolor" />} />
        </Link>
      }
      trailingArea={
        page === "devices" ? (
          <ContextualMenu anchorNode={<Avatar button={true} icon={<IconPerson />} />} placement="bottom">
            <MenuList>
              <MenuItem label="Logout" leadingArea={<IconLogOut />} value={1} onClick={onLogout} />
            </MenuList>
          </ContextualMenu>
        ) : page !== "login" ? (
          <Button>Sign in</Button>
        ) : (
          <></>
        )
      }
      appearance="dropShadow"
      position="relative"
      className="pl-[18px] pr-6"
    />
  );
}
