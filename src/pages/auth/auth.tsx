import { Button, Form, Input, Space } from "antd";
import { useLinkClickHandler, useNavigate } from "react-router-dom";

import { CardLayout } from "@/layouts/card-layout";
import { useLogin } from "@/modules/auth/hooks/use-login";
import { EUserType } from "@/modules/shared/types/user-type";

import "./auth.scss";

type AuthPageProps = {
  userType: EUserType;
};

const AuthPage = (props: AuthPageProps) => {
  const { userType } = props;

  const navigate = useNavigate();

  const toClientAuth = useLinkClickHandler("/auth");
  const toOwnerAuth = useLinkClickHandler("/admin/owner/auth");
  const toWaiterAuth = useLinkClickHandler("/admin/waiter/auth");

  const { login, isLoggingIn } = useLogin(userType, () => {
    switch (userType) {
      case EUserType.OWNER:
        navigate("/admin/owner");
        break;
      case EUserType.WAITER:
        navigate("/admin/waiter");
        break;
      default:
        navigate("/");
    }
  });

  let cardTitle = "Welcome";

  switch (userType) {
    case EUserType.WAITER:
      cardTitle = "Welcome back, waiter";
      break;
    case EUserType.OWNER:
      cardTitle = "Welcome back, owner";
      break;
    default:
  }

  return (
    <div>
      <CardLayout
        className="auth-page"
        title={cardTitle}
        topContent={
          <span style={{ fontSize: "48px", color: "#ffffff", fontWeight: 600 }}>
            Coffee Order Machine
          </span>
        }
      >
        <Form disabled={isLoggingIn} onFinish={login}>
          <Form.Item
            name={userType === EUserType.CLIENT ? "name" : "username"}
            rules={[
              {
                required: true,
                message: `Please enter your ${userType === EUserType.CLIENT ? "name" : "username"}`,
              },
            ]}
          >
            <Input
              placeholder={userType === EUserType.CLIENT ? "Name" : "Username"}
            />
          </Form.Item>
          {userType !== EUserType.CLIENT ? (
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>
          ) : null}
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              block
              htmlType="submit"
              loading={isLoggingIn}
              type="primary"
            >
              {userType === EUserType.CLIENT ? "Start ordering" : "Log in"}
            </Button>
            {userType !== EUserType.CLIENT ? (
              <Button
                block
                href="/auth"
                htmlType="button"
                onClick={toClientAuth}
              >
                I am a client
              </Button>
            ) : null}
            {userType !== EUserType.OWNER ? (
              <Button
                block
                href="/admin/owner/auth"
                htmlType="button"
                onClick={toOwnerAuth}
              >
                I am an owner
              </Button>
            ) : null}
            {userType !== EUserType.WAITER ? (
              <Button
                block
                href="/admin/waiter/auth"
                htmlType="button"
                onClick={toWaiterAuth}
              >
                I am a waiter
              </Button>
            ) : null}
          </Space>
        </Form>
      </CardLayout>
    </div>
  );
};

export { AuthPage };
