import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !category || !amount || !date) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (isNaN(amount)) {
      setError('El monto debe ser un número');
      return;
    }
    addExpense({ description, category, amount: parseFloat(amount), date });
    setDescription('');
    setCategory('');
    setAmount('');
    setDate('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAmount">
        <Form.Label>Monto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar Gasto
      </Button>
    </Form>
  );
};

export default ExpenseForm;
