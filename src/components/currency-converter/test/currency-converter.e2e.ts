import { newE2EPage } from '@stencil/core/testing';

describe('currency-converter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<currency-converter from="MXN" to="USD" value="2000" round-to="2"></currency-converter>');

    const element = await page.find('currency-converter');
    expect(element).toHaveClass('hydrated');
  });
});
