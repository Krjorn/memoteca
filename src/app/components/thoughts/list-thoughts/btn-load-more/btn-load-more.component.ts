import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-load-more',
  templateUrl: './btn-load-more.component.html',
  styleUrl: './btn-load-more.component.css'
})
export class BtnLoadMoreComponent {
  @Input()
  moreThoughts: boolean = false;
}
