"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

type Props = LinkProps & {
  children: React.ReactNode;
};

export default function LocalizedLink({ href, children, ...rest }: Props) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en"; // fallback if no locale

  const localizedHref =
    typeof href === "string"
      ? `/${locale}${href.startsWith("/") ? "" : "/"}${href}`
      : href;

  return (
    <Link href={localizedHref} {...rest}>
      {children}
    </Link>
  );
}
