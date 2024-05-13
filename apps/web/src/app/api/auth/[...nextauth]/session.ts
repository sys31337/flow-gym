import { SessionOptions } from 'next-auth';

const session: Partial<SessionOptions> = { strategy: 'jwt' };

export default session;
