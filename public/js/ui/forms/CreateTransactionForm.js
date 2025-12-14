/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    
    if (!select) {
      return;
    }
    
    select.innerHTML = '';
    
    Account.list(null, (error, response) => {
      if (error || !response || !response.success) {
        return;
      }
      
      response.data.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        select.appendChild(option);
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (error || !response || !response.success) {
        return;
      }
      
      this.element.reset();
      App.update();
      
      const modalId = this.element.closest('.modal').id;
      const modalName = modalId === 'modal-new-income' ? 'newIncome' : 
                       modalId === 'modal-new-expense' ? 'newExpense' : null;
      
      if (modalName) {
        const modal = App.getModal(modalName);
        if (modal) {
          modal.close();
        }
      }
    });
  }
}