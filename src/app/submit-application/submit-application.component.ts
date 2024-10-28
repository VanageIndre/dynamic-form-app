import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-application',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './submit-application.component.html',
  styleUrls: ['./submit-application.component.scss'],
})
export class SubmitApplicationComponent implements OnInit {
  motivationalLetter = new FormControl('', [
    Validators.required,
    Validators.minLength(140),
  ]);
  jobSeeking: boolean = true;
  specialistLevel: string = '';
  formData: any;
  applicationSubmitted: boolean = false;

  constructor(
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = this.formDataService.getFormData();
    if (data) {
      this.formData = { ...data };
      this.jobSeeking = data.jobSeeking;
      this.specialistLevel = data.specialistLevel;

      if (this.jobSeeking) {
        this.applicationSubmitted = true;
      }
    }
  }

  get shouldShowMotivationalLetter(): boolean {
    return this.specialistLevel === 'senior' && !this.jobSeeking;
  }

  onSubmitMotivationalLetter(): void {
    if (this.motivationalLetter.valid || !this.shouldShowMotivationalLetter) {
      if (this.shouldShowMotivationalLetter) {
        this.formData.description = this.motivationalLetter.value;
      }
      this.applicationSubmitted = true;
    } else {
      this.motivationalLetter.markAsTouched();
    }
  }

  getSubmissionData(): string {
    return JSON.stringify(this.formData, null, 2);
  }
}
