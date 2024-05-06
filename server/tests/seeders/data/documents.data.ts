export const documents: any = {

    // doc1
    'doc1': {
        path: '../docs/1.pdf',
        version: 1,
        information: 'yes|no|hello',
        status: 'Relu',
        documentType: {
            type: 'affiche',
            fieldNumber: 3,
            fieldMeaning: 'oui|non|bonjour',
        },
    },

    // doc2 
    "doc2": {
        path: '../docs/2.png',
        version: 2,
        information: 'hey|zut',
        status: 'A relire',
        documentType: {
            type: 'facture',
            fieldNumber: 2,
            fieldMeaning: 'salut|sapristi'
        },
    }
}