import { classNames } from '../classNames/classNames'

describe('classNames', () => {
  test('with onfly first param', () => {
    expect(classNames('someClass')).toBe('someClass')
  })
  test('with additional class', () => {
    const expectedValue = 'someClass class1 class2'
    expect(classNames(
      'someClass',
      {},
      ['class1', 'class2'])
    ).toBe(expectedValue)
  })
  test('with mods', () => {
    const expectedValue = 'someClass class1 class2 hovered'
    expect(classNames(
      'someClass',
      { hovered: true },
      ['class1', 'class2']
    )).toBe(expectedValue)
  })
  test('with mods (false)', () => {
    const expectedValue = 'someClass class1 class2'
    expect(classNames(
      'someClass',
      { hovered: false },
      ['class1', 'class2']
    )).toBe(expectedValue)
  })
  test('with mods additional(undefined)', () => {
    const expectedValue = 'someClass'
    expect(classNames(
      'someClass',
      {},
      undefined
    )).toBe(expectedValue)
  })
})
