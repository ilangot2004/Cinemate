import { AllRoute } from "./routes/AllRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <AllRoute />
      {/* <main className="min-h-screen"></main> */}
      <Footer />
    </>
  );
};

export default App;
