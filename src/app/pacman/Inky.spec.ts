import { Inky } from './Inky';
import { Direction } from './constants/direction';
import { MotionState } from './constants/motionState';

describe('Inky', () => {

    it('reset() works as expected', () => {

        const mockGame: any /* PacmanGame */ = {
            checkLoopedSound: () => {}
        };

        const ghost: Inky = new Inky(mockGame);
        ghost.reset();

        expect(ghost.direction).toEqual(Direction.SOUTH);
        expect(ghost.motionState).toEqual(MotionState.IN_BOX);
    });
});
