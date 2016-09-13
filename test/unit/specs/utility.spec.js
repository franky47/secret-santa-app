import * as utility from 'src/utility'

describe('Utility', () => {
    describe('errorWhile', () => {
        it('should not fire on resolved promises', () => {
            return Promise.resolve().catch(utility.errorWhile('foo'))
        })
        it('should fire on rejected promises', () => {
            return Promise.reject('bar')
                .catch(utility.errorWhile('... nevermind, this is expected'))
                .catch(error => {
                    expect(error).to.equal('bar')
                })
        })
    })

    // --

    describe('override', () => {
        it('should return null when dst is null', () => {
            const src = { foo: 'bar' }
            const ret = utility.override(null, src)
            expect(ret).to.equal(null)
        })
        it('should return empty object when dst is empty', () => {
            const src = { foo: 'bar' }
            const ret = utility.override({}, src)
            expect(JSON.stringify(ret)).to.equal('{}')
        })
        it('should not change dst when src is null', () => {
            const dst = { foo: 'bar' }
            const ret = utility.override(dst, null)
            expect(ret).to.equal(dst)
        })
        it('should not change dst when src is empty', () => {
            const dst = { foo: 'bar' }
            const ret = utility.override(dst, {})
            expect(ret).to.equal(dst)
        })
        it('should not override uncommon properties', () => {
            const dst = { foo: 'bar' }
            const src = { egg: 'spam' }
            const ret = utility.override(dst, src)
            expect(ret).to.equal(dst)
        })
        it('should override common properties', () => {
            const dst = { foo: 'bar' }
            const src = { foo: 'spam' }
            const ret = utility.override(dst, src)
            expect(ret).to.have.property('foo', 'spam')
        })
        it('should override only common properties', () => {
            const dst = { foo: 'bar', egg: 'spam' }
            const src = { foo: 'baz', grail: 'holy' }
            const ret = utility.override(dst, src)
            expect(ret).to.have.property('foo', 'baz')
            expect(ret).to.have.property('egg', 'spam')
            expect(ret).not.to.have.property('grail')
        })
    })

    // --

    describe('hash', () => {
        it('should return zero for null input', () => {
            expect(utility.hash(null)).to.equal(0)
        })
        it('should return zero for empty string input', () => {
            expect(utility.hash('')).to.equal(0)
        })
        it('should return the correct hash', () => {
            expect(utility.hash('foo')).to.equal(101574)
        })
        it('should be immutable across time', () => {
            return Promise.all([
                Promise.resolve(utility.hash('foo')),
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(utility.hash('foo'))
                    }, 100)
                })
            ]).then(results => {
                expect(results[0]).to.equal(results[1])
            })
        })
    })

    // --

    describe('Fingerprint', () => {
        it('should translate to the same number across time', () => {
            return Promise.all([
                Promise.resolve(utility.fingerprint.asNumber()),
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(utility.fingerprint.asNumber())
                    }, 100)
                })
            ]).then(results => {
                expect(results[0]).to.equal(results[1])
            })
        })
    })
})
