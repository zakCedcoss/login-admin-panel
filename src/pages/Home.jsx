import { Button, Frame, Toast } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const [showToast, setShowToast] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  useEffect(() => {
    if (!state?.loggedIn) {
      navigate("/login", { replace: true });
    }
  }, []);

  const backToLogin = () => {
    navigate("/login", { state: { loggedIn: false }, replace: true });
  };

  return (
    <div className="home">
      <Button primary onClick={backToLogin}>
        Logout
      </Button>
      <div className="toast">
        <Frame>
          {state.loggedIn && showToast && (
            <Toast
              content="Login Success"
              duration={3000}
              onDismiss={() => setShowToast(false)}
            />
          )}
        </Frame>
      </div>
    </div>
  );
}

export default Home;
