import { Session } from '@clerk/clerk-sdk-node';

declare module 'next' {
  export interface NextApiRequest {
    session: Session;
  }
}
