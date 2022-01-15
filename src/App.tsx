import { Switch, Route } from '@modern-js/runtime/router';
import Upload from './pages/upload';
import CollectInfo from './pages/collect-info';
import 'antd-mobile/es/global';
import './App.css';

const App = () => (
  <Switch>
    <Route exact={true} path="/">
      <Upload />
    </Route>
    <Route path="/collect-info">
      <CollectInfo />
    </Route>
    <Route path="*">
      <div>404</div>
    </Route>
  </Switch>
);

export default App;
