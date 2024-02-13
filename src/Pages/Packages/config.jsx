import DateRender from "../../Components/Tabels/DateRender";
import Badge from "../../Components/Badge";

export const TABEL_META = [
  {
    title: "Nama Paket",
    key: "name",
  },
  {
    title: "Paket Deskripsi",
    key: "desc",
  },
  {
    title: "Harga Paket",
    key: "price",
		Cell: (val) => (<span> Rp {val} </span>)
  },
  {
    title: "Status Paket",
    key: "status",
    Cell: (val) => (
      val === 'true'
      ? (<Badge className="badge bg-primary mx-3" label="Aktif" />)
      : (<Badge className="badge bg-danger mx-3" label="Tidak Aktif" />)
    ),
  },
  {
    key: "created_at",
    title: "Dibuat Pada",
		Cell: (val) => (<DateRender val={val} />)
  },
  {
    key: "updated_at",
    title: "Diupdate Pada",
		Cell: (val) => (<DateRender val={val} />)
  },
];

export const STATUS_PACKET_LIST  = [
  {
    value: 'true',
    option: 'Aktif',
  },
  {
    value: 'false',
    option: 'Tidak Aktif',
  },
];