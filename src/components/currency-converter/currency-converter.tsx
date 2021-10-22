import { Component, Host, h, Prop, Fragment } from '@stencil/core';

@Component({
  tag: 'currency-converter',
  styleUrl: 'currency-converter.css',
  shadow: true,
})
export class CurrencyConverter {
  @Prop() from: string = 'MXN';
  @Prop() to: string = 'USD';
  @Prop() roundTo: number = 2;
  @Prop() value: number = 20;
  @Prop() format: string = '{{value}}';

  convertedValue: number;

  async componentWillLoad() {
    console.log(
      JSON.stringify({
        from: this.from,
        to: this.to,
        amount: this.value?.toString(),
        places: this.roundTo?.toString(),
      }),
    );
    await this.fetchData();
  }

  async fetchData() {
    const params = new URLSearchParams({
      from: this.from,
      to: this.to,
      amount: this.value?.toString(),
      places: this.roundTo?.toString(),
    });
    const url = `https://api.exchangerate.host/convert?${params.toString()}`;
    const resp = await fetch(url);
    const data = await resp.json();
    this.convertedValue = data.result;
  }

  renderCurrency() {
    return this.convertedValue
      ? this.convertedValue.toLocaleString(undefined, { style: 'currency', currency: this.to, minimumFractionDigits: this.roundTo, maximumFractionDigits: this.roundTo })
      : null;
  }

  renderComponent() {
    let output = this.format.replace('{{value}}', this.renderCurrency()).replace('{{to}}', this.to);

    return h(Fragment, null, output);
  }

  render() {
    return (
      <Host>
        <slot>{this.renderComponent()}</slot>
      </Host>
    );
  }
}
