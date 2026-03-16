import { Payload } from "payload";
import { fakerNL, fakerEN, Faker, faker } from "@faker-js/faker";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { richTextLorem, indexToFunction } from "./utils";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default async function(p: Payload) {
    // Boards
    const logo = await p.create({
        collection: "media",
        data: { alt: "Sticky logo" },
        filePath: path.resolve(dirname, "assets", "logo.png")
    });

    const d = new Date();
    const currentYear = d.getFullYear() - (d.getMonth() <= 7 ? 1 : 0);
    p.logger.info(`Creating ${currentYear - 2005} boards`);
    for (let year = 2006; year <= currentYear; year++) {
        const filePath = path.resolve(dirname, "assets", `b${year -  2005}.jpg`);
        await fetch(faker.image.urlPicsumPhotos() + ".jpg")
            .then(resp => resp.bytes())
            .then(buf => writeFile(filePath, buf));
        const boardPicture = await p.create({
            collection: "media",
            data: { alt: `Board ${year - 2005}` },
            filePath
        });

        const board = await p.create({
            collection: "main-board",
            data: {
                board_number: year - 2005,
                year: `${year}-${year + 1}`,
                colour: fakerNL.color.rgb(),
                zinspreuk: fakerNL.lorem.sentence(4),
                picture: boardPicture,
                enable_personal_texts: year >= 2024,
                board_members: Array(6).fill(null).map((_, i) => ({
                    name: fakerNL.person.fullName(),
                    function: indexToFunction(i, "nl"),
                    picture: year >= 2024 ? logo : undefined,
                    description: year >= 2024 ? richTextLorem(fakerNL, { min: 1, max: 2 }) : undefined
                }))
            },
            draft: false,
            locale: "nl"
        });

        await p.update({
            collection: "main-board",
            id: board.id,
            data: {
                ...board,
                board_members: board.board_members.map((m, i) => ({
                    ...m,
                    function: indexToFunction(i, "en"),
                    description: year >= 2024 ? richTextLorem(fakerEN, { min: 1, max: 2 }) : undefined
                }))
            },
            locale: "en",
            draft: false
        });
    }

    // Committees
    const nCommittees = faker.number.int({ min: 5, max: 10 });
    p.logger.info(`Creating ${nCommittees} committees`);
    for (let i = 0; i < nCommittees; i++) {
        const name = fakerNL.company.name();
        const committee = await p.create({
            collection: "main-committee",
            data: {
                name, slug: name.replaceAll(/\W+/g, "-").toLowerCase(),
                logo,
                about: richTextLorem(fakerNL, { min: 1, max: 3 })
            },
            draft: false,
            locale: "nl"
        });

        await p.update({
            collection: "main-committee",
            id: committee.id,
            data: {
                ...committee,
                name: fakerEN.company.name(),
                about: richTextLorem(faker, { min: 1, max: 3 })
            },
            locale: "en",
            draft: false
        });
    }

    // News items
    const newsItemDates = faker.date.betweens({
        from: new Date(),
        to: new Date(),
        count: faker.number.int({ min: 15, max: 25 })
    });
    p.logger.info(`Creating ${newsItemDates.length} news items`);
    for (const date of newsItemDates) {
        const newsItem = await p.create({
            collection: "main-news-item",
            data: {
                title: fakerNL.book.title(),
                content: richTextLorem(faker, { min: 2, max: 5 }),
                createdAt: date.toString(),
                updatedAt: date.toString(),
            },
            draft: false,
            locale: "nl"
        });

        await p.update({
            collection: "main-news-item",
            id: newsItem.id,
            data: {
                ...newsItem,
                title: fakerEN.book.title(),
                content: richTextLorem(fakerEN, { min: 2, max: 5 })
            },
            locale: "en",
            draft: false
        });
    }

    // Stats
    p.logger.info(`Creating front page stats`);
    const stats = await p.updateGlobal({
        slug: "main-stats",
        data: {
            stats: [{
                target: faker.number.int({ min: 1, max: 2000 }),
                unit: "+",
                include_unit_in_animation: false,
                description: "leden"
            }, {
                target: nCommittees,
                description: "commissies",
            }, {
                target: currentYear - 2005,
                unit: "jaar",
                description: "sinds de geboorte"
            }]
        },
        locale: "nl"
    });

    p.updateGlobal({
        slug: "main-stats",
        data: {
            stats: [{
                ...stats.stats[0],
                description: "members",
                unit: "+"
            }, {
                ...stats.stats[1],
                description: "committees"
            }, {
                ...stats.stats[2],
                unit: "years",
                description: "since the birth"
            }]
        },
        locale: "en"
    });

    // Hero
    const nPictures = faker.number.int({ min: 3, max: 6 });
    p.logger.info(`Creating front page hero with ${nPictures} pictures`);
    const heroPictures = await Promise.all(
        Array(nPictures)
            .fill(null)
            .map((_, i) => fetch(faker.image.urlPicsumPhotos() + ".jpg")
                .then(resp => resp.bytes())
                .then(async buf => {
                    const filePath = path.resolve(dirname, "assets", `hero-${i}.jpg`);
                    await writeFile(filePath, buf);

                    return p.create({
                        collection: "media",
                        data: { alt: fakerNL.word.words({ count: { min: 3, max: 5 } }) },
                        filePath
                    });
                })
            )
    );

    const hero = await p.updateGlobal({
        slug: "main-hero",
        data: {
            content: richTextLorem(fakerNL, { min: 1, max: 1 }),
            pictures: heroPictures,
            buttons: Array(faker.number.int({ min: 0, max: 3 }))
                .fill(null)
                .map(_ => ({
                    label: fakerNL.hacker.noun(),
                    link: fakerNL.internet.url()
                }))
        },
        locale: "nl"
    });

    await p.updateGlobal({
        slug: "main-hero",
        data: {
            ...hero,
            content: richTextLorem(fakerEN, { min: 1, max: 1 }),
            buttons: hero.buttons!.map(btn => ({
                ...btn,
                label: fakerEN.hacker.noun()
            }))
        },
        locale: "en"
    });
}