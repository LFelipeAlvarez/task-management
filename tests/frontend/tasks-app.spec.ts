import { test, expect, type Page } from '@playwright/test';

test.describe('First visit to the app', () => {

  test('When the user goes to an existing board', async ({ page }) => {

    const existingBoardId = '433ef3c6-0faa-4271-82e1-b534f0a136a9'

    await page.goto(`http://localhost:5173/board/${existingBoardId}`);
    await expect(page.getByRole('heading', { name: 'My task board' })).toBeVisible()

    await page.goto('http://localhost:5173');
    await expect(page.getByRole('heading', { name: 'My task board' })).toBeVisible()
    const newBoardId = page.url().split('/').pop()
    expect(existingBoardId).not.toBe(newBoardId)
  })

  test('When the user goes to the main page', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('heading', { name: 'My task board' })).toBeVisible()
  })
})
test.describe('It is not the first visit', () => {
  const currentUserBoardId = 'testingid'

  test('When the user goes to an existing board', async ({ page, context }) => {
    const existingBoardId = '433ef3c6-0faa-4271-82e1-b534f0a136a9'

    await context.addCookies([{ name: "taskManagementBoardId", value: currentUserBoardId, url: "http://localhost:5173" }]);

    await page.goto(`http://localhost:5173/board/${existingBoardId}`);
    await expect(page.getByRole('heading', { name: 'My task board' })).toBeVisible()
    let currentBoardId = page.url().split('/').pop()
    expect(currentBoardId).toBe(existingBoardId)

    //Going to the current user task board
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('heading', { name: 'My task board' })).toBeVisible()
    currentBoardId = page.url().split('/').pop()
    expect(currentBoardId).toBe(currentUserBoardId)
  })

  test('When the user goes to the main page', async ({ page, context }) => {
    await context.addCookies([{ name: "taskManagementBoardId", value: currentUserBoardId, url: "http://localhost:5173" }]);
    await page.goto('http://localhost:5173');
    const title = page.getByRole('heading', { name: 'My task board' })
    await expect(title).toBeVisible()
  })

})


const DEFAULT_ICON = "http://localhost:5173/coffee.svg"
const DEFAULT_STATUS = 1
const TASK = {
  title: "Go to the gym",
  description: "Let's build some muscles",
  icon: DEFAULT_ICON,

}

test.describe('Task actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });


  test('adding task', async ({ page }: { page: Page }) => {
    await createDefaulTask(page)
    await expect(page.getByRole('listitem').getByRole('heading')).toHaveText(TASK.title)
    await expect(page.getByRole('listitem').getByRole('paragraph')).toHaveText(TASK.description)
    await expect(page.getByRole('listitem').locator('img')).toHaveAttribute('src', TASK.icon)
  })


  test('editing task', async ({ page }: { page: Page }) => {
    await createDefaulTask(page)
    await page.getByRole('listitem').click()
    await expect(page.getByText('Task details')).toBeVisible()
    await page.getByLabel('Task name').fill('edited');
    await page.getByLabel('Description').fill('edited');
    await page.locator(`label img[src="/alarm-clock.svg"]`).click()
    await page.getByText('Completed').click()

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByRole('listitem').getByRole('heading')).toHaveText('edited')
    await expect(page.getByRole('listitem').getByRole('paragraph')).toHaveText('edited')
    await expect(page.getByRole('listitem').locator('img')).toHaveAttribute('src', "http://localhost:5173/alarm-clock.svg")


  })

})


async function createDefaulTask(page: Page) {

  await page.getByRole('button', { name: 'Add New Task' }).click();
  await expect(page.getByText('Task details')).toBeVisible()
  await expect(page.locator(`input[name="icon"][value="${DEFAULT_ICON}"]`)).toBeChecked()

  await page.getByLabel('Task name').fill(TASK.title);
  await page.getByLabel('Description').fill(TASK.description);
  await page.locator(`input[name="icon"][value="${TASK.icon}"]`).check();
  await page.getByLabel('In Progress').check();
  await page.getByRole('button', { name: 'Save' }).click();

}




