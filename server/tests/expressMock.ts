import { Request, Response } from "express";
import { vi } from "vitest";

export const mockRequest = (params = {}, body = {}, query = {}): Request => {
    return {
        params,
        body,
        query,
    } as Request;
};

export const mockResponse = (): Response => {
    const res: Response = {
        locals: {},
    } as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};
