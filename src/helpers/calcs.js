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
const __ELECTRICAL_THRESHOLD__ = 1000

export const dataGen = (smallRange, largeRange, electricalRange) => {
  var data = []
  var units = __STEP_SIZE__

  var small = {
  	low: smallRange[0],
  	hi: smallRange[1],
  	var: smallRange[1] - smallRange[0],
  	current: smallRange[1]
  }

  var large = {
  	low: largeRange[0],
  	hi: largeRange[1],
  	var: largeRange[1] - largeRange[0],
  	current: largeRange[1]
  }

  var electrical = {
  	low: electricalRange[0],
  	hi: electricalRange[1],
  	var: electricalRange[1] - electricalRange[0],
  	current: electricalRange[1]
  }

	var total = small.current + large.current + electrical.current

  for (var i = 0; i < __STEP_COUNT__; i++) {
  	units = __STEP_SIZE__ * (i + 1)

  	small.current = small.var * Math.exp(-0.0003 * units) + small.low
    large.current = large.var * Math.exp(-0.0002 * units) + large.low
    
    electrical.current = electrical.current
    if (units > __ELECTRICAL_THRESHOLD__) {
    	electrical.current = electrical.var * Math.exp(-0.001 * ( units - __ELECTRICAL_THRESHOLD__ )) + electrical.low
    }
    // if (units > __ELECTRICAL_THRESHOLD__) {
    // 	electrical = initial_electrical 
    // }

    data.push({
      units: units,
      small: roundN(small.current, 2),
      large: roundN(large.current, 2),
      electrical: roundN(electrical.current, 2),
      total: roundN(small.current + large.current + electrical.current, 2)
    })



  }
  return data

}