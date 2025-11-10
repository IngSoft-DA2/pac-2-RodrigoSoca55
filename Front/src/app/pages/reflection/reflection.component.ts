import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReflectionService } from '../../services/reflection.service';
import { CounterService } from '../../services/counter.service';

interface LoadingState {
  isLoading: boolean;
  isEmpty: boolean;
  hasError: boolean;
  errorMessage?: string;
}

@Component({
  selector: 'app-reflection',
  imports: [CommonModule],
  templateUrl: './reflection.component.html'
})
export class ReflectionComponent implements OnInit {
  dlls: string[] = [];
  state: LoadingState = {
    isLoading: false,
    isEmpty: false,
    hasError: false
  };

  constructor(
    private reflectionService: ReflectionService,
    private counterService: CounterService
  ) { }

  ngOnInit(): void {
    // El contador ya se incrementó en el guard
  }

  loadImporters(): void {
    this.state = {
      isLoading: true,
      isEmpty: false,
      hasError: false
    };

    this.reflectionService.getImporters().subscribe({
      next: (dlls: string[]) => {
        this.dlls = dlls;
        this.state = {
          isLoading: false,
          isEmpty: dlls.length === 0,
          hasError: false
        };
      },
      error: (error) => {
        this.state = {
          isLoading: false,
          isEmpty: false,
          hasError: true,
          errorMessage: 'Error al cargar los importers: ' + error.message
        };
        this.dlls = [];
      }
    });
  }

  get currentCounter(): number {
    return this.counterService.getReflectionCounter();
  }
}
