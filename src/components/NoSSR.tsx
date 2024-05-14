import { Fragment, useEffect, useState } from "react";

const NoSSR = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default NoSSR;
