import { Game } from '../core/game';
import { Button } from '../ui/button';
import { MainScene } from './main-scene';
import { Scene } from './scene';

export class MenuScene extends Scene {
  constructor(game: Game) {
    super(game);
    this.ui.addElements([
      new Button(
        5,
        5,
        50,
        50,
        () => {
          game.changeScene(new MainScene(game));
        },
        'Start'
      )
    ]);
  }
}
