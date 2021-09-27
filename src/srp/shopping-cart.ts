type CartItem = { name: string; price: number };
type OrderStatus = 'Open' | 'Closed';

export class ShoppingCart {
  private readonly _items: CartItem[] = [];
  private _orderStatus?: OrderStatus = 'Open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus | undefined {
    return this._orderStatus;
  }

  total(): string {
    return this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'Closed';
    this.sendMessage(
      `Seu pedido com o o total de ${this.total()} foi recebido`,
    );
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('Mensagem envisada', msg);
  }

  saveOrder(): void {
    console.log('pedido salvo com sucesso');
  }
  clear(): void {
    console.log('Carrinho de compras foi limpo...');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCart();

shoppingCart.addItem({ name: 'Camiseta', price: 49.91 });
shoppingCart.addItem({ name: 'Caderno', price: 9.9123 });
shoppingCart.addItem({ name: 'Lápis', price: 1.59 });

//shoppingCart.clear();

console.log(shoppingCart.items);

console.log(shoppingCart.total());

console.log('Status', shoppingCart.orderStatus);

shoppingCart.checkout();

console.log('Status', shoppingCart.orderStatus);
