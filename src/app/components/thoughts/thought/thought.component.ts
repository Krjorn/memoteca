import { Component, Input } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';

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
    model: '',
    favorite: false
  }

  @Input()
  favoriteList: Thought[] = [];

  constructor(private service: ThoughtService) {}

  getWidthClass(): string {
    if(this.thought.content.length >= 256) {
      return 'pensamento-g';
    }

    return 'pensamento-p';
  }

  toggleFavoriteIcon(): string {
    if(this.thought.favorite) {
      return 'ativo';
    }

    return 'inativo';
  }

  updateFavorite() {
    this.service.toggleFavorite(this.thought).subscribe(() => {
      this.favoriteList.splice(this.favoriteList.indexOf(this.thought), 1);
    });
  }
}
