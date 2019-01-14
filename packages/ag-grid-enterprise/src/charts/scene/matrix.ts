/**
 * As of Jan 8, 2019, Firefox still doesn't implement
 * `getTransform(): DOMMatrix;`
 * `setTransform(transform?: DOMMatrix2DInit)`
 * in the `CanvasRenderingContext2D`.
 * Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=928150
 * IE11 and Edge 44 also don't have the support.
 * Thus this class, to keep track of the current transform and
 * combine transformations.
 * Standards:
 * https://html.spec.whatwg.org/dev/canvas.html
 * https://www.w3.org/TR/geometry-1/
 */
export class Matrix {

    // Using column-major order.
    // When identifiers such as `m12` are used:
    // `1` means first column
    // `2` means second row

    private elements: number[];

    constructor(elements: number[] = [1, 0, 0, 1, 0, 0]) {
        this.elements = elements;
    }

    setElements(elements: number[]): Matrix {
        const e = this.elements;

        // `this.elements = elements.slice()` is 4-5 times slower
        // (in Chrome 71 and FF 64) than manually copying elements,
        // since slicing allocates new memory.
        // The performance of passing parameters individually
        // vs as an array is about the same in both browsers, so we
        // go with a single (array of elements) parameter, because
        // `setElements(elements)` and `setElements([a, b, c, d, e, f])`
        // calls give us roughly the same performance, versus
        // `setElements(...elements)` and `setElements(a, b, c, d, e, f)`,
        // where the spread operator causes a 20-30x performance drop
        // (30x when compiled to ES5's `.apply(this, elements)`
        //  20x when used natively).
        e[0] = elements[0];
        e[1] = elements[1];
        e[2] = elements[2];
        e[3] = elements[3];
        e[4] = elements[4];
        e[5] = elements[5];

        return this;
    }

    get isIdentity(): boolean {
        const e = this.elements;
        return e[0] === 1 && e[1] === 0 && e[2] === 0 &&
               e[3] === 1 && e[4] === 0 && e[5] === 0;
    }

    private _a = 1;
    set a(value: number) {
        this.elements[0] = value;
    }
    get a(): number {
        return this.elements[0];
    }

    private _b = 0;
    set b(value: number) {
        this.elements[1] = value;
    }
    get b(): number {
        return this.elements[1];
    }

    private _c = 0;
    set c(value: number) {
        this.elements[2] = value;
    }
    get c(): number {
        return this.elements[2];
    }

    private _d = 1;
    set d(value: number) {
        this.elements[3] = value;
    }
    get d(): number {
        return this.elements[3];
    }

    private _e = 0;
    set e(value: number) {
        this.elements[4] = value;
    }
    get e(): number {
        return this.elements[4];
    }

    private _f = 0;
    set f(value: number) {
        this.elements[5] = value;
    }
    get f(): number {
        return this.elements[5];
    }

    /**
     * Performs the AxB matrix multiplication and saves the result
     * to `C`, if given, or to `A` otherwise.
     */
    private AxB(A: number[], B: number[], C?: number[]) {
        const [m11, m12, m21, m22, m31, m32] = A;
        const [o11, o12, o21, o22, o31, o32] = B;

        C = C || A;
        C[0] = m11 * o11 + m21 * o12;
        C[1] = m12 * o11 + m22 * o12;
        C[2] = m11 * o21 + m21 * o22;
        C[3] = m12 * o21 + m22 * o22;
        C[4] = m11 * o31 + m21 * o32 + m31;
        C[5] = m12 * o31 + m22 * o32 + m32;
    }

    /**
     * The `other` matrix gets post-multiplied to the current matrix.
     * Returns the current matrix.
     * @param other
     */
    multiplySelf(other: Matrix): Matrix {
        this.AxB(this.elements, other.elements);

        return this;
    }

    /**
     * The `other` matrix gets post-multiplied to the current matrix.
     * Returns a new matrix.
     * @param other
     */
    multiply(other: Matrix): Matrix {
        const elements = new Array(6);

        this.AxB(this.elements, other.elements, elements);

        return new Matrix(elements);
    }

    preMultiplySelf(other: Matrix): Matrix {
        this.AxB(other.elements, this.elements, this.elements);

        return this;
    }

    /**
     * Returns the inverse of this matrix as a new matrix.
     */
    inverse(): Matrix {
        let [a, b, c, d, e, f] = this.elements;
        const rD = 1 / (a * d - b * c); // reciprocal of determinant

        a *= rD;
        b *= rD;
        c *= rD;
        d *= rD;

        return new Matrix([d, -b, -c, a, c * f - d * e, b * e - a * f]);
    }

    /**
     * Save the inverse of this matrix to the given matrix.
     */
    inverseTo(other: Matrix): Matrix {
        let [a, b, c, d, e, f] = this.elements;
        const rD = 1 / (a * d - b * c); // reciprocal of determinant

        a *= rD;
        b *= rD;
        c *= rD;
        d *= rD;

        other.setElements([d, -b, -c, a, c * f - d * e, b * e - a * f]);

        return this;
    }

    invertSelf(): Matrix {
        const elements = this.elements;
        let [a, b, c, d, e, f] = elements;
        const rD = 1 / (a * d - b * c); // reciprocal of determinant

        a *= rD;
        b *= rD;
        c *= rD;
        d *= rD;

        elements[0] = d;
        elements[1] = -b;
        elements[2] = -c;
        elements[3] = a;
        elements[4] = c * f - d * e;
        elements[5] = b * e - a * f;

        return this;
    }

    toContext(ctx: CanvasRenderingContext2D) {
        const e = this.elements;
        ctx.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
    }
}