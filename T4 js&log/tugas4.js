// a. Segitiga (Sama Sisi / Segitiga Umum)
console.log("=== a. Segitiga ===");
let alasSegitiga = 6;
let tinggiSegitiga = 8;
let sisiA = 6,
  sisiB = 6,
  sisiC = 6; // Contoh segitiga sama sisi

let luasSegitiga = 0.5 * alasSegitiga * tinggiSegitiga;
let kelilingSegitiga = sisiA + sisiB + sisiC;

console.log(`Alas: ${alasSegitiga}, Tinggi: ${tinggiSegitiga}`);
console.log(`Luas Segitiga: ${luasSegitiga}`);
console.log(`Keliling Segitiga: ${kelilingSegitiga}\n`);

// b. Persegi Panjang

console.log("=== b. Persegi Panjang ===");
let panjang = 10;
let lebar = 5;

let luasPersegiPanjang = panjang * lebar;
let kelilingPersegiPanjang = 2 * (panjang + lebar);

console.log(`Panjang: ${panjang}, Lebar: ${lebar}`);
console.log(`Luas Persegi Panjang: ${luasPersegiPanjang}`);
console.log(`Keliling Persegi Panjang: ${kelilingPersegiPanjang}\n`);

// c. Prisma (Prisma Segitiga)

console.log("=== c. Prisma (Prisma Segitiga) ===");
let luasAlasPrisma = 24;
let kelilingAlasPrisma = 18;
let tinggiPrisma = 12;

let luasPermukaanPrisma =
  2 * luasAlasPrisma + kelilingAlasPrisma * tinggiPrisma;
let volumePrisma = luasAlasPrisma * tinggiPrisma;

console.log(`Luas Permukaan Prisma: ${luasPermukaanPrisma}`);
console.log(`Volume Prisma: ${volumePrisma}\n`);

// d. Limas (Limas Segi Empat / Persegi)

console.log("=== d. Limas (Limas Segi Empat) ===");
let sisiAlasLimas = 6;
let tinggiLimas = 9;
let tinggiSisiTegak = 10; // Tinggi segitiga pada sisi tegak

let luasAlasLimas = sisiAlasLimas * sisiAlasLimas;
let luasSisiTegak = 4 * (0.5 * sisiAlasLimas * tinggiSisiTegak);
let luasPermukaanLimas = luasAlasLimas + luasSisiTegak;
let volumeLimas = (1 / 3) * luasAlasLimas * tinggiLimas;

console.log(`Luas Permukaan Limas: ${luasPermukaanLimas}`);
console.log(`Volume Limas: ${volumeLimas}\n`);

// e. Segitiga Sembarang

// Menggunakan Rumus Heron untuk mencari luas segitiga sembarang
console.log("=== e. Segitiga Sembarang ===");
let a = 7,
  b = 8,
  c = 9; // Panjang ketiga sisinya berbeda

let kelilingSembarang = a + b + c;
let s = kelilingSembarang / 2; // Semi-perimeter (setengah keliling)
let luasSembarang = Math.sqrt(s * (s - a) * (s - b) * (s - c));

console.log(`Sisi a: ${a}, Sisi b: ${b}, Sisi c: ${c}`);
console.log(`Keliling Segitiga Sembarang: ${kelilingSembarang}`);
console.log(`Luas Segitiga Sembarang: ${luasSembarang.toFixed(2)}`);
