const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const apiFetch = async (endpoint, options = {}) => {
const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
};

if (token) {
    headers['Authorization'] = `Bearer ${token}`;
}

const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

// Manejo de errores
if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la solicitud de API');
}

// Devolver los datos JSON
if (response.status === 204) {
    return null;
}
return response.json();
};

// Exportar métodos convenientes para no tener que escribir 'method: POST' etc.
export const api = {
get: (endpoint, options) => apiFetch(endpoint, { ...options, method: 'GET' }),
post: (endpoint, body, options) =>
    apiFetch(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
put: (endpoint, body, options) =>
    apiFetch(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
delete: (endpoint, options) =>
    apiFetch(endpoint, { ...options, method: 'DELETE' }),
};