import { test as base, expect } from '@playwright/test';

// A página abre atrás de uma tela de carregamento que trava o scroll: todo `goto` espera ela sair.
export const test = base.extend({
  page: async ({ page }, use) => {
    const goto = page.goto.bind(page);
    page.goto = async (url, options) => {
      const response = await goto(url, options);
      await page.waitForSelector('[data-loader]', { state: 'detached', timeout: 15000 });
      return response;
    };
    await use(page);
  },
});

export { expect };
