import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY: string = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// export const IS_PROTECTED_KEY: string = 'isProtected';
// export const Protected = () => SetMetadata(IS_PROTECTED_KEY, true);

// export const IS_AUTHENTICATED_KEY: string = 'isAuthenticated';
// export const Authenticated = () => SetMetadata(IS_AUTHENTICATED_KEY, true);
