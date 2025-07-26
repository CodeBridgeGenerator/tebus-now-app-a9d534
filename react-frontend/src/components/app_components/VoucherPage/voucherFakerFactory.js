
import { faker } from "@faker-js/faker";
export default (user,count,categoryIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
id: faker.lorem.sentence(""),
categoryId: categoryIdIds[i % categoryIdIds.length],
points: faker.lorem.sentence(""),
title: faker.lorem.sentence(""),
image: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
termsAndCondition: faker.lorem.sentence(""),
isLatest: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
