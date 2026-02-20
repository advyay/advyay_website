import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://advyay:Advyay54321@cluster0.oztvo4a.mongodb.net/?retryWrites=true&w=majority'
const options = {}

let client
let clientPromise: Promise<MongoClient>

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add MONGODB_URI to .env.local')
// }

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise