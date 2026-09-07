describe('Wave 15 Astral: Payment Invoice State Machine Guard', () => {
  type InvoiceStatus = 'DRAFT' | 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED';

  const isValidTransition = (from: InvoiceStatus, to: InvoiceStatus): boolean => {
    const allowedTransitions: Record<InvoiceStatus, InvoiceStatus[]> = {
      DRAFT: ['PENDING', 'CANCELLED'],
      PENDING: ['PAID', 'EXPIRED', 'CANCELLED'],
      PAID: [], // Terminal
      EXPIRED: [], // Terminal
      CANCELLED: [] // Terminal
    };
    return allowedTransitions[from]?.includes(to) || false;
  };

  it('should allow valid payment lifecycle status transitions', () => {
    expect(isValidTransition('DRAFT', 'PENDING')).toBe(true);
    expect(isValidTransition('PENDING', 'PAID')).toBe(true);
    expect(isValidTransition('PENDING', 'EXPIRED')).toBe(true);
  });

  it('should disallow invalid or terminal state transitions', () => {
    expect(isValidTransition('PAID', 'PENDING')).toBe(false);
    expect(isValidTransition('EXPIRED', 'PAID')).toBe(false);
    expect(isValidTransition('DRAFT', 'PAID')).toBe(false);
  });
});
