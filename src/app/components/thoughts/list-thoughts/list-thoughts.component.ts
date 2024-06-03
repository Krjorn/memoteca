import { Component, OnInit } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-thoughts',
  templateUrl: './list-thoughts.component.html',
  styleUrl: './list-thoughts.component.css'
})
export class ListThoughtsComponent implements OnInit {
  thoughtList: Thought[] = [];
  currentPage = 1;
  moreThoughts = true;
  filter: string = '';
  favoriteOnly: boolean = false;
  favoriteList: Thought[] = [];
  title: string = 'Meu mural';

  constructor(
    private service: ThoughtService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.service.list(this.currentPage, this.filter, this.favoriteOnly).subscribe(thoughtList => {
        this.thoughtList = thoughtList;
      });
  }

  loadMoreThoughts(): void {
    this.service.list(++this.currentPage, this.filter, this.favoriteOnly).subscribe(thoughtList => {
      this.thoughtList.push(...thoughtList);
      if(!thoughtList.length) {
        this.moreThoughts = false;
      }
    })
  }

  searchThoughts(e: KeyboardEvent): void {
    if(e.code === 'Escape') {
      const elem = e.target as HTMLElement;
      elem.blur();
      return;
    }

    this.currentPage = 1;
    this.moreThoughts = true;
    this.service.list(this.currentPage, this.filter, this.favoriteOnly).subscribe(thoughtList => {
      this.thoughtList = thoughtList;
    })
  }

  listFavorite(): void {
    this.title = 'Meus favoritos';
    this.favoriteOnly = true;
    this.currentPage = 1;
    this.moreThoughts = true;
    this.service.list(this.currentPage, this.filter, this.favoriteOnly).subscribe(favoriteThoughtsList => {
      this.thoughtList = favoriteThoughtsList;
      this.favoriteList = favoriteThoughtsList;
    })
  }

  reloadComponent(): void {
    this.currentPage = 1;
    this.moreThoughts = true;
    this.favoriteOnly = false;
    this.router.navigate([this.router.url]);
  }
}
