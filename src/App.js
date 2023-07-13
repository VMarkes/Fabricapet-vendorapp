import Rotas from "./Rotas";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./pages/contexts/auth";

function App() {
  return (
    <div>
      <AuthProvider>
          <ToastContainer  />
          <Rotas />
      </AuthProvider>
    </div>
  )
  
}

export default App;
