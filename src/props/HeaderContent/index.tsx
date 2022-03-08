import React from "react";
import { PageHeader } from "antd";
import {useNavigate} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './styles.scss'

const HeaderContent = ({title = '', subTitle = '', isGoBack = false, extra = <div/>}) => {
    const navigate = useNavigate()
  return (
    <PageHeader
      className="site-page-header"
      onBack={() => navigate(-1)}
      backIcon={isGoBack ? <ArrowLeftOutlined /> : false}
      title={title}
      subTitle={subTitle}
      extra={[extra]}
    />
  );
};

export default HeaderContent;
