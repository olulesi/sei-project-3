import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDb.js'
import Space from '../models/space.js'
import User from '../models/user.js'
import spaceData from './data/spaces.js'
import faker from 'faker'
import { tagCategories } from '../models/space.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')


    const users = [] // ! an array to push my 100 fake users into

    for (let index = 0; index < 40; index++) { // ! looping to created 300 users
      const username = faker.internet.userName() // ! generating a fake username
      const firstName = faker.name.firstName() // ! A fake first name
      const lastName = faker.name.lastName() // ! A fake last name
      const email = `${firstName}${lastName}@email.com` // ! concatening them together to make the email
      const profileImage = faker.image.avatar() // ! and a fake profile image
      const tags = []
      const numberOfTags = Math.floor(Math.random() * 5)
      for (let i = 0; i <= numberOfTags; i++) {
        const randomIndex = Math.floor(Math.random() * tagCategories.length)
        tags.push(tagCategories[randomIndex])
      }
      const favouriteTags = [...new Set(tags)]

      users.push({
        username,
        firstName,
        lastName,
        email,
        profileImage,
        password: 'pass', // ! setting all the passwords the same
        passwordConfirmation: 'pass',
        favouriteTags,
      })
    }

    const createdUsers = await User.create(users) // ! then pass that users array

    console.log(`🤖 Created ${createdUsers.length} users`)

    const spaceDataWithOwners = spaceData.map(space => {
      const randomIndex = Math.floor(Math.random() * users.length)
      space.owner = createdUsers[randomIndex]._id
      const numberOfFavourties = Math.floor(Math.random() * 4)
      const favourites = []
      for (let i = 0; i <= numberOfFavourties; i++) {
        const randomFavouriteIndex = Math.floor(Math.random() * users.length)
        favourites.push(createdUsers[randomFavouriteIndex]._id)
      }
      space.favouritedBy = favourites
      return space
    })

    // const spaceDataWithFavouriteOwners = spaceData.map(space => {
    //   const randomIndex = Math.floor(Math.random() * users.length)
    //   return space
    // })

    // const numberOfFavourties = Math.floor(Math.random() * 4)
    // for (let i = 0; i <= numberOfFavourties; i++) {
    //   const randomIndex = Math.floor(Math.random() * spaceData.length)
    //   tags.push(tagCategories[randomIndex])
    // }

    const spaces = await Space.create(spaceDataWithOwners)

    console.log(`🤖 ${spaces.length} spaces created`)


    await mongoose.connection.close()
    console.log('🤖 Goodbye')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)

    await mongoose.connection.close()
    console.log('🤖 Goodbye')
  }
}

seedDatabase()
