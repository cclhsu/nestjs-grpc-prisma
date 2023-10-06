// Path: src/utils/jwt/jwt.utils.ts
// DESC: JWT utilities
'use strict';

// import jwtDecode, { JwtDecodeOptions } from 'jwt-decode';
// import JwtPayloadDTO from '../../models/auth/jwt-payload.dto';

// export function decodeToken(token: string): JwtPayloadDTO | null {
//   try {
//     if (!token) {
//       return null;
//     }
//     const jwtDecodeOption: JwtDecodeOptions = {
//       header: false,
//     };
//     const decoded: JwtPayloadDTO | null = jwtDecode<JwtPayloadDTO>(token, jwtDecodeOption);
//     console.log('decoded: ', decoded);
//     return decoded;
//   } catch (error) {
//     // Handle decoding error here, e.g., log it
//     console.error('Error decoding token: ', error);
//     return null;
//   }
// }

// // Token extraction functions...

// export function validateToken(token: string): boolean {
//   const decoded: JwtPayloadDTO | null = decodeToken(token);
//   if (!decoded || !decoded.sub) {
//     return false;
//   }
//   return true;
// }

// export default {
//   decodeToken,
//   validateToken,
// };

export {};
