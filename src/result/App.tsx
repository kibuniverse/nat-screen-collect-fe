import { Switch, Route } from '@modern-js/runtime/router';
import CollectInfo from './pages/collect-info';
import 'antd-mobile/es/global';

const App = () => (
  <Switch>
    <Route path="/">
      <CollectInfo />
    </Route>
  </Switch>
);

export default App;
