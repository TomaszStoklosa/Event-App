import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEvent } from './actions.ts';
import { Event as CustomEvent } from "./types.ts";
import { Button, Paper, Typography, Grid } from '@mui/material';

interface KomponentWydarzeniaProps {
  event: CustomEvent | null;
  error: string | null; 
  fetchEvent: (id: string) => void;
}

const KomponentWydarzenia: React.FC<KomponentWydarzeniaProps> = ({ event, error, fetchEvent }) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
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
  }, []); 

  const handleBackEvent = () => {
    navigate('/'); 
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: '20px' }}>
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
            </div>
          ) : (
            <Typography variant="body1">Wydarzenie nie zostało znalezione.</Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleBackEvent}>
            Wstecz
          </Button>
        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(KomponentWydarzenia);
