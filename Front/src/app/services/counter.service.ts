import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private reflectionCounter = 0;

  incrementReflectionCounter(): void {
    this.reflectionCounter++;
  }

  getReflectionCounter(): number {
    return this.reflectionCounter;
  }

  canAccessReflection(): boolean {
    return this.reflectionCounter < 20;
  }
}