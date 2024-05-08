import Documents from '../../src/models/document.model'
import { documents } from './data/documents.data'
import { createUser } from './user.seeders'
import DocumentTypes from '../../src/models/documentType.model'

export const createDocument = async (n: number, username: string) => {
    const doc = 'doc' + n

    const userId = await createUser(username)

    const type = await DocumentTypes.create({
        ...documents[doc].documentType
    })

    const document = await Documents.create({
        typeId: type.typeId,
        authorId: userId,
        path: documents[doc].path,
        version: documents[doc].version,
        information: documents[doc].information,
        status: documents[doc].status
    })

    return document.documentId
}
