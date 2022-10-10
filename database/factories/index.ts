import Factory from "@ioc:Adonis/Lucid/Factory"
import Pet from "App/Models/Pet"
import Shelter from "App/Models/Shelter"
import { DateTime } from "luxon"

// import Factory from '@ioc:Adonis/Lucid/Factory'
export const PostFactory = Factory
  .define(Pet, ({ faker }) => {
      return {
      shelterId: 3,
      name: faker.name.fullName(),
      dob: DateTime.local(),
    }
  })
  .build()

export const UserFactory = Factory
  .define(Shelter, ({ faker }) => {
    return {
      name: faker.company.name(),
      address: faker.address.cityName(),
      telephone: faker.phone.number(),
      websiteUrl:faker.internet.url(),
    }
  })
  .relation('pets', () => PostFactory) // 👈
  .build()