"use client";
import { Header, AppHeader, LogoHp, Avatar, ContextualMenu, MenuList, MenuItem, IconLogOut, Button, IconPerson } from "@veneer/core";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomHeader({ user, page }: { user: string | undefined; page: "login" | "devices" | "kvm" }) {
  const router = useRouter();

  const logout = () => {
    console.log("Logout");
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
        user ? (
          <ContextualMenu anchorNode={<Avatar button={true} icon={<IconPerson />} />} placement="bottom">
            <MenuList>
              <MenuItem label="Logout" leadingArea={<IconLogOut />} value={1} onClick={logout} />
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
