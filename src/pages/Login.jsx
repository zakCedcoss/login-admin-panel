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
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsLoggedIn(false);
        setError(true);
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
              content="Error Occurred"
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
