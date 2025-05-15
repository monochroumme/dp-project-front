import { useSelector } from "react-redux";
import { Button, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useLogout } from "@/modules/auth/hooks/use-logout";
import { EUserType } from "@/modules/shared/types/user-type";

import type { ReactNode } from "react";
import type { TOwner } from "@/modules/shared/types/owner";
import type { PropsWithChildren } from "react";
import type { TState } from "@/store/types";
import type { TClient } from "@/modules/shared/types/client";
import type { TWaiter } from "@/modules/shared/types/waiter";

import "./page-card-layout.scss";

type PageCardLayoutProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  headerRightContent?: ReactNode;
  userType: EUserType;
}>;

const PageCardLayout = (props: PageCardLayoutProps) => {
  const {
    userType,
    className,
    contentClassName,
    headerRightContent,
    children,
  } = props;

  const { user } = useSelector((state: TState) => state.auth);

  const { logout, isLoggingOut } = useLogout();

  return (
    <>
      <div className={`page-card-layout${className ? ` ${className}` : ""}`}>
        <img
          alt="coffee"
          className="page-card-layout__bg"
          src="/assets/coffee-bg.jpg"
        />
        <div className="page-card-layout__card">
          <header className="page-card-layout__card-header">
            <div className="page-card-layout__card-header-box">
              <Button
                danger
                disabled={isLoggingOut}
                loading={isLoggingOut}
                onClick={logout}
                type="text"
                icon={
                  <LogoutOutlined
                    style={{ fontSize: 16, transform: "rotate(180deg)" }}
                  />
                }
              />
              <Typography.Text
                className="page-card-layout__card-header-table-number"
                ellipsis={{
                  tooltip: (
                    <>
                      {userType === EUserType.CLIENT ? "Name: " : ""}
                      <b>
                        {(user as TClient)?.name ??
                          (user as TOwner | TWaiter)?.username}
                      </b>
                    </>
                  ),
                }}
              >
                {userType === EUserType.CLIENT ? "Name: " : ""}
                <b>
                  {(user as TClient)?.name ??
                    (user as TOwner | TWaiter)?.username}
                </b>
              </Typography.Text>
            </div>
            <div className="page-card-layout__card-header-title">
              Coffee Order Machine
            </div>
            <div className="page-card-layout__card-header-box">
              {headerRightContent}
            </div>
          </header>
          <main
            className={`page-card-layout__card-content${contentClassName ? ` ${contentClassName}` : ""}`}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export { PageCardLayout };
