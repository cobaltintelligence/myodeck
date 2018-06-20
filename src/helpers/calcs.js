// calcs.js

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

export const toFaranheit = (celsius) => {
	return celsius * 9.0 / 5.0 + 32
}

export const skyconCode = (s) => {
	var res = s.toUpperCase()
	var out = res.replaceAll('-', '_')
	return out
}

export const roundN = (x, n) => {
	var base = Math.pow(10, n) 
	return Math.round(x * base) / base
}

const __STEP_SIZE__ = 100
const __STEP_COUNT__ = 100

const __SMALL_ASYMPTOTE__ = 1000
const __ELECTRICAL_ASYMPTOTE__ = 2000

const __ELECTRICAL_THRESHOLD__ = 1000

export const dataGen = (initial_small, initial_large, initial_electrical) => {
  var data = []
  var units = __STEP_SIZE__
  var small = initial_small
  var large = initial_large
  var electrical = initial_electrical

  var total = small + large + electrical

  for (var i = 0; i < __STEP_COUNT__; i++) {
  	units = __STEP_SIZE__ * (i + 1)

  	small = initial_small * Math.exp(-0.0005 * units) + __SMALL_ASYMPTOTE__
    large = initial_large * Math.exp(-0.0005 * units)
    electrical = initial_electrical * Math.exp(-0.0005 * units)

    // if (units > __ELECTRICAL_THRESHOLD__) {
    // 	electrical = initial_electrical 
    // }

    data.push({
      units: units,
      small: small,
      large: large ,
      electrical: electrical,
      total: small + large + electrical
    })



  }
  return data

}