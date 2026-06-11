"use client";

import { track } from "@/lib/analytics";
import type { EventName } from "@/lib/site";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event?: EventName;
  eventParams?: Record<string, unknown>;
  children: ReactNode;
};

/** クリック時にGA4/Vercelイベントを送信するリンク */
export default function TrackedLink({ event, eventParams, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        if (event) track(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
