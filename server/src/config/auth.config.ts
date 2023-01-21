import { createSecretKey } from "crypto";

const JWT_ISSUER = "AEI";
const JWT_AUDIENCE = "*";
const JWT_SECRET = "6wEpZ$4qx*E8eK8@vsm2Qt6k93nYMNTi*WU#c*&#B4a2QvxB*L8LuNvVF@rzR%@4J#E2Tv#2cYxmd$6&ExDPX2jRR*5P^4vb*p4ysi&wqpqCpGn2K*9mdCDnA6AH7bt5";
const JWT_EXPIRATION = "1 week";
const JWT_SECRET_KEY = createSecretKey(JWT_SECRET as string, "utf-8");

export { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET, JWT_EXPIRATION, JWT_SECRET_KEY };
