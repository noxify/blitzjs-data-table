import db from "./index"

import faker from "faker"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 100; i++) {
    await db.testData.create({
      data: {
        title: faker.lorem.words(3),
        date: faker.date.past(1),
        field1: faker.lorem.word(),
      },
    })
  }
}

export default seed
