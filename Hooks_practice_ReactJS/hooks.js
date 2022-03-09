import {useState} from 'react';

export function useStack() {
    let [stack, funcs] = useState([]);

    return {
        stack,
        push (word) = funcs(stack.concat(word)),
        pop () = funcs(stack.slice(0, stack.length - 1))
    };

}

export function useCounter(start, finish) {
    let [c, count] = useState(start);
    if (c  finish) {
        c = start;
    }
    return [
        c,
        () = count(c + 1),
    ];
}

