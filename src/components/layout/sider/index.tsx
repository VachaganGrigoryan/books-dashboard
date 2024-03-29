import React, { useState } from 'react';

import { useLogout, useTitle, useNavigation } from '@pankod/refine-core';
import { AntdLayout, Menu, Grid, Icons, useMenu } from '@pankod/refine-antd';
import { antLayoutSider, antLayoutSiderMobile } from './styles';

const { RightOutlined, LogoutOutlined } = Icons;

export const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { mutate: logout } = useLogout();
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();
  const { push } = useNavigation();
  const breakpoint = Grid.useBreakpoint();

  const isMobile = !breakpoint.lg;

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      {Title && <Title collapsed={collapsed} />}
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={({ key }) => {
          if (key === 'logout') {
            logout();
            return;
          }

          if (!breakpoint.lg) {
            setCollapsed(true);
          }

          push(key as string);
        }}
      >
        {menuItems.map(({ icon, label, route }) => {
          const isSelected = route === selectedKey;
          return (
            <Menu.Item
              style={{
                fontWeight: isSelected ? 'bold' : 'normal',
              }}
              key={route}
              icon={icon}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {label}
                {!collapsed && isSelected && <RightOutlined />}
              </div>
            </Menu.Item>
          );
        })}

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </AntdLayout.Sider>
  );
};
