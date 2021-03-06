import { Switch, Route } from '@modern-js/runtime/router';
import Upload from './pages/upload';
import 'antd-mobile/es/global';
import ResultPage from './pages/result';

const App = () => (
  <Switch>
    <Route exact={true} path="/">
      <Upload />
    </Route>
    <Route path="/success">
      <ResultPage />
    </Route>
  </Switch>
);

export default App;
