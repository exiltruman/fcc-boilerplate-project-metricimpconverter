function ConvertHandler() {
  
  // result serves as initNum
  // @input string
  this.getNum = function(input) {
    let index = input.search(/[a-zA-Z]/);
    index = index === -1 ? 999 : index;

    let slicedNumbers = input.slice(0, index);
    let calculatedNumber;
    switch (slicedNumbers.match(/\//g)?.length) {
      case  undefined : {
        calculatedNumber = slicedNumbers;
        break;
      }
      case 1 : {
        calculatedNumber = (() => { let [first, second] = slicedNumbers.split('/').map(Number); return first/second})();
        break;
      }
      default :{
        calculatedNumber = 'invalid number'
      }
    }

    calculatedNumber ||= '1';

    let result = calculatedNumber
    if (!isNaN(+result)) {
      return +result
    }

    return result;
  };

  const unitsMap = new Map([
    ['gal', 'L'],
    ['L', 'gal'],
    ['lbs', 'kg'],
    ['kg', 'lbs'],
    ['mi', 'km'],
    ['km', 'mi'],
  ])

  const spelledUnitsMap = new Map([
    ['gal', 'galons'],
    ['L', 'liters'],
    ['lbs', 'pounds'],
    ['kg', 'kilograms'],
    ['mi', 'miles'],
    ['km', 'kilometers']
  ])

  // result serves as initUnit
  this.getUnit = function(input) {
    let index = input.search(/[a-zA-Z]/);
    index = index === -1 ? 0 : index;

    let slicedUnit = input.slice(index);
    slicedUnit = ['l', 'L'].includes(slicedUnit) ? 'L' : slicedUnit.toLowerCase();

    result = unitsMap.has(slicedUnit) ? slicedUnit : 'invalid unit';
    
    return result;
  };
  
  // result serves as returnUnit
  this.getReturnUnit = function(initUnit) {
    let result = unitsMap.get(initUnit);
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = spelledUnitsMap.get(unit);
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal': {
        result = initNum * galToL
        break;
      }
      case 'L': {
        result = initNum / galToL
        break;
      }
      case 'mi': {
        result = initNum * miToKm
        break;
      }
      case 'km': {
        result = initNum / miToKm
        break;
      }
      case 'lbs': {
        result = initNum * lbsToKg
        break;
      }
      case 'kg': {
        result = initNum / lbsToKg
      }
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
