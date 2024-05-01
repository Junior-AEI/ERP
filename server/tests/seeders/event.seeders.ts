import Events from '../../src/models/event.model'
import { events } from './data/events.data'

export const createEvent = async (name: string) => {

    const event = await Events.create({
        name: events[name].name,
        location: events[name].location,
        description: events[name].description,
        startDate: events[name].startDate,
        endDate: events[name].endDate,
        eventTypeName: events[name].eventTypeName,
    });
    return event.eventId;
    
}