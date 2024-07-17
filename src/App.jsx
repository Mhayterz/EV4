import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav } from 'react-bootstrap';
import ExpenseForm from './components/ExpenseForm';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);

    const storedTheme = JSON.parse(localStorage.getItem('darkMode'));
    if (storedTheme !== null) {
      setDarkMode(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase())
  );

  const editExpense = (index, updatedExpense) => {
    const newExpenses = expenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    setExpenses(newExpenses);
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  return (
    <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} style={{ minHeight: '100vh' }}>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
        <Container>
          <Navbar.Brand href="#">Seguimiento de Gastos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Inicio</Nav.Link>
              <Nav.Link href="#">Enlace</Nav.Link>
            </Nav>
            <Button variant={darkMode ? 'light' : 'dark'} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="mb-4 mt-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ExpenseForm addExpense={addExpense} />
          </Col>
          <Col md={8}>
            <Row>
              {filteredExpenses.map((expense, index) => (
                <Col key={index} sm={12} md={6} lg={4} className="mb-3">
                  <Card className={darkMode ? 'bg-secondary text-light' : 'bg-light text-dark'}>
                    <Card.Body>
                      <Card.Title>{expense.description}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {expense.category}
                      </Card.Subtitle>
                      <Card.Text>
                        Monto: {expense.amount}
                        <br />
                        Fecha: {expense.date}
                      </Card.Text>
                      <Button variant="danger" onClick={() => deleteExpense(index)}>
                        Eliminar
                      </Button>
                      <Button variant="secondary" onClick={() => editExpense(index, { /* new expense data */ })} className="ms-2">
                        Editar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
