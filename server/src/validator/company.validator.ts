// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidCompany = (name: any, legalEntity: any
    ) => {
        if(typeof name !== "string") return {valid: 0, message: "Your name is not correctly formatted."};
        if(name.length >= 40) return {valid: 0, message: "Your name size has to be smaller than 40"};
        if(typeof legalEntity !== "string") return {valid: 0, message: "Your legal entity is not correctly formatted."};
        if(legalEntity.length < 3 || legalEntity.length >= 40) return {valid: 0, message: "Your nationality size has to be bigger than 3 and smaller than 40"};
        
        return {valid: 1}
    }
    
    
    