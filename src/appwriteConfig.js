
import { Client ,Databases,Account} from 'appwrite';

export const PROJECT_ID='668e8ea6002f5700e27a'
export const DATABASE_ID='668e8fb1000b30ad5a0d'
export const COLLECTION_ID_MESSAGES='668e8fbc0002680b6aad'

const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668e8ea6002f5700e27a');

export default client;