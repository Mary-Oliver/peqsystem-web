
document.addEventListener("DOMContentLoaded", () => {


    const productData = {
        "001": { code: "001", name: "Coca-Cola 2L", price: 8.50 },
        "002": { code: "002", name: "Pão Francês (un)", price: 0.50 },
        "003": { code: "003", name: "Leite 1L", price: 4.00 },
        "004": { code: "004", name: "Arroz 5kg", price: 25.00 },
        "005": { code: "005", name: "Sabonete", price: 3.50 }
    };

    
    const productCodeInput = document.getElementById("product-code");
    const addProductBtn = document.getElementById("add-product-btn");
    const salesBody = document.getElementById("sales-body");

   
    const summaryItems = document.getElementById("summary-items");
    const summarySubtotal = document.getElementById("summary-subtotal");
    const discountPercentInput = document.getElementById("discount-percent"); 
    const discountValueSpan = document.getElementById("discount-value");      
    const summaryTotalFinal = document.getElementById("summary-total-final");
    const totalValue = document.getElementById("total-value"); 

  
    const paymentMethodSelect = document.getElementById("payment-method");
    const receivedValueInput = document.getElementById('received-value');
    const trocoValueDisplay = document.getElementById('troco-value');

   
    const finishSaleBtn = document.getElementById("finish-sale");
    const cancelSaleBtn = document.getElementById("cancel-sale");
    
    
    const quickProductsContainer = document.getElementById("quick-products");
    const cashierTime = document.getElementById("cashier-time");

    
    let currentSale = [];
    let totalPagar = 0; 

   
    function money(v) {
        return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

   
    function updateClock() {
        if (!cashierTime) return;
        const now = new Date();
        cashierTime.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

  
    function populateQuickProducts() {
        if (!quickProductsContainer) return;
        quickProductsContainer.innerHTML = "";
        Object.values(productData).slice(0, 8).forEach(p => {
            const btn = document.createElement('button');
            btn.type = "button";
            btn.className = "qp-btn";
            btn.textContent = `${p.name} — R$ ${money(p.price)}`;
            btn.dataset.code = p.code;
            btn.addEventListener('click', () => addProductByCode(p.code));
            quickProductsContainer.appendChild(btn);
        });
    }

   
    function calculateTroco() {
        if (!receivedValueInput || !trocoValueDisplay) return; 

        const totalFinal = totalPagar; 
        const receivedValue = parseFloat(String(receivedValueInput.value).replace(',', '.')) || 0;
        
        let troco = receivedValue - totalFinal;
        if (troco < 0) {
            troco = 0; 
        }
        trocoValueDisplay.textContent = `R$ ${money(troco)}`;
    }

    
    function updateTable() {
        salesBody.innerHTML = "";
        let subtotal = 0;
        let itemsCount = 0;

        const discountPercent = Number(discountPercentInput.value) / 100;

        currentSale.forEach((it, idx) => {
            const itemTotal = it.qty * it.price;
            subtotal += itemTotal;
            itemsCount += it.qty;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="td-name">${it.name}</td>
                <td>
                    <input type="number" class="qty-input" min="1" value="${it.qty}" data-index="${idx}" />
                </td>
                <td>R$ ${money(it.price)}</td>
                <td>R$ ${money(itemTotal)}</td>
                <td><button class="remove-btn" data-index="${idx}">X</button></td>
            `;
            salesBody.appendChild(tr);
        });
        
        const discountAmount = subtotal * discountPercent;
        const totalFinal = subtotal - discountAmount; 
        
      
        totalPagar = totalFinal;
        
       
        summaryItems.textContent = itemsCount;
        summarySubtotal.textContent = `R$ ${money(subtotal)}`;
        discountValueSpan.textContent = `R$ ${money(discountAmount)}`;
        summaryTotalFinal.textContent = `R$ ${money(totalFinal)}`;
        
        
        if(totalValue) totalValue.textContent = money(totalFinal); 

        calculateTroco(); 
    }

    
    function addProductByCode(code) {
        const p = productData[code];
        if (!p) {
            alert("Produto não encontrado (código inválido).");
            productCodeInput.value = "";
            productCodeInput.focus();
            return;
        }

        const existing = currentSale.find(it => it.code === code);
        if (existing) {
            existing.qty += 1;
        } else {
            currentSale.push({ ...p, qty: 1 });
        }
        updateTable();
        productCodeInput.value = "";
        productCodeInput.focus();
    }

  
   
  
    addProductBtn.addEventListener('click', () => {
        const code = productCodeInput.value.trim();
        if (!code) return;
        addProductByCode(code);
    });

    productCodeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const code = productCodeInput.value.trim();
            if (code) addProductByCode(code);
        }
    });

    salesBody.addEventListener('input', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const idx = Number(e.target.dataset.index);
            let v = parseInt(e.target.value, 10);
            if (isNaN(v) || v < 1) { v = 1; e.target.value = 1; }
            currentSale[idx].qty = v;
            updateTable();
        }
    });

    salesBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const idx = Number(e.target.dataset.index);
            currentSale.splice(idx, 1);
            updateTable();
        }
    });

    cancelSaleBtn.addEventListener('click', () => {
        if (!confirm("Deseja cancelar a venda atual?")) return;
        currentSale = [];
        discountPercentInput.value = 0;
        receivedValueInput.value = "0.00";
        updateTable(); 
        productCodeInput.focus();
    });

    finishSaleBtn.addEventListener('click', () => {
        if (currentSale.length === 0) { alert("Nenhum produto na venda."); return; }

        const payment = paymentMethodSelect.value;
        const total = summaryTotalFinal.textContent;

        const summary = {
            items: currentSale.map(i => ({ code: i.code, name: i.name, qty: i.qty, price: i.price })),
            total: total,
            discount: discountPercentInput.value + '%',
            payment,
            troco: trocoValueDisplay.textContent
        };

        console.info("Venda salva (simulada):", summary);
        alert(`Venda finalizada!\nTotal: ${total}\nPagamento: ${payment}\nTroco: ${summary.troco}`);

        currentSale = [];
        discountPercentInput.value = 0;
        receivedValueInput.value = "0.00";
        updateTable();
        productCodeInput.focus();
    });

   
    discountPercentInput.addEventListener('input', updateTable);
    receivedValueInput.addEventListener('input', calculateTroco);
    receivedValueInput.addEventListener('change', calculateTroco); 

   
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'F7':
                e.preventDefault();
                productCodeInput.focus();
                productCodeInput.select();
                break;
            case 'F8':
                e.preventDefault();
                cancelSaleBtn.click(); 
                break;
            case 'F12':
                e.preventDefault();
                finishSaleBtn.click(); 
                break;
            case 'Escape':
                if (document.activeElement.classList.contains('qty-input')) {
                    productCodeInput.focus();
                }
                break;
        }
    });

   
    setInterval(updateClock, 1000);
    updateClock();
    populateQuickProducts();
    updateTable();
    productCodeInput.focus();

});