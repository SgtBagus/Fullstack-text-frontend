import Badge from "../../Components/Badge";
import DateRender from "../../Components/Tabels/DateRender";

import Button from "../../Components/Button";

import { ROLE_TYPES } from "../../Enum/Role";

export const TABEL_META = (onSend, roleLogin, changeStatus) => [
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
		Cell: (val) => {
      const { id, customerStatus } = val;

      return (
        <div className="d-flex justify-content-between align-items-center">
          {
            (
              customerStatus === 'true'
              ? (<Badge className="badge bg-primary mx-3" label="Aktif" />)
              : (<Badge className="badge bg-danger mx-3" label="Belum Aktif" />)
            )
          }
          {
            roleLogin === ROLE_TYPES.ADMIN &&
            (
              <Button
                  label= {
                      onSend ? "Memperoses" : "Ubah Status"
                  }
                  className="btn btn-warning btn-sm mx-2 rounded"
                  buttonIcon={
                      onSend ? "fas fa-sync-alt fa-spin" : "fa fa-edit"
                  }
                  onClick={() => changeStatus(id, customerStatus)}
                  disabled={onSend}
              />
            )
          } 
        </div>
      )
    },
    AllData: true,
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

export const STATUS_LIST = [
  {
    value: 'true',
    option: 'Aktif',
  },
  {
    value: 'false',
    option: 'Belum Aktif',
  },
]