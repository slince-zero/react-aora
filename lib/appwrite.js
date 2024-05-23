import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from 'react-native-appwrite'
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.sm.reactaora',
  projectId: '664e9f9b001b0fcb9684',
  databaseId: '664ea0d70038d02324ee',
  userCollectionId: '664ea107003bcdd15d5e',
  videoCollectionId: '664ea168001e063cf34e',
  storageId: '664ea49800325f8c1bcd',
}
// Init your React Native SDK
const client = new Client()

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const database = new Databases(client)

export const createUser = async (username, email, password) => {
  // Register User
  try {
    const newAccout = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccout) throw new Error('User not created')

    // Create user avatar
    const avatar = avatars.getInitials(username)

    await loginUser(email, password)

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccout.$id,
        username,
        email,
        avatar,
      }
    )
    return newUser
  } catch (e) {
    console.log(e, 'err')
  }
}

export const loginUser = async (email, password) => {
  try {
    const session = await account.createSession(email, password)
    return session
  } catch (e) {
    console.log(e, 'err')
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error('No Account!')

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error('No User!')
    return currentUser.documents[0]
  } catch (e) {
    console.log(e)
  }
}
