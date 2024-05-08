import Persons from '../../src/models/person.model'
import { characters } from './data/characters.data'

export const createPerson = async (username: string) => {
    const person = await Persons.create(characters[username].person)
    return person.personId
}
