import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  FormOutlined,
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  CopyOutlined
} from '@ant-design/icons';
import '../Styles/SideBar.css';
import logo from '../images/healthymood-logo.png';
import smallLogo from '../images/healthymood-small.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => { setCollapsed(!collapsed); };

  return (
    <Sider
      style={{ width: '500px' }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => { onCollapse(); }}>
      <div className='logo-container'>
        <Link to='/' className='logo'>
          <img src={collapsed ? smallLogo : logo} alt='HealthyMood' />
        </Link>
      </div>
      <Menu theme='dark' defaultSelectedKeys={['0']} mode='inline'>
        <Menu.Item key='0' icon={<BarChartOutlined />}>
          <Link to='/'>
            Dashboard
          </Link>
        </Menu.Item>
        <SubMenu key='sub1' icon={<FormOutlined />} title='Articles'>
          <Menu.Item key='1'>
            <Link exact to='/articles'>Nos articles</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link exact to='/addArticle'>Ajouter</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<FormOutlined />} title='Recettes'>
          <Menu.Item key='3' icon={<FormOutlined />}>
            <Link to='/recipes'>
              Nos recettes
          </Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<FormOutlined />}>
            <Link to='/addRecipes'>
              Ajouter
              </Link>
          </Menu.Item>
        </SubMenu>


        <SubMenu key='sub2' icon={<BookOutlined />} title='Catégories'>
          <Menu.Item key='5'>
            <Link to='/categories-articles'>
              Catégories articles
            </Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to='/categories-recettes'>
              Catégories recettes
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='7' icon={<FormOutlined />}>
          <Link to='/ingredients'>
            Ingrédients
          </Link>
        </Menu.Item>
        <Menu.Item key='9' icon={<FormOutlined />}>
          <Link to='/types-plats'>
            Types de plats
          </Link>
        </Menu.Item>
        <Menu.Item key='11' icon={<FormOutlined />}>
          <Link to='/types-repas'>
            Types de repas
          </Link>
        </Menu.Item>
        <Menu.Item key='13' icon={<FormOutlined />}>
          <Link to='/regimes'>
            Tous les Régimes
          </Link>
        </Menu.Item>
        <SubMenu key='sub7' icon={<FormOutlined />} title='Pages'>
          <Menu.Item key='15' icon={<CopyOutlined />}>
            <Link to='/pages'>
              Nos pages
          </Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<FormOutlined />}>
            <Link to='/addPages'>
              Ajouter
              </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='17' icon={<TeamOutlined />}>
          <Link to='/utilisateurs'>
            Gérer les utilisateurs
          </Link>
        </Menu.Item>
        <Menu.Item key='18' icon={<UserOutlined />}>
          <Link to='/mon-profil'>
            Mon Profil
          </Link>
        </Menu.Item>
      </Menu>
    </Sider >

  );
};

export default SideBar;
