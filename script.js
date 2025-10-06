
// พื้นฐาน LocalStorage และการจัดการข้อมูล
let employees = JSON.parse(localStorage.getItem('employees')) || [];
let bills = JSON.parse(localStorage.getItem('bills')) || [];
let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];

// เติมตัวอย่างพนักงานและบิลถ้ายังไม่มี
if(employees.length === 0){ employees = ['พนักงาน A','พนักงาน B']; localStorage.setItem('employees', JSON.stringify(employees)); }
if(bills.length === 0){ bills = ['B001','B002','B003']; localStorage.setItem('bills', JSON.stringify(bills)); }

// หน้า index.html
if(document.getElementById('employee-select')){
    const select = document.getElementById('employee-select');
    employees.forEach(e=>{ let opt = document.createElement('option'); opt.value=e; opt.textContent=e; select.appendChild(opt); });

    const tableContainer = document.getElementById('delivery-table-container');
    const dateInput = document.getElementById('delivery-date');
    dateInput.valueAsDate = new Date();

    function renderTable(){
        tableContainer.innerHTML = '';
        let table = document.createElement('table');
        let header = table.insertRow();
        ['รหัสบิล','สถานะ','สาเหตุ','รายละเอียดเพิ่มเติม','บิลกลับหรือไม่'].forEach(h=>{ let th=document.createElement('th'); th.textContent=h; header.appendChild(th); });
        bills.forEach(b=>{
            let row = table.insertRow();
            row.insertCell().textContent = b;
            let statusCell = row.insertCell();
            let statusSelect = document.createElement('select');
            ['','ส่งสำเร็จ','ไม่สำเร็จ'].forEach(s=>{ let opt=document.createElement('option'); opt.value=s; opt.textContent=s; statusSelect.appendChild(opt); });
            statusCell.appendChild(statusSelect);

            let reasonCell = row.insertCell();
            let reasonSelect = document.createElement('select');
            ['','ยกเลิก','ค้างส่ง'].forEach(s=>{ let opt=document.createElement('option'); opt.value=s; opt.textContent=s; reasonSelect.appendChild(opt); });
            reasonCell.appendChild(reasonSelect);

            let detailCell = row.insertCell();
            let detailInput = document.createElement('input'); detailInput.type='text'; detailCell.appendChild(detailInput);

            let backCell = row.insertCell();
            let backSelect = document.createElement('select');
            ['','ใช่','ไม่'].forEach(s=>{ let opt=document.createElement('option'); opt.value=s; opt.textContent=s; backSelect.appendChild(opt); });
            backCell.appendChild(backSelect);
        });
        tableContainer.appendChild(table);
    }
    renderTable();

    document.getElementById('save-btn').addEventListener('click',()=>{
        alert('บันทึกข้อมูลเรียบร้อย! (ระบบ Local Storage)');
    });
}

// หน้า admin.html (พื้นฐานล็อกอินและแสดง admin panel)
if(document.getElementById('login-btn')){
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('admin-password');
    const panel = document.getElementById('admin-panel');
    loginBtn.addEventListener('click',()=>{
        if(passwordInput.value==='1234'){ panel.style.display='block'; document.getElementById('login-container').style.display='none'; }
        else{ alert('รหัสไม่ถูกต้อง'); }
    });
    document.getElementById('logout-btn').addEventListener('click',()=>{ panel.style.display='none'; document.getElementById('login-container').style.display='block'; passwordInput.value=''; });
}
