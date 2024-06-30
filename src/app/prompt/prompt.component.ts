import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-prompt',
  template: `
    <div *ngIf="prompt && prompt.content.length > 0" class="prompt-container">
      <p>{{ prompt.content[0] }}</p>
    </div>
  `,
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent implements OnChanges {
  @Input() prompt?: { content: string[]; callback?: Function };
  timeout: { id: any } = { id: '' };

  cachedOnContextMenu:
    | (((this: GlobalEventHandlers, ev: MouseEvent) => any) &
        ((this: Window, ev: MouseEvent) => any))
    | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.prompt &&
      this.prompt.content.length > 0 &&
      window.oncontextmenu !== this.promptOnContextmenu
    ) {
      this.cachedOnContextMenu = window.oncontextmenu;
      window.oncontextmenu = (event) => this.promptOnContextmenu(event);
      this.timeout.id = setTimeout(() => {
        if (this.prompt?.callback) this.prompt?.callback();
      }, 99999999);
    }
  }

  promptOnContextmenu(event: MouseEvent) {
    event.preventDefault();

    this.prompt?.content.shift();
    if (this.prompt?.content.length === 0) {
      window.oncontextmenu = this.cachedOnContextMenu;

      clearTimeout(this.timeout.id);
      if (this.prompt?.callback) this.prompt?.callback();
    }
  }
}
