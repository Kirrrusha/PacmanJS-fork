pacman.MazeState = function(mazeFile) {
   'use strict';
   pacman._BaseState.apply(this, arguments);
   this._mazeFile = mazeFile;
};

pacman.MazeState.prototype = Object.create(pacman._BaseState, {
   
   init: {
      value: function() {
         'use strict';
         
         this._maze = new pacman.Maze(this._mazeFile);
         
      }
   },
   
   _paintExtraLives: {
      value: function(ctx) {
         'use strict';
         
         // The indentation on either side of the status stuff at the bottom
         // (extra life count, possible fruits, etc.).
         var BOTTOM_INDENT = 24;
         var TILE_SIZE = 8;
         
         var lives = game.getLives();
         if (lives > 0) {
            var x = BOTTOM_INDENT;
            var y = game.getHeight() - 2 * TILE_SIZE;
            var w = 2 * TILE_SIZE;
            for (var i = 0; i < lives; i++) {
               game.drawSprite(x, y, 12*16, 3*16);
               x += w;
            }
         }
      }
   },
   
   _paintPossibleFruits: {
      value: function(ctx) {
         'use strict';
         
         // The indentation on either side of the status stuff at the bottom
         // (extra life count, possible fruits, etc.).
         var BOTTOM_INDENT = 24;
         var TILE_SIZE = 8;
         
         var x = game.getWidth() - BOTTOM_INDENT - 2 * TILE_SIZE;
         var y = game.getHeight() - 2 * TILE_SIZE;
         
         switch (game.getLevel()) {
            default:
            case 7: // Key
               game.drawSprite(x-112,y, 13*16,3*16);
               // Fall through
            case 6: // Space Invaders ship
               game.drawSprite(x-96,y, 13*16,6*16);
               // Fall through
            case 5: // Green thing (grapes?)
               game.drawSprite(x-160,y, 12*16,6*16);
               // Fall through.
            case 4: // Apple
               game.drawSprite(x-128,y, 13*16,2*16);
               // Fall through.
            case 3: // Yellow bell
               game.drawSprite(x-96,y, 13*16,5*16);
               // Fall through.
            case 2: // Peach
               game.drawSprite(x-64,y, 12*16,5*16);
               // Fall through.
            case 1: // Strawberry
               game.drawSprite(x-32,y, 13*16,4*16);
               // Fall through.
            case 0: // Cherry
               game.drawSprite(x,y, 12*16,4*16);
               break;
         }
      }
   },
   
   render: {
      value: function(ctx) {
         'use strict';
         
         this._maze.render(ctx);
         
         //game.paintFruit(ctx);
         // TODO: Paint Pacman and ghosts
         
         game.drawScores(ctx);
         this._paintExtraLives(ctx);
         this._paintPossibleFruits(ctx);
         
         // TODO: Subtate messages - "READY", "GAME OVER", "PAUSED", etc.
      }
   },
   
   update: {
      value: function(delta) {
         'use strict';
      }
   },
   
});

pacman.MazeState.prototype.constructor = pacman.MazeState;
