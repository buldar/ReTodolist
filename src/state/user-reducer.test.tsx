import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 31, childrenCount: 0, name: 'Vitaly' };
    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(32);
    expect(endState.childrenCount).toBe(0);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 31, childrenCount: 0, name: 'Vitaly' };
    const endState = userReducer(startState, {type:'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(31)
    expect(endState.childrenCount).toBe(1)
    expect(endState.name).toBe('Vitaly')
});

test ('user should be renamed', ()=>{
    const startState = { age: 31, childrenCount: 0, name: 'Vitaly' };
    const endState = userReducer(startState,{type:'CHANGE-NAME'})

    expect(endState.name).toBe('Gupik')
    expect(endState.age).toBe(31)
    expect(endState.childrenCount).toBe(0)

})