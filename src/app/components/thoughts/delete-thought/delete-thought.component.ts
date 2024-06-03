import { Component, OnInit } from '@angular/core';
import { Thought } from '../thought';
import { ActivatedRoute, Router } from '@angular/router';
import { ThoughtService } from '../thought.service';

@Component({
  selector: 'app-delete-thought',
  templateUrl: './delete-thought.component.html',
  styleUrl: './delete-thought.component.css'
})
export class DeleteThoughtComponent implements OnInit {
  thought: Thought = {
    id: 0,
    content: '',
    author: '',
    model: '',
    favorite: false
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

  delete(): void {
    if(this.thought.id) {
      this.service.delete(this.thought.id).subscribe(() => {
        this.router.navigate(['/listThoughts']);
      });
    }
  }

  cancel():void {
    this.router.navigate(['/listThoughts']);
  }
}
