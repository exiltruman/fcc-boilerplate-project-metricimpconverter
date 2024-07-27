const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('convertHandler', function(){
    test('should correctly read a whole number input.', () => {
        let input = '1kg';
        assert(convertHandler.getNum(input) === 1);
        let input2 = '1';
        assert(convertHandler.getNum(input) === 1);
    })
    test('should correctly read a decimal number input.', () => {
        let input = '1.2mi'
        assert(convertHandler.getNum(input) === 1.2)
    })
    test('should correctly read a fractional input.', () => {
        let input = '1/2kg';
        assert(convertHandler.getNum(input) === 0.5);
        
    })
    test('should correctly read a fractional input with a decimal.', () => {
        let input = '2.5/5kg';
        assert(convertHandler.getNum(input) === 0.5);
    })
    test('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
        let input = '2/5/5kg';
        assert(convertHandler.getNum(input) === 'invalid number');
    })
    test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        let input = 'kg';
        assert(convertHandler.getNum(input) === 1);
    })
    test('should correctly read each valid input unit.', () => {
        let input1 = '1gal';
        assert(convertHandler.getUnit(input1) === 'gal');

        let input2 = '1L';
        assert(convertHandler.getUnit(input2) === 'L');

        let input3 = '1lbs';
        assert(convertHandler.getUnit(input3) === 'lbs');

        let input4 = '1kg';
        assert(convertHandler.getUnit(input4) === 'kg');

        let input5 = '1mi';
        assert(convertHandler.getUnit(input5) === 'mi');

        let input6 = '1km';
        assert(convertHandler.getUnit(input6) === 'km');
    })
    test('should correctly return an error for an invalid input unit.', ()=> {
        let input = '1monkey';
        assert(convertHandler.getUnit(input) === 'invalid unit');
    })
    test('should return the correct return unit for each valid input unit.', ()=> {
        let input1 = 'gal';
        assert(convertHandler.getReturnUnit(input1) === 'L');

        let input2 = 'L';
        assert(convertHandler.getReturnUnit(input2) === 'gal');

        let input3 = 'lbs';
        assert(convertHandler.getReturnUnit(input3) === 'kg');

        let input4 = 'kg';
        assert(convertHandler.getReturnUnit(input4) === 'lbs');

        let input5 = 'mi';
        assert(convertHandler.getReturnUnit(input5) === 'km');

        let input6 = 'km';
        assert(convertHandler.getReturnUnit(input6) === 'mi');
    })
    test('should correctly return the spelled-out string unit for each valid input unit.', () => {
        let input1 = 'gal';
        assert(convertHandler.spellOutUnit(input1) === 'galons');

        let input2 = 'L';
        assert(convertHandler.spellOutUnit(input2) === 'liters');

        let input3 = 'lbs';
        assert(convertHandler.spellOutUnit(input3) === 'pounds');

        let input4 = 'kg';
        assert(convertHandler.spellOutUnit(input4) === 'kilograms');

        let input5 = 'mi';
        assert(convertHandler.spellOutUnit(input5) === 'miles');

        let input6 = 'km';
        assert(convertHandler.spellOutUnit(input6) === 'kilometers');
    })
    test('should correctly convert gal to L.', () => {
        assert(convertHandler.convert(1, 'gal') === 3.78541);
    })
    test('should correctly convert L to gal.', () => {
        assert(convertHandler.convert(1, 'L') === 1/3.78541);
    })
    test('should correctly convert mi to km.', ()=> {
        assert(convertHandler.convert(1, 'mi') === 1.60934);
    })
    test('should correctly convert km to mi.', ()=> {
        assert(convertHandler.convert(1, 'km') === 1/1.60934);
    })
    test('should correctly convert lbs to kg.', ()=> {
        assert(convertHandler.convert(1, 'lbs') === 0.453592);
    })
    test('should correctly convert kg to lbs.', ()=> {
        assert(convertHandler.convert(1, 'kg') === 1/0.453592);
    })
});