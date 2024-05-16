"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import { useModalStore } from "~/lib/store";

import * as React from "react";

export const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useModalStore((state) => state.isOpen);

  return <Dialog open={isOpen}>{children}</Dialog>;
};

export const OpenModal = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => {
  const setOpen = useModalStore((state) => state.setOpen);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`${url}`);
        setOpen();
      }}
    >
      {children}
    </div>
  );
};

export const CloseModal = ({ children }: { children: React.ReactNode }) => {
  const setClose = useModalStore((state) => state.setClose);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/");
        setClose();
      }}
    >
      {children}
    </div>
  );
};
