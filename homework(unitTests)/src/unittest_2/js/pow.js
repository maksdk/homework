function pow(x,n) {
	if ((n < 0) || (Math.round(n) != n) || (x == 0 && n == 0)) {return NaN};
    var res = 1;
    for (var i = 0; i < n; i++) {
        res = x * res;
      }
    return res;
}
module.exports = pow;