class PAGES {
  private root = '/';

  HOME = this.root;
  ADMIN = `/admin`;
  // AUTH
  REGISTER = `/auth/register`;
  LOGIN = `/auth/login`;
  VERIFY_EMAIL = `/auth/confirm`;
  // PRODUCTS
  PRODUCTS = `/products`;
  CART = `/cart`;
  CHECKOUT = `/checkout`;
  CONFIRMATION = `${this.CHECKOUT}/confirmation`;
  // Auxiliaries
  UNAUTHORIZED = `/403`;
}

export const APP_PAGES = new PAGES();
