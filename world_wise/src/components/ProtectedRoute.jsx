import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const navigator = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) navigator("/");
    },
    [isAuthenticated, navigator]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
