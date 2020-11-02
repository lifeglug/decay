import { BUTTON_HEIGHT, BUTTON_WIDTH, WIDTH } from '../core/constants';
import { getPortraitImage } from '../core/util';
import { Button } from './button';
import { UI } from './ui';
import { UIElement } from './ui-element';

interface DialogTree {
  messages: DialogMessage[];
}

interface DialogMessage {
  portrait: string;
  message: string;
}

export class Dialog extends UIElement {
  private open: boolean = false;
  private tree: DialogTree;
  private onClose: () => void;
  private ui: UI = new UI();
  private messageIndex: number = 0;
  private portrait: HTMLImageElement;
  private message: DialogMessage;

  constructor() {
    super(100, 200, WIDTH - 200, 320, () => {});
  }

  public checkClick(event: MouseEvent, scale: number) {}

  public startDialog(tree: DialogTree, onClose: () => void) {
    this.open = true;
    this.tree = tree;
    this.onClose = onClose;
    this.startNode(0);
  }

  public startNode(node: number) {
    this.ui.clearElements();
    this.messageIndex = node;
    this.message = this.tree.messages[this.messageIndex];
    this.portrait = getPortraitImage(this.message?.portrait);

    if (this.messageIndex < this.tree.messages.length - 1) {
      this.ui.addElements([
        new Button(
          WIDTH - 210,
          470,
          BUTTON_WIDTH,
          BUTTON_HEIGHT,
          this.startNode.bind(this, this.messageIndex + 1),
          'NXT.'
        )
      ]);
    } else {
      this.ui.addElements([
        new Button(WIDTH - 210, 470, BUTTON_WIDTH, BUTTON_HEIGHT, this.endDialog.bind(this), 'END.')
      ]);
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
        ctx.drawImage(this.portrait, 120 * scale, 150 * scale, 150 * scale, 150 * scale);
        ctx.strokeRect(120 * scale, 150 * scale, 150 * scale, 150 * scale);
      }

      if (this.message) {
        ctx.fillStyle = 'black';
        ctx.font = `${20 * scale}px monospace`;
        ctx.textBaseline = 'top';
        ctx.fillText(this.message.message, 120 * scale, 320 * scale);
      }

      this.ui.draw(ctx, scale);
      ctx.restore();
    }
  }
}
