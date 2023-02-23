import { AuthProvider } from "./src/context/AuthContext";

import NavigationIndex from "./src/components/Navigation/index";

const App = () => (
  <AuthProvider>
    <NavigationIndex />
  </AuthProvider>
);

export default App;
