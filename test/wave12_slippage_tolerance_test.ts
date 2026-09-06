describe('Wave 12 Vanguard: Crypto-Fiat Slippage Tolerance Guard', () => {
  const isSlippageAcceptable = (quotedRate: number, executedRate: number, maxSlippageBps: number = 100): boolean => {
    const diff = Math.abs(quotedRate - executedRate);
    const slippageBps = (diff / quotedRate) * 10000;
    return slippageBps <= maxSlippageBps;
  };

  it('should approve transactions within 1.0% (100 bps) exchange rate variance', () => {
    const quote = 1.00;
    const executed = 1.005; // 0.5% slippage
    expect(isSlippageAcceptable(quote, executed, 100)).toBe(true);
  });

  it('should reject execution when exchange rate drift exceeds tolerance threshold', () => {
    const quote = 1.00;
    const executed = 1.025; // 2.5% slippage
    expect(isSlippageAcceptable(quote, executed, 100)).toBe(false);
  });
});
