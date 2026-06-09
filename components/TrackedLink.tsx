"use client";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName?: AnalyticsEventName;
};

export function TrackedLink({ eventName, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        if (eventName) {
          trackEvent(eventName);
        }

        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
