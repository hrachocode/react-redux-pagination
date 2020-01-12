import React from 'react';
import { Switch } from 'react-router-dom';
import Header from './Header';
import { RouteWithSubRoutes } from '../utils';
import { routerConfig } from '../configs/routerConfig';

const App = () => {
      return (
            <div className='container'>
                  <Header />
                  <Switch>
                        {routerConfig.map((route, i) => (
                              <RouteWithSubRoutes key={i} {...route} />
                        ))}
                  </Switch>
            </div>
      );
}

export default App;