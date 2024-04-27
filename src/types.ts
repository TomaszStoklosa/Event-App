export interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string; 
    eventType: EventType; 
    phoneNumber: string; 
    email: string; 
    location: string; 
}
  
export enum EventType {
    Sport = 'Sport',
    Kultura = 'Kultura',
    Zdrowie = 'Zdrowie',
    Rekrutacja = 'Rekrutacja'
}
  
export interface EventsState {
    events: Event[] | null;
    event: Event | null;
    error: string | null;
}

interface RootState {
    events: EventsState;
}

export { RootState };
