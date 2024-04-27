import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { EventType } from './types.ts';
import { addEvent } from './actions.ts';
import { v4 as uuidv4 } from 'uuid';

const KomponentFormularzaDodawania = ({ addEvent }) => {
  const navigate = useNavigate();

  const handleBackEvent = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Formularz Dodawania Wydarzenia</h2>
      <Formik
        initialValues={{
          title: '',
          date: '',
          description: '',
          image: '',
          eventType: '',
          phoneNumber: '',
          email: '',
          location: '',
          id: uuidv4()
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addEvent(values);
            navigate('/');
          } catch (error) {
            console.error('Error adding event:', error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, resetForm, dirty }) => (
          <Form>
            <Field className="form-input" type="text" name="title" label="Tytuł" as={TextField} fullWidth />
            <Field className="form-input" type="datetime-local" name="date" label="Data i czas" as={TextField} fullWidth />
            <Field className="form-input" type="text" name="description" label="Opis" as={TextField} multiline rows={4} fullWidth />
            <Field className="form-input" type="url" name="image" label="Link do obrazka" as={TextField} fullWidth />
            <FormControl className="form-input" fullWidth>
              <InputLabel id="event-type-label">Rodzaj wydarzenia</InputLabel>
              <Field
                as={Select}
                labelId="event-type-label"
                id="event-type"
                name="eventType"
                fullWidth
              >
                <MenuItem value={EventType.Sport}>Sport</MenuItem>
                <MenuItem value={EventType.Kultura}>Kultura</MenuItem>
                <MenuItem value={EventType.Zdrowie}>Zdrowie</MenuItem>
              </Field>
            </FormControl>
            <Field className="form-input" type="tel" name="phoneNumber" label="Nr telefonu kontaktowego" as={TextField} fullWidth />
            <Field className="form-input" type="email" name="email" label="Adres e-mail kontaktowy" as={TextField} fullWidth />
            <Field className="form-input" type="text" name="location" label="Miejsce wydarzenia" as={TextField} fullWidth />
            <div className="form-button">
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting ||!dirty}>
                Dodaj Wydarzenie
              </Button>
              <Button variant="contained" color="secondary" onClick={handleBackEvent}>
                Wstecz
              </Button>
              <Button variant="contained" color="secondary" onClick={() => resetForm()}  disabled={!dirty}>
                Wyczyść
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addEvent: eventData => dispatch(addEvent(eventData))
});

export default connect(null, mapDispatchToProps)(KomponentFormularzaDodawania);
