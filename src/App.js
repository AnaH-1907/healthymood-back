import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  privateRoute
} from 'react-router-dom';
import { Layout } from 'antd';
import './Styles/App.css';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Recipes from './pages/Recipes';
import CategoryArticles from './pages/CategoryArticles';
import CategoryRecipes from './pages/CategoryRecipes';
import Ingredients from './pages/Ingredients';
import Dishes from './pages/Dishes';
import Meals from './pages/Meals';
import Diets from './pages/Diets';
import Pages from './pages/Pages';
import Users from './pages/Users';
import AdminProfil from './pages/AdminProfil';
import AdminConnection from './pages/AdminConnection';

const { Content } = Layout;

function App () {
  return (
    <div className='App'>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar />
          <Layout className='site-layout'>
            <TopBar />
            <Content style={{ margin: '0 16px' }}>
              <Switch>
                <Route exact path='/connexion' component={AdminConnection} />
                <privateRoute exact path='/' component={Home} />
                <privateRoute exact path='/articles' component={Articles} />
                <privateRoute exact path='/recettes' component={Recipes} />
                <privateRoute
                  exact
                  path='/categories-articles'
                  component={CategoryArticles}
                />
                <privateRoute
                  exact
                  path='/categories-recettes'
                  component={CategoryRecipes}
                />
                <privateRoute
                  exact
                  path='/ingredients'
                  component={Ingredients}
                />
                <privateRoute exact path='/types-plats' component={Dishes} />
                <privateRoute exact path='/types-repas' component={Meals} />
                <privateRoute exact path='/regimes' component={Diets} />
                <privateRoute exact path='/pages' component={Pages} />
                <privateRoute exact path='/utilisateurs' component={Users} />
                <privateRoute
                  exact
                  path='/mon-profil'
                  component={AdminProfil}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
