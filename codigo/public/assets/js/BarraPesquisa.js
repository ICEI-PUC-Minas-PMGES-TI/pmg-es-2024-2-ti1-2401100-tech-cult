// dropdown.js
export function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const isVisible = dropdown.style.display === 'block';
    
    // Fecha todos os dropdowns antes de abrir o selecionado
    document.querySelectorAll('.dropdown').forEach(drop => drop.style.display = 'none');
    
    // Alterna a visibilidade do dropdown clicado
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Fecha o dropdown se o usuário clicar fora dele
export function closeDropdownOnClickOutside() {
    window.onclick = function(event) {
        if (!event.target.matches('.tag')) {
            document.querySelectorAll('.dropdown').forEach(drop => drop.style.display = 'none');
        }
    };
}

// Chame closeDropdownOnClickOutside() para ativar o fechamento automático
closeDropdownOnClickOutside();
