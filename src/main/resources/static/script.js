document.addEventListener('DOMContentLoaded', function() {
    
  
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const container = document.querySelector('.container');
    const collapsedClass = 'collapsed'; 

 
    if (sidebarToggle && sidebar && container) {
        
      
        const updateToggleButton = (isCollapsed) => {
            const icon = sidebarToggle.querySelector('i');
            const span = sidebarToggle.querySelector('span');

            if (icon) {
                if (isCollapsed) {
                    icon.className = 'fa-solid fa-angles-right';
                } else {
                    icon.className = 'fa-solid fa-angles-left';
                }
            }
            if (span) {
                if (isCollapsed) {
                    span.textContent = 'Expandir Menu';
                } else {
                    span.textContent = 'Recolher Menu';
                }
            }
        };

      
        const toggleSidebar = () => {
          
            sidebar.classList.toggle(collapsedClass);
            container.classList.toggle(collapsedClass);
            
            const isCollapsed = sidebar.classList.contains(collapsedClass);

           
            localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');

          
            updateToggleButton(isCollapsed);
        };

        
        sidebarToggle.addEventListener('click', toggleSidebar);

        
        const savedState = localStorage.getItem('sidebarState');
        const initialIsCollapsed = container.classList.contains(collapsedClass);
        
        let shouldBeCollapsed = initialIsCollapsed;

        if (savedState) {
           
            shouldBeCollapsed = (savedState === 'collapsed');
        }
        
        if (shouldBeCollapsed) {
            sidebar.classList.add(collapsedClass);
            container.classList.add(collapsedClass); 
        } else {
            sidebar.classList.remove(collapsedClass);
            container.classList.remove(collapsedClass); 
        }
        
     
        updateToggleButton(shouldBeCollapsed);
    }
    
   
    const sairButton = document.querySelector('.menu-item.logout');
    if (sairButton) {
        sairButton.addEventListener('click', (e) => {
            if (!confirm("Deseja realmente sair do sistema?")) {
                e.preventDefault();
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    /* 
       VALIDAÇÃO DO FORMULÁRIO DE CLIENTES 
     */
    const formCliente = document.getElementById('cadastroClienteForm');
    const feedbackMensagem = document.getElementById('feedbackMensagem');
    
    if (formCliente) {
        formCliente.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
          
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const nascimento = document.getElementById('nascimento').value;
            const email = document.getElementById('email').value.trim();
            const estado = document.getElementById('estado').value;
            const cidade = document.getElementById('cidade').value;
            const bairro = document.getElementById('bairro').value.trim();
            const genero = document.querySelector('input[name="genero"]:checked');
            
            let isValid = true;
            let errors = [];
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const telefoneLimpo = telefone.replace(/\D/g, ''); 
            const cpfLimpo = cpf.replace(/\D/g, ''); 
            
            if (nome === "") { errors.push("O campo Nome é obrigatório."); isValid = false; }
            if (nascimento === "") { errors.push("O campo Data de Nascimento é obrigatório."); isValid = false; }
            if (estado === "") { errors.push("O campo Estado é obrigatório."); isValid = false; }
            if (cidade === "") { errors.push("O campo Cidade é obrigatório."); isValid = false; }
            if (bairro === "") { errors.push("O campo Bairro é obrigatório."); isValid = false; }
            if (!genero) { errors.push("O campo Gênero é obrigatório."); isValid = false; }
            
            if (email === "" || !emailRegex.test(email)) {
                errors.push("O formato do E-mail é inválido ou está vazio."); 
                isValid = false;
            }

            if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) { 
                errors.push("O telefone deve ter 10 ou 11 dígitos (com DDD)."); 
                isValid = false;
            }
            if (cpfLimpo.length !== 11) { 
                errors.push("O CPF deve conter 11 dígitos numéricos."); 
                isValid = false;
            }
            
            if (isValid) {
                feedbackMensagem.style.color = 'green';
                feedbackMensagem.innerHTML = '✅ **Cliente Validado e Salvo com Sucesso!** (Simulação)';
                console.log("Dados do Cliente Validados e Prontos para Envio:", { nome, email, cpf });
                formCliente.reset(); 
            } else {
                feedbackMensagem.style.color = 'red';
                feedbackMensagem.innerHTML = '⚠️ **Corrija os seguintes erros:**<ul>' + 
                                             errors.map(err => `<li>${err}</li>`).join('') + 
                                             '</ul>';
            }
        });
    }

   
    document.querySelectorAll(".count").forEach((el) => {
        const finalValue = Number(el.dataset.value); 
        let start = 0;
        const step = finalValue / 60; 
        const timer = setInterval(() => {
            start += step;
            if (start >= finalValue) {
                el.textContent = finalValue; 
                clearInterval(timer); 
            } else {
                el.textContent = Math.floor(start); 
            }
        }, 20); 
    });

   
    document.querySelectorAll(".toggle-card").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card"); 
            const body = card.querySelector(".card-body"); 
            const collapsed = card.dataset.collapsed === "true"; 

            if (collapsed) {
                body.style.display = "block"; 
                btn.textContent = "–"; 
                card.dataset.collapsed = "false"; 
            } else {
                body.style.display = "none"; 
                btn.textContent = "+"; 
                card.dataset.collapsed = "true"; 
            }
        });
    });

});