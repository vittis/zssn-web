import React from 'react';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <Jumbotron />

      <main className="my-3 text-center"> bismani</main>

      <Footer />
    </Container>
  );
};

export default App;
