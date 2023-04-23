import { Request, Response } from "express";

export const getMockReq = (req: {} = {}): Request => {
    return req as Request;
};
export const getMockRes = (): Response => {
    const res = {} as Response;
    res["status"] = (statusCode) => {
        res.statusCode = statusCode;
        return res;
    };
    res["json"] = () => {
        return res;
    };
    return res;
};
