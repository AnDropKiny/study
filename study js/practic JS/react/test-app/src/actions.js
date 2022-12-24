export const inc = () => ({ type: 'INC' });


export const dec = () => ({ type: 'DEC' });

export const rnd = () => {
    const value = Math.floor(Math.random() * 100);
    return { type: 'RND', payload: value }
}

export const reset = () => ({ type: 'RESET' });
