import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from './actions.ts';
import { Event } from './types.ts';
import { Button, List, ListItem, ListItemText } from '@mui/material';

interface KomponentListyWydarzenProps {
  events: Event[] | null;
  error: string | null;
  fetchEvents: () => void;
}

const KomponentListyWydarzen: React.FC<KomponentListyWydarzenProps> = ({ events, error, fetchEvents }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEvents();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleAddEvent = () => {
    navigate('/addEvent'); 
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div>
      <h2>Lista Wydarzeń</h2>
      {loading && <p>Ładowanie danych...</p>}
      {error && <p>Błąd: {error}</p>}
      {!loading && (
        <div>
          {events && events.length > 0 ? (
           <List>
           {events.map(event => (
             <ListItem key={event.id} button onClick={() => handleEventClick(event.id)}>
               <ListItemText primary={event.title} secondary={event.date} />
             </ListItem>
           ))}
         </List>
          ) : (
            <p>Brak dostępnych wydarzeń.</p>
          )}
        </div>
      )}
       <Button variant="contained" color="primary" onClick={handleAddEvent}>
        Dodaj Wydarzenie
      </Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  events: state.events,
  error: state.events.error
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(KomponentListyWydarzen);
