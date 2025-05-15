import { Card } from "antd";

import type { FC, PropsWithChildren, ReactNode } from "react";

import "./card-layout.scss";

type CardLayoutProps = {
  title?: string;
  topContent?: ReactNode;
  className?: string;
};

const CardLayout: FC<PropsWithChildren<CardLayoutProps>> = ({
  title,
  children,
  topContent,
  className,
}) => (
  <div className={`card-layout gradient-bg${className ? ` ${className}` : ""}`}>
    <img alt="coffee" className="card-layout__bg" src="/assets/coffee-bg.jpg" />

    {topContent ? (
      <div className="card-layout__top-content">{topContent}</div>
    ) : null}
    <Card title={title} variant="borderless">
      {children}
    </Card>
  </div>
);

export { CardLayout };
