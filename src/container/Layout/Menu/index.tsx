import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";

import { useLocation } from "react-router-dom";

import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MenuLayout = ({ arrRouter, collapsed }: any) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [defaultOpenKey, setDefaultOpenKey] = useState("");
  const [openKey, setOpenKey] = useState("");
  useEffect(() => {
    const arrPath = location.pathname.split("/");
    const total = (arrPath || []).length;
    // if (total === 2) {
    //   setSelectedKey(arrPath[1]);
    //   setOpenKey("")
    //   setDefaultOpenKey("")
    // } else if (total > 2) {
    //   setSelectedKey(arrPath[2]);
    //   setDefaultOpenKey(arrPath[1])
    //   setOpenKey(arrPath[1])
    // } else {
    //   setSelectedKey("");
    //   setDefaultOpenKey("")
    //   setOpenKey("")
    // }
    let findDataRouter = []
    if(total > 1){
      findDataRouter = (arrRouter || []).filter((e: any) => e.path === arrPath[1])
    }
    if (total > 1 && findDataRouter[0].subMenu.length === 0 ) {
      setSelectedKey(arrPath[1]);
      setOpenKey("")
      setDefaultOpenKey("")
    } else if (total > 2 && findDataRouter[0].subMenu.length > 0) {
      setSelectedKey(arrPath[2]);
      setDefaultOpenKey(arrPath[1])
      setOpenKey(arrPath[1])
    } else {
      setSelectedKey("");
      setDefaultOpenKey("")
      setOpenKey("")
    } 
  }, [location]);

  let onOpenChangeMenu = (e: any) => {
    let totalArr = e && e.length
    if(totalArr === 0) {
      setOpenKey("")
    } 
    else {
      setOpenKey(e[1])
    }
  }
  return (
    <Sider width={200} className="site-layout-background" trigger={null} collapsible collapsed={collapsed}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['pages']}
        openKeys={[openKey]}
        onOpenChange={(e) => onOpenChangeMenu(e)}
        
        style={{ height: "100%", borderRight: 0 }}
      >
        {(arrRouter || []).map((e: any, i: number) => {
          return e.subMenu.length ? (
            <SubMenu key={e.key} icon={<MailOutlined />} title={e.title}>
              {e.subMenu.map((k: any, i: number) => (
                k.isMenu &&
                <Menu.Item key={k.key}>
                  <Link to={k.path}>{k.title}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            e.isMenu && <Menu.Item key={e.key} icon={<PieChartOutlined />}>
              <Link to={e.path}>{e.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default MenuLayout;
