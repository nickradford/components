import { newSpecPage } from '@stencil/core/testing';
import { CurrencyConverter } from '../currency-converter';

describe('currency-converter', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CurrencyConverter],
      html: `<currency-converter value="2000"></currency-converter>`,
    });
    expect(page.root).toEqualHtml(`
      <currency-converter>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </currency-converter>
    `);
  });
});
