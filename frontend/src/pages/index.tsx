import * as React from "react";
import { useNavigate } from "react-router";

import { useUser } from "@/lib/auth";

export const Landing = () => {
  const navigate = useNavigate();
  const { is_login } = useUser();

  React.useEffect(() => {
    if (is_login) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  }, [is_login]);

  return null;
};

export default Landing;
