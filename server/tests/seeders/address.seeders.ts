import Addresses from '../../src/models/address.model'
import { characters } from './data/characters.data'

export const createdAddress = async (username: string) => {
    const address = await Addresses.create(characters[username].address)
    return address.addressId
}
