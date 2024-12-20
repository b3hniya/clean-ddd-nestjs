import { Email } from '../value-objects/email.vo';
import { BadRequestException } from '@nestjs/common';

describe('Email Value Object', () => {
  it('should create a valid email object', () => {
    const email = new Email('test@example.com');
    expect(email.getValue()).toBe('test@example.com');
  });

  it('should normalize the email to lowercase', () => {
    const email = new Email('Test@Example.COM');
    expect(email.getValue()).toBe('test@example.com');
  });

  it('should throw an exception for an invalid email', () => {
    expect(() => new Email('invalid-email')).toThrow(BadRequestException);
    expect(() => new Email('another_invalid_email@')).toThrow(
      BadRequestException,
    );
    expect(() => new Email('@example.com')).toThrow(BadRequestException);
  });

  it('should compare two emails correctly', () => {
    const email1 = new Email('test@example.com');
    const email2 = new Email('TEST@example.com');
    const email3 = new Email('other@example.com');

    expect(email1.equals(email2)).toBe(true);
    expect(email1.equals(email3)).toBe(false);
  });
});
