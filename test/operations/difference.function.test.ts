import { describe, expect, it } from '@jest/globals';
import { difference, equivalence } from '../../src';
import { TestSets } from '../util/test-sets/test-sets.model';
import { testSuite } from '../util/test-suite.function';

describe('difference', () => {
	testSuite('difference', differenceTests);
});

function differenceTests<T>(testSets: TestSets<T>): void {
	const { c, e, empty, setA, setB, setC, setD, setE, setF, universal } = testSets;
	const differenceAB = new Set<T>([ c, e ]);
	const differenceABC = new Set<T>([ e ]);

	it('no sets difference returns empty set', () => {
		const result = difference();
		expect(equivalence(result, empty)).toBe(true);
	});

	it('single set difference returns self', () => {
		const result = difference(setA);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('same set has no difference overlap', () => {
		const result = difference(setA, setA);
		expect(equivalence(result, empty)).toBe(true);
	});

	it('many of the same set has no difference overlap', () => {
		const result = difference(setA, setA, setA);
		expect(equivalence(result, empty)).toBe(true);
	});

	it('two sets\' difference is a subset of the first', () => {
		const result = difference(setA, setB);
		expect(equivalence(result, differenceAB)).toBe(true);
	});

	it('three sets\' difference is a subset of the first', () => {
		const result = difference(setA, setB, setC);
		expect(equivalence(result, differenceABC)).toBe(true);
	});

	it('many sets\' difference is a subset of the first', () => {
		const result = difference(setA, setB, setC, setD, setE, setF);
		expect(equivalence(result, differenceABC)).toBe(true);
	});

	it('any sets\' difference with the empty set is itself', () => {
		const result = difference(setA, empty);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('any sets\' difference with the universal set is the empty set', () => {
		const result = difference(setA, universal);
		expect(equivalence(result, empty)).toBe(true);
	});

	it('the empty sets\' difference with itself is itself', () => {
		const result = difference(empty, empty);
		expect(equivalence(result, empty)).toBe(true);
	});
}
