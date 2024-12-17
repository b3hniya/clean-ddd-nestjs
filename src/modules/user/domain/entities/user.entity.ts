// src/modules/user/domain/entities/user.entity.ts
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';

export class User {
  private readonly id: UserId;
  private email: Email;
  private name: string;

  private constructor(id: UserId, email: Email, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  // Factory method to create a User
  public static create(id: UserId, email: Email, name: string): User {
    return new User(id, email, name);
  }

  // Getters
  public getId(): UserId {
    return this.id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  // Domain Logic
  public changeEmail(newEmail: Email): void {
    if (this.email.equals(newEmail)) {
      throw new Error('New email must be different from the current one.');
    }
    this.email = newEmail;
  }
}
