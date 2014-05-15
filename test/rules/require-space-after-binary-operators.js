var Checker = require('../../lib/checker');
var assert = require('assert');

describe('rules/require-space-after-binary-operators', function() {

    var checker;
    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
    });

    it('should report sticky operator for "2+2"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['+'] });
        assert(checker.checkString('var x = 2+2;').getErrorCount() === 1);
    });
    it('should not report separated operator for "2+ 2"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['+'] });
        assert(checker.checkString('var x = 2+ 2;').isEmpty());
    });
    it('should report sticky operator for "a = (a) +(b)"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['+'] });
        assert(checker.checkString('a = (a) +(b)').getErrorCount() === 1);
    });
    it('should not report separated operator for "a = (a) + (b)"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['+'] });
        assert(checker.checkString('a = (a) + (b)').isEmpty());
    });
    it('should not report sticky operator for "2+2" without option', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['-'] });
        assert(checker.checkString('var x = 2+2;').isEmpty());
    });
    it('should not report sticky operator for "2, 2"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: [','] });
        assert(checker.checkString('2, 2;').isEmpty());
    });
    it('should report sticky operator for "2,2"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: [','] });
        assert(checker.checkString('2,2;').getErrorCount() === 1);
    });
    it('should report separated operator for "({a: 1 ,b: 2})"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: [','] });
        assert(checker.checkString('({a: 1 ,b: 2})').getErrorCount() === 1);
    });
    it('should not report separated operator for "({a: 1, b: 2})"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: [','] });
        assert(checker.checkString('({a: 1, b: 2})').isEmpty());
    });
    it('should report assignment operator for "a = b"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['='] });
        assert(checker.checkString('a = b').isEmpty());
    });
    it('should not report assignment operator for "a=b"', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: ['='] });
        assert(checker.checkString('a=b').getErrorCount() === 1);
    });
    it('should not report assignment operator for "a = b" without option', function() {
        checker.configure({ requireSpaceAfterBinaryOperators: [','] });
        assert(checker.checkString('a=b').isEmpty());
    });

});