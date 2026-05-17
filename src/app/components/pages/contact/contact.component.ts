import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    imports: [FormsModule, ReactiveFormsModule]
})
export class ContactComponent implements OnInit {
  submitting = false;
  submitted = false;
  errorMsg = '';

  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly destroyRef = inject(DestroyRef);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {}

  readonly f = this.form.controls;

  onSubmit(): void {
    this.submitted = true;
    this.errorMsg = '';
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    this.contactService.sendMessage(this.form.getRawValue()).pipe(
      finalize(() => {
        this.submitting = false;
      }),
    ).subscribe({
      next: () => {
        this.form.reset({ name: '', email: '', message: '' });
        this.submitted = false;
      },
      error: () => {
        this.errorMsg = 'No pudimos enviar tu mensaje. Intenta más tarde.';
      },
      complete: () => {
        // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
      }
    });
  }
}
