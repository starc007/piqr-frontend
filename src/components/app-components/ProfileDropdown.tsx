import React, { FC } from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  Image,
} from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { useRouter } from "next/router";
import { logoutIcon, viewIcon } from "@assets/index";

type Props = {
  btnChildren?: React.ReactNode;
  extraCls: string;
  dropdownMainCls?: string;
};

const ProfileDropdown: FC<Props> = ({
  btnChildren,
  extraCls,
  dropdownMainCls,
}) => {
  const router = useRouter();

  const { user, logout } = useAppBoundStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  return (
    <Dropdown cls={dropdownMainCls}>
      <DropdownButton cls="w-full">{btnChildren}</DropdownButton>
      <DropdownContent cls={extraCls}>
        <DropdownItem
          className="hover:bg-gray-100 flex items-center"
          onClick={() => router.push(`/${user?.username}`)}
        >
          <Image src={viewIcon.src} alt="view" className="w-5 mr-2" />
          <span className="text-sm">View Profile</span>
        </DropdownItem>
        <DropdownItem
          className="hover:bg-gray-100 flex items-center"
          onClick={() => {
            logout().then(() => router.push("/login"));
          }}
        >
          <Image src={logoutIcon.src} alt="view" className="w-5 mr-2" />
          <span className="text-sm">Logout</span>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default ProfileDropdown;
