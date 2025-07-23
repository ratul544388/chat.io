import type { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ children } : PropsWithChildren) => (
  <Helmet>
    <title>{children} | Chat.io</title>
  </Helmet>
);

export default Title;
