import { Field, TextField } from "payload";

export const url_field = (f: Omit<TextField, "type">): Field => 
    Object.assign(f, {
        type: "text",
        validate: (value: string | null | undefined) => {
            if (!value) return "No value";
            if (/^(\/\w*)+/.test(value)) {
                return true;
            } else {
                try {
                    const url = new URL(value);
                    if (!(url.protocol === "http:" || url.protocol === "https:"))
                        return "Invalid protocol";
                    return true;
                } catch {
                    return "Invalid URL";
                }
            }
        }
    }) as any;