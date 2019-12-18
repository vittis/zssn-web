import React from 'react';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer';
import Routes from './routes';
import FloatingAlert from './components/FloatingAlert';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Router>
        {/* <FloatingAlert /> */}
        <Container>
          <Navbar />
          <Jumbotron />

          <main className="my-3">
            <Routes />
          </main>

          <Footer />
        </Container>
      </Router>
    </>
  );
};

export default App;
