import { test, expect } from "@playwright/test";

test("Успішне додавання нової витрати", async ({ page }) => {
  // Перехід на сайт
  await page.goto("http://localhost:5173");

  // Натискання кнопки "+ Додати операцію"
  await page.click("text=+ Додати операцію");

  // Заповнення форми в модальному вікні
  await page.fill('input[placeholder*="Назва"]', "Купівля кави");
  await page.fill('input[placeholder*="Сума"]', "80");
  await page.selectOption("select", "expense"); // обираємо тип "Витрата"

  // Натискання "Додати" (це має закрити модалку)
  await page.click("button.submit-btn");

  // Перевірка: чи з'явився новий рядок в історії
  const historyItem = page.locator(".transaction-list").first();
  await expect(historyItem).toContainText("Купівля кави");
  await expect(historyItem).toContainText("-80 грн");

  // Перевірка: чи оновився блок "Витрати" зверху
  const expenseCard = page.locator(".card.expense p");
  await expect(expenseCard).toContainText("80.00 грн");
});

test("Валідація: неможливо додати транзакцію з порожніми полями", async ({
  page,
}) => {
  await page.goto("http://localhost:5173"); 

  await page.click("text=+ Додати операцію");

  // Очікування появу діалогового вікна (alert)
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Заповність всі поля!");
    await dialog.accept();
  });

  // Натискання "Додати", нічого не заповнюючи
  await page.click("button.submit-btn");

  // Перевірка: модальне вікно не закрилося 
  const modalHeader = page.locator('h3:has-text("Нова операція")');
  await expect(modalHeader).toBeVisible();

  // Перевірка: в списку історіі не з'явилося порожніх записів
  const historyItems = page.locator(".transaction-row");
  await expect(historyItems).toHaveCount(0); // Якщо спочатку список був порожнім
});
