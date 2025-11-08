import { serialize, parse } from "../utils/json.utils";
import path from "node:path";

export function isAdmin(id:number): boolean {
    if (id === 1) {
        return true;
    }   
    return false;
};