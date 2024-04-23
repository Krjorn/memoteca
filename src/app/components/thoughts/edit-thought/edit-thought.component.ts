import { Component, OnInit } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrl: './edit-thought.component.css'
})
export class EditThoughtComponent implements OnInit {
  thought: Thought = {
    id: 0,
    content: '',
    author: '',
    model: ''
  }

  constructor(
    private service: ThoughtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.service.searchById(parseInt(id!)).subscribe(thought => {
        this.thought = thought;
      });
  }

  edit(): void {
    this.service.edit(this.thought).subscribe(() => {
      this.router.navigate(['/listThoughts']);
    });
  }

  cancel(): void {
    this.router.navigate(['/listThoughts']);
  }
}
