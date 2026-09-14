// CriptoDev — utilidades matemáticas compartidas
// Todas las funciones usan BigInt para evitar errores de precisión.

function modPow(base, exp, mod) {
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);
  if (mod === 1n) return 0n;
  base = ((base % mod) + mod) % mod;
  let result = 1n;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

function egcd(a, b) {
  a = BigInt(a); b = BigInt(b);
  let [old_r, r] = [a, b];
  let [old_s, s] = [1n, 0n];
  let [old_t, t] = [0n, 1n];
  while (r !== 0n) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
    [old_t, t] = [t, old_t - q * t];
  }
  return { g: old_r, x: old_s, y: old_t };
}

function modInverse(a, m) {
  const { g, x } = egcd(a, m);
  if (g !== 1n) return null; // no existe inverso
  return ((x % BigInt(m)) + BigInt(m)) % BigInt(m);
}

function isPrime(n) {
  n = BigInt(n);
  if (n < 2n) return false;
  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) return false;
  }
  return true;
}

// Convierte un string corto a un entero (para demos con mensajes tipo "9" o una letra)
function textToInt(text) {
  if (/^\d+$/.test(text.trim())) return BigInt(text.trim());
  // si no es número, usa el código del primer caracter (demo educativa, no producción)
  return BigInt(text.trim().charCodeAt(0));
}
