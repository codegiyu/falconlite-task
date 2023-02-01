import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './style.scss';
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import Success from "./pages/Success";
import NoPage from "./pages/NoPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Alert from "./components/Alert";



const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Alert />
      </ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/email-verification/" element={<EmailVerification />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
