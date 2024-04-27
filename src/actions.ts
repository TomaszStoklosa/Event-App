import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {  AnyAction } from 'redux';
import {RootState} from './types';


export enum ActionTypes {
    FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS',
    FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE',
    FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS',
    FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE',
    ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS',
    ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE',
  }
  
  export type Action =
    | { type: ActionTypes.FETCH_EVENTS_SUCCESS; payload: any }
    | { type: ActionTypes.FETCH_EVENTS_FAILURE; payload: string }
    | { type: ActionTypes.FETCH_EVENT_SUCCESS; payload: any }
    | { type: ActionTypes.FETCH_EVENT_FAILURE; payload: string }
    | { type: ActionTypes.ADD_EVENT_SUCCESS }
    | { type: ActionTypes.ADD_EVENT_FAILURE; payload: string };

// Akcja do pobierania danych o wydarzeniach
export const fetchEvents = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch<Action>) => {
      try {
        const response = await fetch('http://localhost:3002/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: ActionTypes.FETCH_EVENTS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: ActionTypes.FETCH_EVENTS_FAILURE, payload: error.message });
      }
    };
  };
  
export const fetchEvent = (eventId: string) => {
    return async (dispatch: Dispatch<Action>) => {
      try {
        console.log(eventId);
        const response = await fetch(`http://localhost:3002/event/${eventId}`); 
        const data = await response.json();
        dispatch({ type: ActionTypes.FETCH_EVENT_SUCCESS, payload: data }); 
      } catch (error) {
        dispatch({ type: ActionTypes.FETCH_EVENT_FAILURE, payload: error.message }); 
      }
    };
  };

  export const addEvent = (eventData) => {
    return async (dispatch) => {
      try {
        await fetch('http://localhost:3002/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(eventData)
        });
        dispatch({ type: ActionTypes.ADD_EVENT_SUCCESS });
      } catch (error) {
        dispatch({ type: ActionTypes.ADD_EVENT_FAILURE, payload: error.message });
      }
    };
  };
  
