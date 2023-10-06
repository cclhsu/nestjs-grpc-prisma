// Path: src/utils/password/password.utils.ts
// DESC: Password utilities
'use strict';
import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
