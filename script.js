let validation = {
  handleSubmit: (event) => {
    event.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll("input");

    validation.clearErrors();
    
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = validation.checkInput(input);
      if (check !== true) {
        send = false;
        validation.showError(input, check);
      }
    }


    if(send) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");

    if (rules !== null) {
      rules = rules.split('|');
      for (let k in rules) {
        let rDatails = rules[k].split("=");
        switch (rDatails[0]) {
          case 'required':
            if(input.value == '') {
                return 'Campo não pode ser vazio';
            }

            break
          case 'min':
            break;
        }
      }
    }

    return true;
  },
  showError:(input, error) => {
    input.style.borderColor = 'red';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },

  clearErrors:() => {
    let inputs = form.querySelectorAll('input');
    for(let i=0;i<inputs.length;i++) {
        inputs[i].style = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for(let i=0;i<errorElements.length;i++) {
        errorElements[i].remove();
    }
  }
};

let form = document.querySelector(".validator");
form.addEventListener("submit",validation.handleSubmit);
