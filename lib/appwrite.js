import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage, 
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
const storage = new Storage(client)

// Register user
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

// Login user
export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (e) {
    console.log(e, 'err')
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    throw new Error(error)
  }
}

// get current user
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

// get all posts
export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId
    )
    return posts.documents
  } catch (e) {
    console.log(e)
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    )

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

// Get video posts by search query
export async function searchPosts(query) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    )

    if (!posts) throw new Error('Something went wrong')

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator', userId)]
    )

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

// Upload file
export async function uploadFile(file, type) {
  if (!file) return

  const { mimeType, ...rest } = file
  const asset = { type: mimeType, ...rest }

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl
  } catch (e) {
    throw new Error(e)
  }
}

// Get file preview
export async function getFilePreview(fileId, type) {
  let fileUrl

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        'top',
        100
      )
    } else {
      throw new Error('Invalid file type')
    }

    if (!fileUrl) throw Error

    return fileUrl
  } catch (e) {
    throw new Error(e)
  }
}

// Create video post
export async function createVideoPost(form){
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await database.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
