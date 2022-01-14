import { Switch, Route } from '@modern-js/runtime/router';
import './App.css';
import Upload from './pages/upload';
import CollectInfo from './pages/collect-info';
import 'antd-mobile/es/global';

const App = () => (
  <Switch>
    <Route path="/">
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
