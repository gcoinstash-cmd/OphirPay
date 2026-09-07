describe('Wave 17 Eclipse: Multi-Currency FX Conversion Precision Guard', () => {
  const convertAmount = (amountCents: number, exchangeRate: number): number => {
    if (amountCents < 0 || exchangeRate <= 0) {
      throw new Error('Invalid conversion parameters');
    }
    // Round to nearest integer cents
    return Math.round(amountCents * exchangeRate);
  };

  it('should accurately convert fiat currency amounts with exchange rates', () => {
    // $100.00 USD (10000 cents) at 0.92 EUR/USD -> 9200 cents (92.00 EUR)
    expect(convertAmount(10000, 0.92)).toBe(9200);

    // $49.99 USD (4999 cents) at 1.35 CAD/USD -> 6749 cents (67.49 CAD)
    expect(convertAmount(4999, 1.35)).toBe(6749);
  });

  it('should throw validation error on non-positive exchange rate or negative amount', () => {
    expect(() => convertAmount(-500, 1.0)).toThrow('Invalid conversion parameters');
    expect(() => convertAmount(1000, 0)).toThrow('Invalid conversion parameters');
    expect(() => convertAmount(1000, -0.5)).toThrow('Invalid conversion parameters');
  });
});
