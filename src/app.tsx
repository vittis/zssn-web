import React from 'react';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer';
import Routes from './routes';
import FloatingAlert from './components/FloatingAlert';
import { BrowserRouter as Router } from 'react-router-dom';
import { useError } from './store/ducks/error/hooks';

const App: React.FC = () => {
  const { error, clearErrors } = useError();

  return (
    <>
      <Router>
        {error.requestError && <FloatingAlert message={error.message} clear={clearErrors} />}
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
