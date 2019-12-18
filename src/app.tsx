import React from 'react';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer';
import Routes from './routes';
import FloatingAlert from './components/FloatingAlert';

const App: React.FC = () => {
  return (
    <>
      {/* <FloatingAlert /> */}
      <Container>
        <Navbar />
        <Jumbotron />

        <main className="my-3">
          <Routes />
        </main>

        <Footer />
      </Container>
    </>
  );
};

export default App;
