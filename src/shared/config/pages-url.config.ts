class PAGES {
  private root = '/';

  HOME = this.root;
  // AUTH
  REGISTER = `/auth/register`;
  LOGIN = `/auth/login`;
  VERIFY_EMAIL = `/auth/confirm`;
  // PRODUCTS
  PRODUCTS = `/products`;
  CART = `/cart`;
  CHECKOUT = `/checkout`;
  CONFIRMATION = `${this.CHECKOUT}/confirmation`;
}

export const APP_PAGES = new PAGES();
