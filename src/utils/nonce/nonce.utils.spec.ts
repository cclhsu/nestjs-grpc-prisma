import { generateNonce } from './nonce.utils';

describe('generateNonce', () => {
  it('should generate a nonce of the specified length', () => {
    const length = 10;
    const nonce = generateNonce(length);

    expect(nonce).toHaveLength(length); // Check if the generated nonce has the expected length
    expect(/^[a-zA-Z0-9]+$/.test(nonce)).toBe(true); // Check if the nonce contains only alphanumeric characters
  });

  it('should generate a nonce of a different length', () => {
    const length = 20;
    const nonce = generateNonce(length);

    expect(nonce).toHaveLength(length); // Check if the generated nonce has the expected length
    expect(/^[a-zA-Z0-9]+$/.test(nonce)).toBe(true); // Check if the nonce contains only alphanumeric characters
  });

  it('should generate a nonce with a length of 0', () => {
    const length = 0;
    const nonce = generateNonce(length);

    expect(nonce).toHaveLength(0); // Check if the generated nonce has a length of 0
  });

  it('should throw an error for a negative length', () => {
    const negativeLength = -5;

    expect(() => generateNonce(negativeLength)).toThrow(Error); // Expect that calling with a negative length throws an error
  });
});
