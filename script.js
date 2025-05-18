document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("aspirasiForm");
  const list = document.getElementById("aspirasiList");

  let editIndex = null;

  function tampilkanAspirasi() {
    list.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("aspirasi")) || [];

    data.forEach((item, index) => {
      let div = document.createElement("div");
      div.className = "aspirasi-card";
      div.innerHTML = `
                <strong>Nama:</strong> ${item.nama}<br>
                <strong>Kategori:</strong> ${item.kategori}<br>
                <strong>Aspirasi:</strong> ${item.isi}<br>
                <strong>Status:</strong> <em>${item.status}</em><br>
                <button onclick="editAspirasi(${index})">Edit</button>
                <button onclick="hapusAspirasi(${index})" style="background:#dc3545; margin-left:5px;">Hapus</button>
            `;
      list.appendChild(div);
    });
  }

  // Simpan atau Update aspirasi
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let nama = document.getElementById("nama").value || "Anonim";
    let kategori = document.getElementById("kategori").value;
    let isi = document.getElementById("isi").value;

    let data = JSON.parse(localStorage.getItem("aspirasi")) || [];

    if (editIndex !== null) {
      // Mode edit
      data[editIndex] = {
        nama,
        kategori,
        isi,
        status: "Menunggu",
      };
      editIndex = null;
    } else {
      // Tambah baru
      data.push({
        nama,
        kategori,
        isi,
        status: "Menunggu",
      });
    }

    localStorage.setItem("aspirasi", JSON.stringify(data));
    form.reset();
    tampilkanAspirasi();
  });

  // Fungsi global agar bisa dipanggil dari HTML
  window.editAspirasi = function (index) {
    let data = JSON.parse(localStorage.getItem("aspirasi"));
    let asp = data[index];
    document.getElementById("nama").value = asp.nama;
    document.getElementById("kategori").value = asp.kategori;
    document.getElementById("isi").value = asp.isi;
    editIndex = index;
  };

  window.hapusAspirasi = function (index) {
    if (confirm("Yakin ingin menghapus aspirasi ini?")) {
      let data = JSON.parse(localStorage.getItem("aspirasi"));
      data.splice(index, 1);
      localStorage.setItem("aspirasi", JSON.stringify(data));
      tampilkanAspirasi();
    }
  };

  tampilkanAspirasi();
});
