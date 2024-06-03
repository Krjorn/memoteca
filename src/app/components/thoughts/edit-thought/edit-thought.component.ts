import { Component, OnInit } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrl: './edit-thought.component.css'
})
export class EditThoughtComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private service: ThoughtService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      author: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      model: ['modelo1'],
      favorite: [false],
      id: [0]
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchById(parseInt(id!)).subscribe(thought => {
      this.form.setValue(thought);
    });
  }

  edit(): void {
    this.service.edit(this.form.value).subscribe(() => {
      this.router.navigate(['/listThoughts']);
    });
  }

  cancel(): void {
    this.router.navigate(['/listThoughts']);
  }

  enableBtn(): string {
    if(this.form.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
