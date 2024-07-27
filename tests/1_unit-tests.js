const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number input.', () => {
        let input = '1kg';
        assert.equal(convertHandler.getNum(input), 1);
        let input2 = '1';
        assert.equal(convertHandler.getNum(input), 1);
    })
    test('should correctly read a decimal number input.', () => {
        let input = '1.2mi'
        assert.equal(convertHandler.getNum(input), 1.2)
    })
    test('should correctly read a fractional input.', () => {
        let input = '1/2kg';
        assert.equal(convertHandler.getNum(input), 0.5);
        
    })
    test('should correctly read a fractional input with a decimal.', () => {
        let input = '2.5/5kg';
        assert.equal(convertHandler.getNum(input), 0.5);
    })
    test('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
        let input = '2/5/5kg';
        assert.equal(convertHandler.getNum(input), 'invalid number');
    })
    test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        let input = 'kg';
        assert.equal(convertHandler.getNum(input), 1);
    })
    test('should correctly read each valid input unit.', () => {
        let input1 = '1gal';
        assert.equal(convertHandler.getUnit(input1), 'gal');

        let input2 = '1L';
        assert.equal(convertHandler.getUnit(input2), 'L');

        let input3 = '1lbs';
        assert.equal(convertHandler.getUnit(input3), 'lbs');

        let input4 = '1kg';
        assert.equal(convertHandler.getUnit(input4), 'kg');

        let input5 = '1mi';
        assert.equal(convertHandler.getUnit(input5), 'mi');

        let input6 = '1km';
        assert.equal(convertHandler.getUnit(input6), 'km');
    })
    test('should correctly return an error for an invalid input unit.', ()=> {
        let input = '1monkey';
        assert.equal(convertHandler.getUnit(input), 'invalid unit');
    })
    test('should return the correct return unit for each valid input unit.', ()=> {
        let input1 = 'gal';
        assert.equal(convertHandler.getReturnUnit(input1), 'L');

        let input2 = 'L';
        assert.equal(convertHandler.getReturnUnit(input2), 'gal');

        let input3 = 'lbs';
        assert.equal(convertHandler.getReturnUnit(input3), 'kg');

        let input4 = 'kg';
        assert.equal(convertHandler.getReturnUnit(input4), 'lbs');

        let input5 = 'mi';
        assert.equal(convertHandler.getReturnUnit(input5), 'km');

        let input6 = 'km';
        assert.equal(convertHandler.getReturnUnit(input6), 'mi');
    })
    test('should correctly return the spelled-out string unit for each valid input unit.', () => {
        let input1 = 'gal';
        assert.equal(convertHandler.spellOutUnit(input1), 'galons');

        let input2 = 'L';
        assert.equal(convertHandler.spellOutUnit(input2), 'liters');

        let input3 = 'lbs';
        assert.equal(convertHandler.spellOutUnit(input3), 'pounds');

        let input4 = 'kg';
        assert.equal(convertHandler.spellOutUnit(input4), 'kilograms');

        let input5 = 'mi';
        assert.equal(convertHandler.spellOutUnit(input5), 'miles');

        let input6 = 'km';
        assert.equal(convertHandler.spellOutUnit(input6), 'kilometers');
    })
    test('should correctly convert gal to L.', () => {
        assert.equal(convertHandler.convert(1, 'gal'), Math.round(3.78541 * 100000) / 100000);
    })
    test('should correctly convert L to gal.', () => {
        assert.equal(convertHandler.convert(1, 'L'), Math.round(1/3.78541 * 100000) / 100000);
    })
    test('should correctly convert mi to km.', ()=> {
        assert.equal(convertHandler.convert(1, 'mi'), Math.round(1.60934 * 100000) / 100000);
    })
    test('should correctly convert km to mi.', ()=> {
        assert.equal(convertHandler.convert(1, 'km'), Math.round(1/1.60934 * 100000) / 100000);
    })
    test('should correctly convert lbs to kg.', ()=> {
        assert.equal(convertHandler.convert(1, 'lbs'), Math.round(0.453592 * 100000) / 100000);
    })
    test('should correctly convert kg to lbs.', ()=> {
        assert.equal(convertHandler.convert(1, 'kg'), Math.round(1/0.453592 * 100000) / 100000);
    })
});