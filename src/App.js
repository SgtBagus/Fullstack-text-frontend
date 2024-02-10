import { Component } from "react";
import { NotificationContainer } from 'react-notifications';

import RouterComponents from "./Routes/RoutesComponents"
import { AuthContextProvider } from "./Context/AuthContext";

import { BrowserRouter } from "react-router-dom";

import 'react-notifications/lib/notifications.css';

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
          <BrowserRouter basename="/">
            <RouterComponents />
  
            <NotificationContainer />
          </BrowserRouter>
      </AuthContextProvider>
    )
  }
}

export default App
