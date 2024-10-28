import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobSeeking: [true],
      specialistLevel: ['', Validators.required],
      answer: [''],
      description: [''],
    });

    this.form.get('specialistLevel')?.valueChanges.subscribe((level) => {
      this.updateFields(level);
    });
  }

  updateFields(level: string): void {
    const answerControl = this.form.get('answer');
    const descriptionControl = this.form.get('description');

    if (level === 'junior') {
      answerControl?.setValidators([
        Validators.required,
        Validators.pattern(/^4$/),
      ]);
    } else {
      answerControl?.reset();
      answerControl?.clearValidators();
    }

    if (level === 'mid') {
      descriptionControl?.setValidators([
        Validators.required,
        Validators.pattern(/^[^aA]*$/),
      ]);
    } else {
      descriptionControl?.clearValidators();
    }

    answerControl?.updateValueAndValidity();
    descriptionControl?.updateValueAndValidity();
  }

  getButtonLabel(): string {
    return this.form.get('specialistLevel')?.value === 'senior'
      ? 'Next Step'
      : 'Submit';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      if (formData.specialistLevel !== 'junior') {
        delete formData.answer;
      }

      this.formDataService.setFormData(formData);
      this.router.navigate(['/submit-application']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
