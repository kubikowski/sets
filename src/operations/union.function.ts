export function union<T>(...sets: Set<T>[]): Set<T>;
export function union<T>(...sets: ReadonlySet<T>[]): ReadonlySet<T>;

/**
 * The union of two sets contains all the elements contained in either set (or both sets).
 *
 * Set union is notated A ∪ B.
 *
 * @description A ∪ B ≔ { x : (x ∈ A) ∨ (x ∈ B) }
 */
export function union<T, S extends ReadonlySet<T>>(...sets: S[]): S {
	const resultSet = new Set<T>(sets.shift());

	for (let index = 0; index < sets.length; ++index) {
		for (const element of sets[index]!) {
			resultSet.add(element);
		}
	}

	return resultSet as ReadonlySet<T> as S;
}
