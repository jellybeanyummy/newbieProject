import react, { Component } from 'react';
import { Header } from 'components'

class App extends Component {
  render() {
    let re = /(login|register)/;
    let isAuth = re.test(this.props.location.pathname);

    return (
      <div>
        {isAuth ? undefined : <Header /> }
      </div>
    );
  }
}

export default App;
