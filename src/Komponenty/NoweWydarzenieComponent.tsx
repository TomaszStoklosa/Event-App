import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { EventType, Event } from '../types.ts';
import { addEvent } from '../actions.ts';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../validationSchema.js';
import withBackButton from './Layout.tsx';

interface Props {
  addEvent: (eventData: Event) => void;
}

const KomponentFormularzaDodawania: React.FC<Props> = ({ addEvent }) => {
  const navigate = useNavigate();
  const currentDateTime = new Date().toISOString().slice(0, 16);
  
  return (
    <div className="form-container">
      <h2 className="form-title">Nowe wydarzenie</h2>
      <Formik
        initialValues={{
          title: '',
          date: currentDateTime,
          description: '',
          image: '',
          eventType: EventType.Rekrutacja,
          phoneNumber: '',
          email: '',
          location: '',
          id: uuidv4()
        }}
        validationSchema={validationSchema}
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
        {({ isSubmitting, resetForm, dirty, errors, touched }) => (
          <Form>
            <Field
              className="form-input"
              type="text"
              name="title"
              label="Tytuł"
              as={TextField}
              fullWidth
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title ? errors.title : ''}
            />
            <Field
              className="form-input"
              type="datetime-local"
              name="date"
              label="Data i czas"
              as={TextField}
              fullWidth
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date ? errors.date : ''}
            />
            <Field
              className="form-input"
              type="text"
              name="description"
              label="Opis"
              as={TextField}
              multiline
              rows={4}
              fullWidth
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description ? errors.description : ''}
            />
            <Field
              className="form-input"
              type="url"
              name="image"
              label="Link do obrazka"
              as={TextField}
              fullWidth
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image ? errors.image : ''}
            />
            <FormControl className="form-input" fullWidth>
              <InputLabel id="event-type-label">Rodzaj wydarzenia</InputLabel>
              <Field
                as={Select}
                labelId="event-type-label"
                id="event-type"
                name="eventType"
                fullWidth
                error={touched.eventType && Boolean(errors.eventType)}
              >
                <MenuItem value={EventType.Sport}>Sport</MenuItem>
                <MenuItem value={EventType.Kultura}>Kultura</MenuItem>
                <MenuItem value={EventType.Zdrowie}>Zdrowie</MenuItem>
                <MenuItem value={EventType.Rekrutacja}>Rekrutacja</MenuItem>
              </Field>
            </FormControl>
            <Field
              className="form-input"
              type="tel"
              name="phoneNumber"
              label="Nr telefonu kontaktowego"
              as={TextField}
              fullWidth
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber ? errors.phoneNumber : ''}
            />
            <Field
              className="form-input"
              type="email"
              name="email"
              label="Adres e-mail kontaktowy"
              as={TextField}
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email ? errors.email : ''}
            />
            <Field
              className="form-input"
              type="text"
              name="location"
              label="Miejsce wydarzenia"
              as={TextField}
              fullWidth
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location ? errors.location : ''}
            />
            <div className="form-button">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => resetForm()}
                disabled={!dirty}
              >
                Wyczyść
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !dirty}
              >
                Dodaj Wydarzenie
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

export default withBackButton(connect(null, mapDispatchToProps)(KomponentFormularzaDodawania));
