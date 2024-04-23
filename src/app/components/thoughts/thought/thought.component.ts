import { Component, Input } from '@angular/core';
import { Thought } from '../thought';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrl: './thought.component.css'
})
export class ThoughtComponent {
  @Input()
  thought: Thought = {
    id: 0,
    content: '',
    author: '',
    model: ''
  }

  getWidthClass(): string {
    if(this.thought.content.length >= 256) {
      return 'pensamento-g';
    }

    return 'pensamento-p';
  }
}
