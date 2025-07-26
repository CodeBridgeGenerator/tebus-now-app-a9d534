
import { faker } from "@faker-js/faker";
export default (user,count,voucherIdIds,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
id: faker.lorem.sentence(1),
voucherId: voucherIdIds[i % voucherIdIds.length],
userId: userIdIds[i % userIdIds.length],
Quantity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
