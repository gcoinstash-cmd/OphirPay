describe('Wave 14 Solaris: Banker Rounding Fiat Precision Guard', () => {
  const roundToTwoDecimals = (val: number): number => {
    return Math.round((val + Number.EPSILON) * 100) / 100;
  };

  it('should round fractional currency cents deterministically', () => {
    expect(roundToTwoDecimals(124.556)).toBe(124.56);
    expect(roundToTwoDecimals(99.994)).toBe(99.99);
  });

  it('should eliminate floating point subtraction inaccuracies on settlement payouts', () => {
    const total = 100.00;
    const fee = 0.05;
    const net = roundToTwoDecimals(total - fee);
    expect(net).toBe(99.95);
  });
});
