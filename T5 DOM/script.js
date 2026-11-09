// 1. Array kosong untuk menampung semua produk
let produkList = [];

let produk1 = {
  id: 1,
  nama: "Kue Kentang Mayones Rem",
  harga: 15000,
  stok: 10,
};
let produk2 = {
  id: 2,
  nama: "Metia Komunikasi (Kaca Ajaib)",
  harga: 130000,
  stok: 15,
};
let produk3 = { id: 3, nama: "Buah Appa Segar", harga: 4000, stok: 5 };
let produk4 = {
  id: 4,
  nama: "Gantungan Kunci Puck (Edisi Terbatas)",
  harga: 50000,
  stok: 0,
};

let produk5 = new Object();
produk5.id = 5;
produk5.nama = "Jubah Hitam Subaru (Pelindung Sihir)";
produk5.harga = 700000;
produk5.stok = 8;

produkList.push(produk1, produk2, produk3, produk4, produk5);

// 2. array terpisah untuk menyimpan item keranjang belanja
let keranjang = [];

// 1. getElementById
const containerProduk = document.getElementById("daftar-produk");
const containerKeranjang = document.getElementById("keranjang");

// 2. querySelector
const txtJumlahItem = document.querySelector("#jumlah-item");
const txtTotalHarga = document.querySelector("#total-harga");

// 3. querySelectorAll
const semuaTombolAksi = document.querySelectorAll("button");
const btnUndo = document.querySelector("#btn-undo");
const btnCheckout = document.querySelector("#btn-checkout");

// 4. getElementsByClassName
const semuaKartuProduk = document.getElementsByClassName("kartu-produk");

// 1. Fungsi untuk merender/menampilkan produk dari Array ke HTML
function tampilkanProduk() {
  // Kosongkan wadah produk agar tidak menumpuk ganda saat fungsi dipanggil ulang
  containerProduk.innerHTML = "";

  // Tampilkan produk menggunakan perulangan
  produkList.forEach(function (produk) {
    // A. Buat elemen <div> pembungkus kartu produk
    const kartu = document.createElement("div");
    kartu.className = "kartu-produk";
    kartu.style.border = "1px solid #ccc";
    kartu.style.padding = "10px";
    kartu.style.margin = "10px 0";

    // Ubah minimal dua properti style menggunakan CamelCase jika stok habis
    if (produk.stok === 0) {
      kartu.style.backgroundColor = "#ffe6e6"; // Style 1: Warna latar jadi merah muda
      kartu.style.color = "gray"; // Style 2: Warna teks jadi abu-abu
    }

    // B. Buat elemen <p> dan isi teksnya menggunakan createTextNode & appendChild
    const infoProduk = document.createElement("p");
    const teksInfo = document.createTextNode(
      `${produk.nama} - Rp ${produk.harga} (Stok: ${produk.stok})`,
    );
    infoProduk.appendChild(teksInfo);
    kartu.appendChild(infoProduk);

    // C. Buat elemen <button> "Tambah ke Keranjang" secara dinamis
    const btnTambah = document.createElement("button");
    btnTambah.innerText = "Tambah ke Keranjang";

    // Beri event klik pada tombol tambah
    btnTambah.onclick = function () {
      tambahKeKeranjang(produk.id);
    };

    kartu.appendChild(btnTambah);

    // D. Masukkan seluruh elemen kartu ke wadah utama di HTML
    containerProduk.appendChild(kartu);
  });
}

// 2. Logika ketika tombol "Tambah ke Keranjang" diklik
function tambahKeKeranjang(idProduk) {
  // Cari data produk berdasarkan id
  const produkDipilih = produkList.find((p) => p.id === idProduk);

  // Syarat Modul 4: Gunakan alert() jika stok produk habis
  if (produkDipilih.stok <= 0) {
    alert("Stok produk habis!");
    return;
  }

  // Stok produk berkurang setiap kali ditambahkan ke keranjang
  produkDipilih.stok--;

  // Gunakan push() untuk menambah item ke keranjang
  keranjang.push(produkDipilih);

  // Render ulang daftar produk & keranjang agar tampilannya ter-update
  tampilkanProduk();
  if (typeof tampilkanKeranjang === "function") {
    tampilkanKeranjang();
  }
}

// Fungsi untuk menampilkan item keranjang & total harga
function tampilkanKeranjang() {
  containerKeranjang.innerHTML = "";

  // Tampilkan item keranjang sebagai elemen list (<li>)
  keranjang.forEach(function (item, index) {
    const li = document.createElement("li");
    const teks = document.createTextNode(`${item.nama} - Rp ${item.harga} `);
    li.appendChild(teks);

    // Tombol Hapus per item
    const btnHapus = document.createElement("button");
    btnHapus.innerText = "Hapus";

    btnHapus.onclick = function () {
      // confirm() sebelum menghapus item
      const setuju = confirm(
        `Apakah Anda yakin ingin menghapus ${item.nama} dari keranjang?`,
      );
      if (setuju) {
        // Kembalikan stok
        item.stok++;
        // Hapus dari array keranjang
        keranjang.splice(index, 1);

        // removeChild()
        containerKeranjang.removeChild(li);

        tampilkanProduk();
        tampilkanKeranjang();
      }
    };

    li.appendChild(btnHapus);
    containerKeranjang.appendChild(li);
  });

  // Total harga dihitung dengan perulangan for atau for...in
  let totalHarga = 0;
  for (let i = 0; i < keranjang.length; i++) {
    totalHarga += keranjang[i].harga;
  }

  // Gunakan innerHTML untuk menampilkan jumlah item dan total harga
  txtJumlahItem.innerHTML = keranjang.length;
  txtTotalHarga.innerHTML = totalHarga;
}

// ==========================================
// 4. FITUR UNDO & CHECKOUT (POP-UP BOX)
// ==========================================

// pop() untuk membatalkan item terakhir
btnUndo.onclick = function () {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const itemDibatalkan = keranjang.pop();
  itemDibatalkan.stok++;

  tampilkanProduk();
  tampilkanKeranjang();
};

// Checkout menggunakan prompt() & join()
btnCheckout.onclick = function () {
  if (keranjang.length === 0) {
    alert("Keranjang kamu masih kosong, silakan pilih produk terlebih dahulu!");
    return;
  }

  // prompt() untuk meminta nama pembeli
  const namaPembeli = prompt("Masukkan nama pembeli:");

  if (namaPembeli) {
    // Ambil daftar nama produk
    const daftarNama = keranjang.map((item) => item.nama);

    // Item di ringkasan digabung menggunakan join()
    const ringkasanItem = daftarNama.join(", ");

    // Hitung total bayar akhir memakai perulangan for...in
    let totalBayar = 0;
    for (let idx in keranjang) {
      totalBayar += keranjang[idx].harga;
    }

    // Tampilkan ringkasan pesanan ke halaman
    wadahRingkasan.innerHTML = `
            <h3>Ringkasan Pesanan</h3>
            <p><strong>Nama Pembeli:</strong> ${namaPembeli}</p>
            <p><strong>Daftar Item:</strong> ${ringkasanItem}</p>
            <p><strong>Total Bayar:</strong> Rp ${totalBayar}</p>
        `;

    // Kosongkan keranjang setelah checkout selesai
    keranjang = [];
    tampilkanKeranjang();
  }
};

// Jalankan fungsi tampilkanProduk saat halaman pertama kali dibuka
tampilkanProduk();
