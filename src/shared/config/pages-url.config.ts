class PAGES {
  private root = '/';

  HOME = this.root;
  ADMIN = `/admin`;
  ADMIN_AUTH = `/admin/auth`;
  // AUTH
  REGISTER = `/auth/register`;
  LOGIN = `/auth/login`;
  VERIFY_EMAIL = `/auth/confirm`;
  FORGOT_PASSWORD = `/auth/forgot-password`;
  // PRODUCTS
  PRODUCTS = `/products`;
  CART = `/cart`;
  CHECKOUT = `/checkout`;
  CONFIRMATION = `${this.CHECKOUT}/confirmation`;
  // Auxiliaries
  UNAUTHORIZED = `/403`;
}

export const APP_PAGES = new PAGES();
