import type { HTMLProps } from "react";

type FooterProps = HTMLProps<HTMLDivElement>;

const Footer = (props: FooterProps) => (
  <div {...props}>
    <p className="flex-initial text-center bg-primary text-lightText/50 text-xs py-1">© 2024 Sábián Róbert</p>
  </div>
);

export default Footer;
