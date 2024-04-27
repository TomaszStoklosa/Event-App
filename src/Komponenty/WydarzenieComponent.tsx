import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../actions.ts';
import { Event as CustomEvent } from "../types.ts";
import { Typography, Grid } from '@mui/material';
import withBackButton from './Layout.tsx';

interface KomponentWydarzeniaProps {
  event: CustomEvent | null;
  error: string | null;
  fetchEvent: (id: string) => void;
}

const KomponentWydarzenia: React.FC<KomponentWydarzeniaProps> = ({ event, error, fetchEvent }) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          await fetchEvent(id);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching event:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [fetchEvent, id]);

  return (
    <Grid className='container' container justifyContent="center">
      <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Szczegóły Wydarzenia
          </Typography>
          {loading && <p>Ładowanie danych...</p>}
          {error && <p>Błąd: {error}</p>}
          {!loading && event ? (
            <div>
              <Typography variant="h6" gutterBottom>
                Tytuł:
              </Typography>
              <Typography variant="body1">{event.title}</Typography>
              <Typography variant="h6" gutterBottom>
                Data:
              </Typography>
              <Typography variant="body1">{event.date}</Typography>
              <Typography variant="h6" gutterBottom>
                Opis:
              </Typography>
              <Typography variant="body1">{event.description}</Typography>
              <Typography variant="h6" gutterBottom>
                Link obrazka:
              </Typography>
              <Typography variant="body1">{event.image}</Typography>
              <Typography variant="h6" gutterBottom>
                Typ wydarzenia:
              </Typography>
              <Typography variant="body1">{event.eventType}</Typography>
              <Typography variant="h6" gutterBottom>
                Numer telefonu:
              </Typography>
              <Typography variant="body1">{event.phoneNumber}</Typography>
              <Typography variant="h6" gutterBottom>
                Email:
              </Typography>
              <Typography variant="body1">{event.email}</Typography>
              <Typography variant="h6" gutterBottom>
                Lokalizacja:
              </Typography>
              <Typography variant="body1">{event.location}</Typography>
            </div>
          ) : (
            <Typography variant="body1">Wydarzenie nie zostało znalezione.</Typography>
          )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  event: state.event,
  error: state.error
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchEvent: (id: string) => dispatch(fetchEvent(id))
});

export default withBackButton(connect(mapStateToProps, mapDispatchToProps)(KomponentWydarzenia));
