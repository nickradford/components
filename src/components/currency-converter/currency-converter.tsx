import { Component, Host, h, Prop } from '@stencil/core';

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

  render() {
    return (
      <Host>
        <slot>{this.renderCurrency()}</slot>
      </Host>
    );
  }
}
