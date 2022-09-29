import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Frame,
  Spinner,
  TextField,
  Toast,
} from "@shopify/polaris";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(isLoading);

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const handleSubmit = () => {
    if (username === "" || password === "") {
      setIsLoading(false);
      setIsLoggedIn(false);
      setError(true);
      setMessage("Fields should not be empty");
      return;
    }
    setIsLoading(true);
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${username}&password=${password}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("Login Success");
          setIsLoading(false);
          setIsLoggedIn(true);
          setError(false);
          navigate("/", { state: { loggedIn: true }, replace: true });
        } else {
          console.log("Login Failed");
          setIsLoading(false);
          setIsLoggedIn(false);
          setError(true);
        }
        setMessage(data.message);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsLoggedIn(false);
        setError(true);
        setMessage(error);
      });
  };

  return (
    <div className="login">
      {isLoading && (
        <div className="spinner">
          <Spinner accessibilityLabel="Loading" size="large" />;
        </div>
      )}
      <Card sectioned>
        <Form preventDefault={true} onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={username}
              onChange={(val) => setUsername(val)}
              label="Username"
              type="text"
            />
            <TextField
              value={password}
              onChange={(val) => setPassword(val)}
              label="Password"
              type="password"
            />

            <Button primary submit>
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Card>
      {error && (
        <div className="toast">
          <Frame>
            <Toast
              content={message}
              duration={3000}
              error
              onDismiss={() => setError(false)}
            />
          </Frame>
        </div>
      )}
    </div>
  );
}

export default Login;
