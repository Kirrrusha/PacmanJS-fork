import { TitleState } from './TitleState';
import { PacmanGame } from './PacmanGame';
import { Pacman } from './Pacman';
import { ConcreteGhost } from './Ghost.spec';
import { Direction } from './Direction';

// TextEncoder not defined:
// https://github.com/jsdom/jsdom/issues/2524
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
import { JSDOM } from 'jsdom';

describe('TitleState', () => {

    let ghost: ConcreteGhost;
    let mockGame: PacmanGame;
    let canvas: HTMLCanvasElement;

    beforeEach(() => {

        const dom = new JSDOM('<html><body></body></html>');
        canvas = dom.window.document.createElement('canvas');

        ghost = new ConcreteGhost();
        ghost.direction = Direction.WEST;

        mockGame = {
            pacman: new Pacman(),
            getWidth: jest.fn(),
            getHeight: jest.fn(),
            clearScreen: jest.fn(),
            drawSmallDot: jest.fn(),
            drawBigDot: jest.fn(),
            drawScores: jest.fn(),
            drawScoresHeaders: jest.fn(),
            getGhost: () => {
                return ghost;
            },
            canvas,
        } as unknown as PacmanGame;
        (global as any).game = mockGame;
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('enter() sets up Pinky properly', () => {
        new TitleState(mockGame);
        expect(ghost.direction).toEqual(Direction.EAST);
    });

    it('enter() and exit() attach and remove listeners to the canvas properly', () => {

        const state: TitleState = new TitleState(mockGame);
        const addSpy = jest.spyOn(canvas, 'addEventListener');
        const removeSpy = jest.spyOn(canvas, 'removeEventListener');

        state.enter();
        expect(addSpy).toHaveBeenCalled();

        state.leaving(mockGame);
        expect(removeSpy).toHaveBeenCalled();
    });

    // it('render() draws our screen', () => {
    //
    //     const state: TitleState = new TitleState(mockGame);
    //     state.render(canvas.getContext('2d')!);
    // });
});
