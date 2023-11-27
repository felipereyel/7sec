export type Cell = {
    x: number;
    y: number;
    value: boolean;
};

export const getCoord = (n: number, size: number) => [Math.floor(n / size), n % size];
  
export const randomIntList = (n: number, max: number) => {
    const list: number[] = [];

    for (let i = 0; i < n; i++) {
        let r = Math.floor(Math.random() * max);

        while (list.includes(r)) {
        r = Math.floor(Math.random() * max);
        }

        list.push(r);
    }

    return list;
};

export const generateBoard = (round: number, size: number) => {
    const board: Cell[][] = [];

    for (let i = 0; i < size; i++) {
        board.push([]);

        for (let j = 0; j < size; j++) {
        board[i].push({
            value: false,
            x: i,
            y: j,
        });
        }
    }

    return board;
};