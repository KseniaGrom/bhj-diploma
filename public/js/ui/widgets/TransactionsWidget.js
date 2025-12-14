/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    
    this.element = element;
    this.registerEvents();
  }

  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button');
    const createExpenseButton = this.element.querySelector('.create-expense-button');
    
    if (createIncomeButton) {
      createIncomeButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('newIncome');
        if (modal) {
          modal.open();
        }
      });
    }
    
    if (createExpenseButton) {
      createExpenseButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('newExpense');
        if (modal) {
          modal.open();
        }
      });
    }
  }
}