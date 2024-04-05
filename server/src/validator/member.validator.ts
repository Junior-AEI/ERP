// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidMember = (birthDate: any, birthPlace: any, nationality: any, promotion: any, contributionDate: any, department: any,
    ) => {
        const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateRegex.test(birthDate)) return {valid: 0, message: "Your birth date is not correcly formatted."};
        if(typeof birthPlace !== "string") return {valid: 0, message: "Your birth place is not correctly formatted."};
        if(birthPlace.length < 2 || birthPlace.length >= 30) return {valid: 0, message: "Your birth place size has to be bigger than 2 and smaller than 30"};
        if(typeof nationality !== "string") return {valid: 0, message: "Your nationality is not correctly formatted."};
        if(nationality.length != 3) return {valid: 0, message: "Your nationality size has to be 3"};
        if(typeof promotion !== "string") return {valid: 0, message: "Your promotion is not correctly formatted."};
        if(promotion.length != 4) return {valid: 0, message: "Your promotion size has to be 4"};
        if(nationality < "1920" || nationality > "9999") return {valid: 0, message: "Your promotion must be between 1920 and 9999"};
        if(!dateRegex.test(contributionDate)) return {valid: 0, message: "Your contribution date is not correcly formatted."};
        if(typeof department !== "string") return {valid: 0, message: "Your department is not correctly formatted."};
        
        return {valid: 1}
    
    }
    
    
    