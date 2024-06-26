import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegistePage } from "../page-objects/RegisterPage";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { paymentDetails } from "../data/paymentDetails";

test("New user full end-to-end test journey", async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);
  await productPage.toBeGreaterThan(10);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();
  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();
  const loginpage = new LoginPage(page);
  await loginpage.goToRegisterPage();
  const registerPage = new RegistePage(page);
  const password = uuidv4();
  const email = uuidv4() + "@gmail.com";
  await registerPage.singUpAsNewUser(email, password);
  const deliveryDetails = new DeliveryDetails(page);
  await deliveryDetails.fillDetails(userAddress);
  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();
  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails);
  await paymentPage.completePayment();
});
