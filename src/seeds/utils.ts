import { Faker } from "@faker-js/faker";

export function richTextLorem(faker: Faker, { min, max }: { min: number, max: number }) {
    return {
        root: {
            type: "root",
            children: [{
                type: "paragraph",
                children: faker.lorem.paragraphs({ min, max })
                    .split("\n")
                    .map(text => ({
                        type: "text",
                        text,
                        version: 1,
                        format: "" as const,
                        mode: "normal" as const,
                        style: ""
                    })),
                version: 1,
                indent: 0,
                format: "" as const
            }],
            version: 1,
            indent: 0,
            format: "" as const,
            direction: "ltr" as const
        }
    };
}

export function indexToFunction(index: number, lang: "nl" | "en") {
    switch (index) {
        case 0: return lang === "nl" ? "Voorzitter" : "Chair";
        case 1: return lang === "nl" ? "Secretaris" : "Secretary";
        case 2: return lang === "nl" ? "Penningmeester" : "Treasurer";
        case 3: return lang === "nl" ? "Commissaris Intern" : "Commissioner of Internal Affairs";
        case 4: return lang === "nl" ? "Commissaris Extern" : "Commissioner of External Affairs";
        case 5: return lang === "nl" ? "Commissaris Onderwijs" : "Commissioner of Educational Affairs";
        default: return "";
    }
}