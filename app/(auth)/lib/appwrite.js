import { Client, Account } from "appwrite"

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6892664b002a8abfd6dd')

export const account = new Account(client);
export { ID } from 'appwrite';