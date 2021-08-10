import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Agree from './pages/Agree/Agree';
import NotFound from './pages/NotFound/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/agree" component={Agree} />
    <Route exact path="*" component={NotFound} />
    </Switch>
    <Footer/>
     </BrowserRouter>
    </>
  );
}

export default App;
