// src/modules/user/domain/value-objects/user-id.vo.ts
import { randomUUID } from 'crypto';

export class UserId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || randomUUID();
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.toString();
  }
}
