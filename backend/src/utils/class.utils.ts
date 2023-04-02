/**
 * Creates a instance of class with the defined properties
 * @usageNotes
 * consider the following example:
 *
 *    `const cat = new Cat();`
 *
 *    `cat.name = 'name';`
 *
 *    `cat.age = 1`;
 *
 * this would be rewritten as:
 *
 * `const cat = createInstance(Cat, { name: 'name', age: 1 });`
 *
 */
export const createInstance = <TClass>(
  Creator: { new (): TClass },
  properties: Partial<TClass>,
  // @ts-ignore
): TClass => Object.assign(new Creator(), properties)
