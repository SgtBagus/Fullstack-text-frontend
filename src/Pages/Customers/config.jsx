import { NotificationManager } from "react-notifications";
import axios from "axios";

import Badge from "../../Components/Badge";
import DateRender from "../../Components/Tabels/DateRender";

import { ROLE_TYPES } from "../../Enum/Role";
import { CATCH_ERROR } from "../../Helper/Error";
import { API_BASE } from "../../Data/config/apiBase";
import { GET_CURRENT_USER } from "../../Data/config/selectors";

export const TABEL_META = [
  {
    title: "Nama Customer",
    key: "customerName",
  },
  {
    title: "Customer Phone",
    key: "customerPhone",
		Cell: (val) => (<span> {val} </span>)
  },
  {
    title: "Customer Status",
    key: "customerStatus",
		Cell: (val) => (val === 'true'? (<Badge className="badge bg-primary" label="Aktif" />) : (<Badge className="badge bg-danger" label="Belum Aktif" />))
  },
  {
    title: "Nama Paket",
    key: "packageName",
  },
  {
    title: "Harga Paket",
    key: "packagePrice",
		Cell: (val) => (<span> Rp {val} </span>)
  },
  {
    title: "Deskripsi",
    key: "packageDesc",
  },
  {
    title: "Dibuat Oleh",
    key: "createdName",
  },
  {
    title: "Dibuat Oleh",
    key: "createdName",
  },
  {
    key: "createdRole",
    title: "Role Pembuat",
		Cell: (val) => (val === ROLE_TYPES.ADMIN ? (<Badge className="badge bg-primary" label="Admin" />) : (<Badge className="badge bg-warning" label="Sales" />))
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
