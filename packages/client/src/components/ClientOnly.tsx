import { FC, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ClientOnly: FC<Props> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};
export default ClientOnly;
