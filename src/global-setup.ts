import { STORAGE_STATE } from '@_pw-config';
import * as fs from 'fs';

async function globalSetup(): Promise<void> {
  if (fs.existsSync(STORAGE_STATE)) {
    fs.unlinkSync(STORAGE_STATE);
  }

  // console.log('⚠️  Global setup Run!');
  // console.log('⚠️  URL:', process.env.BASE_URL);
  // console.log('⚠️  EMAIL:', process.env.USER_EMAIL);
  // console.log('⚠️  PASSWORD:', process.env.USER_PASSWORD);
}

export default globalSetup;
