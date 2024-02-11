import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';

import RouterComponents from "./Routes/RoutesComponents"

import { AuthContextProvider } from "./Context/AuthContext";
import { LoadingContextProvider } from "./Context/LoadingContext";


import 'react-notifications/lib/notifications.css';

class App extends Component {
  render() {
    return (
      <LoadingContextProvider>
        <AuthContextProvider>
            <BrowserRouter basename="/">
              <RouterComponents />
    
              <NotificationContainer />
            </BrowserRouter>
        </AuthContextProvider>
      </LoadingContextProvider>
    )
  }
}

export default App
