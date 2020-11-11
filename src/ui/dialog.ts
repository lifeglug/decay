import { WIDTH } from '../core/constants';
import { getPortraitImage } from '../core/util';
import { Button } from './button';
import { UI } from './ui';
import { UIElement } from './ui-element';
import { _ } from '../core/localisation';

import dialog from '../json/dialog.json';

enum MessageEffect {}

interface DialogMessage {
  portrait: string;
  message: string;
  effect?: MessageEffect;
}

export class Dialog extends UIElement {
  private open: boolean = false;
  private onClose: () => void;
  private ui: UI = new UI();
  private messageIndex: number = 0;
  private messages: DialogMessage[];
  private portrait: HTMLImageElement;
  private message: DialogMessage;

  constructor() {
    super(50, 100, WIDTH - 100, 160, () => {});
  }

  public checkClick(event: MouseEvent, scale: number) {}

  public startDialog(treeId: string, onClose: () => void) {
    this.open = true;
    this.messages = dialog[treeId];
    this.onClose = onClose;
    this.startNode(0);
  }

  public startNode(node: number) {
    this.ui.clearElements();
    this.messageIndex = node;
    this.message = this.messages[this.messageIndex];
    this.portrait = getPortraitImage(this.message?.portrait);

    if (this.messageIndex < this.messages.length - 1) {
      this.ui.addElements([
        new Button(WIDTH - 105, 235, 64, 16, this.startNode.bind(this, this.messageIndex + 1), _('dialog-next'))
      ]);
    } else {
      this.ui.addElements([new Button(WIDTH - 105, 235, 64, 16, this.endDialog.bind(this), _('dialog-end'))]);
    }
  }

  public endDialog() {
    this.open = false;
    this.messageIndex = 0;
    this.onClose();
  }

  public onMouseMove(event: MouseEvent, scale: number) {
    this.ui.onMouseMove(event, scale);
  }

  public onMouseClick(event: MouseEvent, scale: number) {
    this.ui.onMouseClick(event, scale);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.open) {
      ctx.save();

      ctx.fillStyle = 'white';
      ctx.fillRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
      ctx.strokeRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);

      if (this.portrait) {
        ctx.drawImage(this.portrait, 60 * scale, 75 * scale, 150 * scale, 150 * scale);
        ctx.strokeRect(60 * scale, 75 * scale, 150 * scale, 150 * scale);
      }

      if (this.message) {
        ctx.fillStyle = 'black';
        ctx.font = `${10 * scale}px 'Press Start 2P'`;
        ctx.textBaseline = 'top';
        this.message.message.split('\n').map((line, i) => {
          ctx.fillText(line, 120 * scale, (320 + i * 22) * scale);
        });
      }

      this.ui.draw(ctx, scale);
      ctx.restore();
    }
  }
}
