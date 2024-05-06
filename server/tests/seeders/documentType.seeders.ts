import DocumentTypes from "../../src/models/documentType.model";
import { documentTypes } from "./data/documentTypes.data";

export const createDocumentType = async (type: string) => {
    
    const docType = await DocumentTypes.create({
        ...documentTypes[type],
    })

    return docType.typeId
}